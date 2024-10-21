import { Angle } from "../angle/angle";
import { Scalar } from "../scalar/scalar";

export class Vector {
  readonly magnitude: Scalar;
  readonly direction: Angle;

  constructor(magnitude: Scalar, direction: Angle) {
    this.magnitude = magnitude;
    this.direction = direction;
  }

  clone() {
    return new Vector(this.magnitude.clone(), this.direction.clone());
  }

  getMultipliedBy(amount: number) {
    this.magnitude.multiply(amount);

    return this;
  }

  get axisX() {
    return this.magnitude.value * Math.cos(this.direction.radians);
  }

  get axisY() {
    return this.magnitude.value * Math.sin(this.direction.radians);
  }

  static create(magnitude: Scalar, direction: Angle) {
    return new Vector(magnitude, direction);
  }
}