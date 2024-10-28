import { Distance } from "@/simulation/physics/distance/distance";
import { Force } from "@/simulation/physics/force/force";
import { Mass } from "@/simulation/physics/mass/mass";
import { Time } from "@/simulation/physics/time/time";
import { Vector } from "@/simulation/physics/vector/vector";
import { VectorService } from "@/simulation/physics/vector/vector.service";
import { ConsoleStep } from "@shapilev/console-step";
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
    });
  }

  get isNoFuelRemaining() {
    return this._propellant.fuelRemaining.grams === 0;
  }

  // Missile has propellant mass, thus the mass should be reinitialized and calculated
  get mass() {
    return Mass.createKilograms(
      this.dryMass.kilograms + this._propellant.fuelRemaining.kilograms
    );
  }

  burnIncludingOtherForcesPerTimeframe(timeframe: Time) {
    const burnThrust = this._propellant.exhaustBallistically(timeframe);
    const burnVector = (
      burnThrust
        ? burnThrust.getAsForceWithKnownDirection(this.direction)
        : Force.empty()
    );

    const weightForce = this.getWeightForcePerTimeframe(timeframe);

    const bodyVectorPerBurn = VectorService.getVectorSum([
      weightForce,
      burnVector,
    ]);

    const velocityVector = this.getVelocityPerTimeframe(timeframe);

    new ConsoleStep("Missile").logAfter((s) => {
      s.createStepObject({
        gravity: gravityVector.axisY,
        thrust: burnThrust ? (burnThrust?.newtons + "N") : "N/A",
        velocity: this.velocityMetersPerSecond.value,
        coords: this.coords.textified,
        angle: this.direction.degrees,
      });
    });

    const finalVector = VectorService.getVectorSum([
      velocityVector,
      bodyVectorPerBurn,
    ]);

    // Increase the velocity at the end of the method, so that it can be used in the next step, not this.
    this.increaseVelocityFromForce(Force.fromVector(bodyVectorPerBurn));

    return finalVector;
  }

  move(vector: Vector) {
    this.coords.x.increase(Distance.createMeters(vector.axisX / this.mass.kilograms));
    this.coords.y.increase(Distance.createMeters(vector.axisY / this.mass.kilograms));
    this.setAngle(vector.direction);

    return this.coords;
  }
}
