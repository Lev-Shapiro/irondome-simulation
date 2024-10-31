import { Distance } from "../distance/distance";
import { Time } from "../time/time";

export class Speed {
  private _time: Time;
  private _distance: Distance;

  constructor(time: Time, distance: Distance) {
    this._time = time;
    this._distance = distance;
  }

  /**
   * Gets the velocity in meters per second.
   * @returns The velocity in meters per second.
   */
  get metersPerSecond() {
    return this._distance.meters / this._time.seconds;
  }

  /**
   * Gets the velocity in kilometers per hour.
   * @returns The velocity in kilometers per hour.
   */
  get kilometersPerHour() {
    return this._distance.kilometers / this._time.hours;
  }

  getAsMultipliedBy(value: number) {
    return Speed.createMetersPerSecond(this.metersPerSecond * value)
  }

  static createMetersPerSecond(metersPerSecond: number) {
    return new Speed(Time.createSeconds(1), Distance.createMeters(metersPerSecond));
  }

  static createKilometersPerHour(kilometersPerHour: number) {
    return new Speed(Time.createSeconds(1), Distance.createMeters(kilometersPerHour));
  }
}