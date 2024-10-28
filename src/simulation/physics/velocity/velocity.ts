import { Angle } from "../angle/angle";
import { Distance } from "../distance/distance";
import { Time } from "../time/time";

export class Velocity {
  private _time: Time;
  private _axisX: Distance;
  private _axisY: Distance;

  constructor(time: Time, axisX: Distance, axisY: Distance) {
    this._time = time;
    this._axisX = axisX;
    this._axisY = axisY;
  }

  get direction() {
    return Angle.createRadianAngle(Math.atan2(this._axisY.meters, this._axisX.meters));
  }

  get distance() {
    return Distance.createMeters(Math.sqrt(this._axisX.meters * this._axisX.meters + this._axisY.meters * this._axisY.meters));
  }

  /**
   * Gets the velocity in meters per second.
   * @returns The velocity in meters per second.
   */
  get metersPerSecond() {
    return this.distance.meters / this._time.seconds;
  }

  /**
   * Gets the velocity in kilometers per hour.
   * @returns The velocity in kilometers per hour.
   */
  get kilometersPerHour() {
    return this.distance.kilometers / this._time.hours;
  }

  // addVelocity(velocity: Velocity) {
  //   const combinedV = VectorService.getVectorSum([velocity.getAsVector(), this.getAsVector()]);

  //   this._axisX = Distance.createMeters(combinedV.axisX);
  //   this._axisY = Distance.createMeters(combinedV.axisY);
  // }

  static initMetersPerSecond(axisX: number, axisY: number) {
    return new Velocity(Time.createSeconds(1), Distance.createMeters(axisX), Distance.createMeters(axisY));
  }

  static initKilometersPerHour(axisX: number, axisY: number) {
    return new Velocity(Time.createHours(1), Distance.createKilometers(axisX), Distance.createKilometers(axisY));
  }
}