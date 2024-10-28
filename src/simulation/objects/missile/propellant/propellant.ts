
import { ForceThrust } from "@/simulation/physics/force/force-thrust";
import { FuelExhaust } from "@/simulation/physics/fuel/fuel-exhaust";
import { Gravity } from "@/simulation/physics/gravity/gravity";
import { Mass } from "@/simulation/physics/mass/mass";
import { Time } from "@/simulation/physics/time/time";

interface MissilePropellantProps {
  maxThrustForce: ForceThrust;
  specificImpulse: Time;
  fuelCapacity: Mass;
  fuelLoaded: Mass;
}

export class MissilePropellant {
  private _fuelCapacity: Mass;
  private _fuelRemaining: Mass;

  readonly maxThrustForce: ForceThrust;
  readonly specificImpulse: Time; // formally known as Specific Impulse

  constructor(props: MissilePropellantProps) {
    this.maxThrustForce = props.maxThrustForce;
    this.specificImpulse = props.specificImpulse;
    this._fuelCapacity = props.fuelCapacity;
    this._fuelRemaining = props.fuelLoaded;
  }

  clone() {
    return new MissilePropellant({
      maxThrustForce: this.maxThrustForce,
      specificImpulse: this.specificImpulse,
      fuelCapacity: this._fuelCapacity,
      fuelLoaded: this.fuelRemaining,
    });
  }

  get capacity() {
    return this._fuelCapacity;
  }

  get fuelRemaining() {
    return this._fuelRemaining;
  }


  get fuelExhaustRate(): FuelExhaust {
    return FuelExhaust.createKilogramsPerSecond(this.maxThrustForce.newtons /
      (this.specificImpulse.seconds * Math.abs(Gravity.metersPerSecondSquared)))
  }

  get remainingExhaustTime(): Time {
    // .kilograms, because thrust force is in Newtons, which is related to kg, not g.
    const time = this.fuelRemaining.kilograms / this.fuelExhaustRate.kilogramsPerSecond;

    return Time.createSeconds(time);
  }

  /**
   * Returns the percentage of fuel remaining, with 0 being empty and 100 being full.
   * @returns {number} The percentage of fuel remaining.
   */
  get fuelUsagePercent(): number {
    return (this.fuelRemaining.grams / this._fuelCapacity.grams) * 100;
  }

  exhaustBallistically(timeframe: Time) {
    if(this._fuelRemaining.kilograms === 0) return null;

    const burnAvailable = Math.min(this.remainingExhaustTime.seconds / timeframe.seconds, 1);
    const thrustForce = this.maxThrustForce.newtons * timeframe.seconds;

    (burnAvailable === 1)
      ? this.fuelRemaining.decrease(this.fuelExhaustRate.getAsMassPerTimeframe(timeframe))
      : this.fuelRemaining.emptify();

    return ForceThrust.create(thrustForce * burnAvailable);
  }
}
