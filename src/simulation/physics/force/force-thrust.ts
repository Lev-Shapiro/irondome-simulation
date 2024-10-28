import { Angle } from "../angle/angle";
import { Force } from "./force";

export class ForceThrust {
  private readonly _magnitude: number;

  constructor(magnitude: number) {
    this._magnitude = magnitude;
  }

  clone() {
    return new ForceThrust(this._magnitude);
  }

  get newtons(): number {
    return this._magnitude;
  }

  getAsForceWithKnownDirection(direction: Angle): Force {
    return Force.create(this._magnitude, direction);
  }
}
