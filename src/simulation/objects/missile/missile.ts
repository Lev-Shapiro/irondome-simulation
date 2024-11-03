import { Distance } from "@/simulation/physics/distance/distance";
import { Force } from "@/simulation/physics/force/force";
import { Mass } from "@/simulation/physics/mass/mass";
import { MotionService } from "@/simulation/physics/motion-service";
import { Speed } from "@/simulation/physics/speed/speed";
import { Time } from "@/simulation/physics/time/time";
import { ForceVector } from "@/simulation/physics/vector/force-vector";
import { WorldObject, WorldObjectProps } from "../world-object";
import { MissilePayload } from "./payload/payload";
import { MissileStage } from "./stage/stage";

export interface MissileProps extends WorldObjectProps {
  stages: MissileStage[];
  payload: MissilePayload;
}

export class Missile extends WorldObject {
  private readonly _stages: MissileStage[];
  private readonly _payload: MissilePayload;
  private _currentStage: number = 0;

  constructor(props: MissileProps) {
    super(props);

    this._stages = props.stages;
    this._payload = props.payload;
  }

  private renderStage() {
    const stage = this._stages[this._currentStage];
    if (!stage || !stage.detachable) return null;
    
    // If propulsion system is empty then detach the stage
    if (stage.isNoFuelRemaining) {
      this._currentStage++;
    }
  }

  /**
   * Creates and returns a new instance of the Missile class that is a copy
   * of the current instance. All properties, including id, coordinates, mass,
   * size, direction, stages, speed, and payload, are duplicated in the new
   * Missile instance.
   *
   * @returns {Missile} A new Missile instance identical to the current one.
   */
  clone() {
    return new Missile({
      id: this.id,
      coords: this.coords,
      dryMass: this.dryMass, // Approximate total mass
      size: this.size, // Length: 2.2 m, Diameter: 170 mm
      direction: this.direction,
      stages: this._stages,
      speed: Speed.createMetersPerSecond(this.velocityVector.metersPerSecond),
      payload: this._payload,
    });
  }

  get currentStage() {
    return this._currentStage + 1;
  }

  get propellant() {
    return this._stages[this._currentStage];
  }

  // Missile has propellant mass, thus the mass should be reinitialized and calculated
  get mass() {
    const totalDeactivatedMassInKilograms = this._stages
      .slice(0, this.currentStage)
      .reduce((a, b) => a + b.fuelRemainingInKilograms, 0);

    const updatedDryMass =
      this.dryMass.kilograms - totalDeactivatedMassInKilograms;

    return Mass.createKilograms(updatedDryMass + this._payload.massInKilograms);
  }

  burnAndGetForce(timeframe: Time) {
    const burnThrustForce = this.propellant.burn(timeframe);

    const burnVector = new ForceVector(
      burnThrustForce || new Force(0),
      this.direction
    );

    return burnVector;
  }

  move(timeframe: Time) {
    const startVelocity = this.velocityVector;

    // 1. Forces acting on the missile
    const burnForce = this.burnAndGetForce(timeframe);
    const weightForce = this.getWeightPerTimeframe(timeframe);

    // 2. Deriving the velocity based on thrust and gravity.
    const accelerationAsForce = MotionService.getVectorForceSum([
      weightForce,
      burnForce,
    ]);

    const acceleration = MotionService.getAccelerationFromForce(
      accelerationAsForce,
      this.mass
    );

    // 3. Sum of prev velocity with the delta velocity
    const netVelocity = MotionService.getVectorVelocitySum([
      startVelocity,
      acceleration,
    ]);

    const x = this.coords.addX(
      Distance.createMeters(
        netVelocity.axisX.metersPerSecond * timeframe.seconds
      )
    );

    const y = this.coords.addY(
      Distance.createMeters(
        netVelocity.axisY.metersPerSecond * timeframe.seconds
      )
    );

    this.angle = netVelocity.direction;
    this.velocity = netVelocity;

    this.renderStage();

    return { coords: { x, y }, direction: netVelocity.direction };
  }

  static createWithSingleStage({
    propulsionStage,
    ...missileProperties
  }: Omit<MissileProps, "stages"> & { propulsionStage: MissileStage }) {
    return new Missile({
      ...missileProperties,
      stages: [propulsionStage],
    });
  }
}
