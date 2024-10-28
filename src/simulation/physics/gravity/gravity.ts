import { Angle } from "../angle/angle";
import { Force } from "../force/force";
import { Mass } from "../mass/mass";
import { Velocity } from "../velocity/velocity";

export class Gravity {
  private static _ACCELERATION = Velocity.initMetersPerSecond(0, 9.80665);
  private static _DIRECTION = Angle.createDegreeAngle(90);
  
  static get metersPerSecondSquared() {
    return this._ACCELERATION.metersPerSecond;
  }

  static getWeightForcePerSecond(mass: Mass) {
    return Force.create(this._ACCELERATION.metersPerSecond * mass.kilograms, this._DIRECTION);
  }
}