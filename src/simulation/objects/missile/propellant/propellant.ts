import { Force } from "@/simulation/physics/force/force";
import { FuelExhaust } from "@/simulation/physics/fuel/fuel-exhaust";
import { Gravity } from "@/simulation/physics/gravity/gravity";
import { Mass } from "@/simulation/physics/mass/mass";
import { Time } from "@/simulation/physics/time/time";

interface MissilePropellantProps {
  maxThrustForce: Force;
  specificImpulse: Time;
  fuelCapacity: Mass;
  fuelLoaded: Mass;
}

export class MissilePropellant {
  private _fuelCapacity: Mass;
  private _fuelRemaining: Mass;

  readonly maxThrustForce: Force;
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
      fuelLoaded: this._fuelRemaining,
    });
  }

  get capacity() {
    return this._fuelCapacity;
  }

  get fuelRemainingInKilograms() {
    return this._fuelRemaining.kilograms;
  }

  get fuelExhaustRate(): FuelExhaust {
    return FuelExhaust.createKilogramsPerSecond(
      this.maxThrustForce.newtons /
        (this.specificImpulse.seconds *
          Math.abs(Gravity.metersPerSecondSquared))
    );
  }

  get remainingExhaustTime(): Time {
    // .kilograms, because thrust force is in Newtons, which is related to kg, not g.
    const time =
      this._fuelRemaining.kilograms / this.fuelExhaustRate.kilogramsPerSecond;

    return Time.createSeconds(time);
  }

  /**
   * Returns the percentage of fuel remaining, with 0 being empty and 100 being full.
   * @returns {number} The percentage of fuel remaining.
   */
  get fuelUsagePercent(): number {
    return (this._fuelRemaining.grams / this._fuelCapacity.grams) * 100;
  }

  exhaustBallistically(timeframe: Time) {
    if (this._fuelRemaining.kilograms === 0) return null;

    // from 0 to 1
    const maxBurnPercentage = Math.min(
      this.remainingExhaustTime.seconds / timeframe.seconds,
      1
    );

    const thrustForce = new Force(this.maxThrustForce.newtons * timeframe.seconds);

    // const fuelFullBurnMass =
    //   this.fuelExhaustRate.getAsMassPerTimeframe(timeframe);

    // this._fuelRemaining = Mass.createGrams(
    //   maxBurnPercentage === 1
    //     ? this._fuelRemaining.grams - fuelFullBurnMass.grams
    //     : 0
    // );

    return new Force(thrustForce.getAsMultipliedBy(maxBurnPercentage).newtons);
  }
}
