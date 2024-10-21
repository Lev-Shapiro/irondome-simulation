import { Scalar } from "../scalar/scalar";
import { AngleUnit } from "./angle-unit";

export class Angle {
  private readonly _angle: Scalar;
  private readonly _unit: AngleUnit;

  private constructor(angle: Scalar, unit: AngleUnit) {
    const angleValue = angle.value;

    switch (unit) {
      case AngleUnit.DEGREES:
        // lim-360->360 f(x)
        if (Math.abs(angleValue) > 360) {
          throw new Error(
            "Angle must be within the range of -360 to 360 degrees"
          );
        }
        break;
      case AngleUnit.RADIANS:
        // lim-2π->2π f(x)
        if (Math.abs(angleValue) > 2 * Math.PI) {
          throw new Error(
            "Angle must be within the range of -2π to 2π radians"
          );
        }
    }

    this._angle = angle;
    this._unit = unit;
  }

  clone() {
    return new Angle(this._angle.clone(), this._unit);
  }

  get degrees() {
    return  this._unit === AngleUnit.DEGREES
      ? this._angle.value
      : (this._angle.value / Math.PI) * 180;
  }

  get radians() {
    return this._unit === AngleUnit.RADIANS
      ? this._angle.value
      : (this._angle.value / 180) * Math.PI;
  }

  static createDegreeAngle(angle: number) {
    return new Angle(Scalar.create(angle), AngleUnit.DEGREES);
  }

  static createRadianAngle(angle: number) {
    return new Angle(Scalar.create(angle), AngleUnit.RADIANS);
  }
}