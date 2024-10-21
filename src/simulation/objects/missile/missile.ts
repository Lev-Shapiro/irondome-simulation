import { Distance } from "@/simulation/physics/distance/distance";
import { Force } from "@/simulation/physics/force/force";
import { Mass } from "@/simulation/physics/mass/mass";
import { Time } from "@/simulation/physics/time/time";
import { VectorService } from "@/simulation/physics/vector/vector.service";
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
    const burnThrust = this._propellant.burnPerTimeFrame(timeframe);

    const bodyVectorPerBurn = VectorService.getVectorSum([
      this.getWeightForcePerTimeframe(timeframe).vector,
      // this.getVelocityVectorPerTimeframe(timeframe),
      (burnThrust ? burnThrust.getAsForceWithKnownDirection(this.direction) : Force.empty()).vector,
    ]);

    if(burnThrust) {
      this.increaseVelocityFromForce(Force.fromVector(bodyVectorPerBurn));
    }

    const finalVector = VectorService.getVectorSum([
      this.getVelocityVectorPerTimeframe(timeframe),
      bodyVectorPerBurn,
    ]);

    return {
      axisX: Distance.createMeters(finalVector.axisX),
      axisY: Distance.createMeters(finalVector.axisY),
    }
  }

  move(axisX: Distance, axisY: Distance) {
    this.coords.x.increase(axisX);
    this.coords.y.increase(axisY);

    return this.coords;
  }
}
