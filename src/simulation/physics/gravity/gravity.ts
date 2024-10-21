import { Acceleration } from "../acceleration/acceleration";
import { Angle } from "../angle/angle";
import { Force } from "../force/force";
import { Mass } from "../mass/mass";
import { Velocity } from "../velocity/velocity";

export class Gravity {
  private static _velocity = Velocity.initMetersPerSecond(9.80665);

  private static _acceleration = Acceleration.create(this._velocity)
  private static _direction = Angle.createDegreeAngle(-90)

  static get metersPerSecondSquared() {
    return this._acceleration.metersPerSecondSquared;
  }

  static get force() {
    return Force.create(this._velocity.metersPerSecond, this._direction);
  }

  static getWeightForce(mass: Mass) {
    return Force.create(this._velocity.metersPerSecond.clone().multiply(mass.kilograms), this._direction);
  }
}