
import { ForceThrust } from "@/simulation/physics/force/force-thrust";
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

  /**
   * Returns the rate at which the fuel is consumed, in units of
   * kilograms per second. This is calculated as the maximum thrust
   * force divided by the product of the specificImpulse (in seconds) and
   * the gravitational acceleration of the world.
   */
  get fuelBurnRate(): Mass {
    return Mass.createKilograms(
      this.maxThrustForce.newtons /
        (this.specificImpulse.seconds * Gravity.metersPerSecondSquared.value)
    );
  }

  /**
   * Returns the time (in seconds) that the propellant will take to finish burning,
   * given the current amount of fuel remaining and the burn rate.
   */
  get fuelBurnTime(): Time {
    // .kilograms, because thrust force is in Newtons, which is related to kg, not g.
    const time = this.fuelRemaining.kilograms / this.fuelBurnRate.kilograms;

    return Time.createSeconds(time);
  }

  /**
   * Returns the percentage of fuel remaining, with 0 being empty and 100 being full.
   * @returns {number} The percentage of fuel remaining.
   */
  get fuelUsagePercent(): number {
    return (this.fuelRemaining.grams / this._fuelCapacity.grams) * 100;
  }

  /**
   * Calculates the thrust force provided by the propellant during a given time
   * frame. If the fuel is not sufficient for the full time frame, the remaining
   * fuel is used and the function returns a thrust force that is proportional to the
   * amount of fuel left. If the fuel is empty, returns null.
   * @param timeframe The time frame for which to calculate the thrust force.
   * @returns The thrust force provided by the propellant during the given time frame,
   * or null if the fuel is empty.
   */
  burnPerTimeFrame(timeframe: Time): ForceThrust | null {
    if (this.fuelRemaining.grams === 0) return null;

    const burnRatePerTimeframe = this.fuelBurnRate.clone().multiply(timeframe.seconds);
    const maxThrustForcePerTimeframe = this.maxThrustForce.clone().multiply(timeframe.seconds);

    console.log(timeframe.seconds)
    console.log(burnRatePerTimeframe.kilograms, maxThrustForcePerTimeframe.newtons);
    const burnAmountBeforeEmpty =
      this.fuelRemaining.kilograms / burnRatePerTimeframe.kilograms;

    // Fuel is sufficient for full burn:
    if (burnAmountBeforeEmpty >= 1) {
      this.fuelRemaining.decrease(burnRatePerTimeframe);

      return ForceThrust.create(maxThrustForcePerTimeframe.newtons);
    }

    // Fuel is PARTLY sufficient for burn:
    this.fuelRemaining.emptify();

    // burnAmountBeforeEmpty will be between 0 and 1.
    return ForceThrust.create(maxThrustForcePerTimeframe.newtons * burnAmountBeforeEmpty);
  }
}
