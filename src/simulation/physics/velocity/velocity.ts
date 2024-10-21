import { Distance } from "../distance/distance";
import { Scalar } from "../scalar/scalar";
import { Time } from "../time/time";

export class Velocity {
  private _time: Time;
  private _distance: Distance;

  private constructor(time: Time, distance: Distance) {
    this._time = time;
    this._distance = distance;
  }

  /**
   * Gets the velocity in meters per second.
   * @returns The velocity in meters per second.
   */
  get metersPerSecond() {
    return Scalar.create(this._distance.meters / this._time.seconds);
  }

  /**
   * Gets the velocity in kilometers per hour.
   * @returns The velocity in kilometers per hour.
   */
  get kilometersPerHour() {
    return Scalar.create(this._distance.kilometers / this._time.hours);
  }

  increase(velocity: Velocity) {
    const perSingleTimeframe = Distance.createMeters(velocity.metersPerSecond.value * this._time.seconds);
    this._distance.increase(perSingleTimeframe);
  }

  static initMetersPerSecond(value: number) {
    return new Velocity(Time.createSeconds(1), Distance.createMeters(value));
  }

  static initKilometersPerHour(value: number) {
    return new Velocity(Time.createHours(1), Distance.createKilometers(value));
  }
}