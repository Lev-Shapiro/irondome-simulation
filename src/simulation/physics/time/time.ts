import { Scalar } from "../scalar/scalar";
import { TimeUnit } from "./time-unit";

export class Time {
  private readonly _time: Scalar;
  private readonly _unit: TimeUnit;

  private constructor(time: Scalar, unit: TimeUnit) {
    const timeValue = time.value;

    if (timeValue < 0) {
      throw new Error("Time value must be non-negative");
    }

    this._time = time;
    this._unit = unit;
  }

  get milliseconds(): number {
    switch (this._unit) {
      case TimeUnit.MILLISECOND:
        return this._time.value;
      case TimeUnit.SECOND:
        return this._time.value * 1000;
      case TimeUnit.MINUTE:
        return this._time.value * 60 * 1000;
      case TimeUnit.HOUR:
        return this._time.value * 60 * 60 * 1000;
    }
  }

  get seconds(): number {
    return this.milliseconds / 1000;
  }

  get minutes(): number {
    return this.seconds / 60;
  }

  get hours(): number {
    return this.minutes / 60;
  }

  getAs(unit: TimeUnit) {
    switch(unit) {
      case TimeUnit.MILLISECOND:
        return this.milliseconds
      case TimeUnit.SECOND:
        return this.seconds
      case TimeUnit.MINUTE:
        return this.minutes
      case TimeUnit.HOUR:
        return this.hours
      default:
        throw new Error("Incorrect time unit specified (not MILLISECOND/SECOND/MINUTE/HOUR)")
    }
  }

  /**
   * Increases the time by the given amount.
   * @param timeToAdd The amount of time to add.
   */
  increase(timeToAdd: Time) {
    this._time.add(timeToAdd.getAs(this._unit))
  }

  /**
   * Decreases the time by the given amount.
   * @param timeToDeduct The amount of time to deduct.
   */
  decrease(timeToDeduct: Time) {
    this._time.subtract(timeToDeduct.getAs(this._unit))
  }

  static createMilliseconds(time: number): Time {
    return new Time(Scalar.create(time), TimeUnit.MILLISECOND);
  }

  static createSeconds(time: number): Time {
    return new Time(Scalar.create(time), TimeUnit.SECOND);
  }

  static createMinutes(time: number): Time {
    return new Time(Scalar.create(time), TimeUnit.MINUTE);
  }

  static createHours(time: number): Time {
    return new Time(Scalar.create(time), TimeUnit.HOUR);
  }
}