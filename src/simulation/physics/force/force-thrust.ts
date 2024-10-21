import { Angle } from "../angle/angle";
import { Scalar } from "../scalar/scalar";
import { Force } from "./force";

export class ForceThrust {
  private readonly _magnitude: Scalar;

  constructor(magnitude: Scalar) {
    this._magnitude = magnitude;
  }

  clone() {
    return new ForceThrust(this._magnitude.clone());
  }

  get newtons(): number {
    return this._magnitude.value;
  }

  multiply(amount: number) {
    this._magnitude.multiply(amount);

    return this;
  }

  getAsForceWithKnownDirection(direction: Angle): Force {
    return Force.create(this._magnitude, direction);
  }

  static create(magnitude: number) {
    return new ForceThrust(Scalar.create(magnitude));
  }
}
