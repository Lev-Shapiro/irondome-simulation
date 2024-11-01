import { Distance } from "@/simulation/physics/distance/distance";
import { Force } from "@/simulation/physics/force/force";
import { Mass } from "@/simulation/physics/mass/mass";
import { MotionService } from "@/simulation/physics/motion-service";
import { Speed } from "@/simulation/physics/speed/speed";
import { Time } from "@/simulation/physics/time/time";
import { ForceVector } from "@/simulation/physics/vector/force-vector";
import { WorldObject, WorldObjectProps } from "../world-object";
import { MissilePropellant } from "./propellant/propellant";

export interface MissileProps extends WorldObjectProps {
  propellant: MissilePropellant;
}

export class Missile extends WorldObject {
  private readonly _propellant: MissilePropellant;

  constructor(props: MissileProps) {
    super(props);

    this._propellant = props.propellant;
  }

  clone() {
    return new Missile({
      id: this.id,
      coords: this.coords,
      dryMass: this.dryMass, // Approximate total mass
      size: this.size, // Length: 2.2 m, Diameter: 170 mm
      direction: this.direction,
      propellant: this._propellant.clone(),
      speed: Speed.createMetersPerSecond(this.velocityVector.metersPerSecond),
    });
  }

  get isNoFuelRemaining() {
    return this._propellant.fuelUsagePercent === 0;
  }

  get fuelRemainingInKilograms() {
    return this._propellant.fuelRemainingInKilograms;
  }

  // Missile has propellant mass, thus the mass should be reinitialized and calculated
  get mass() {
    return Mass.createKilograms(
      this.dryMass.kilograms + this._propellant.fuelRemainingInKilograms
    );
  }

  burnAndGetForce(timeframe: Time) {
    const burnThrustForce = this._propellant.exhaustBallistically(timeframe);
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

    console.log("Acceleration", acceleration.metersPerSecond + "[m/s^2]");

    // 3. Sum of prev velocity with the delta velocity
    const netVelocity = MotionService.getVectorVelocitySum([
      startVelocity,
      acceleration,
    ]);

    const x = this.coords.addX(
      Distance.createMeters(
        netVelocity.axisX.getAsMultipliedBy(timeframe.seconds).metersPerSecond
      )
    );

    const y = this.coords.addY(
      Distance.createMeters(
        netVelocity.axisY.getAsMultipliedBy(timeframe.seconds).metersPerSecond
      )
    );

    this.angle = netVelocity.direction;
    this.velocity = netVelocity;

    return { coords: { x, y }, direction: netVelocity.direction };
  }
}
