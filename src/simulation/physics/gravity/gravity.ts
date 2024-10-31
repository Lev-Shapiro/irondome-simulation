import { Angle } from "../angle/angle";
import { Force } from "../force/force";
import { Mass } from "../mass/mass";
import { Speed } from "../speed/speed";
import { ForceVector } from "../vector/force-vector";

export class Gravity {
  private static _GRAVITY_ACCELERATION = Speed.createMetersPerSecond(9.80665); // m/s^2
  private static _GRAVITY_DIRECTION = Angle.createDegreeAngle(-90);
  
  static get metersPerSecondSquared() {
    return this._GRAVITY_ACCELERATION.metersPerSecond;
  }

  static getWeightForcePerSecond(mass: Mass) {
    // F = ma
    const force = new Force(this._GRAVITY_ACCELERATION.metersPerSecond * mass.kilograms);

    return new ForceVector(force, this._GRAVITY_DIRECTION);
  }
}