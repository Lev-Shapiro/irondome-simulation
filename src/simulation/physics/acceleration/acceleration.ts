import { Angle } from "../angle/angle";
import { Force } from "../force/force";
import { Velocity } from "../velocity/velocity";

export class Acceleration {
  private _velocity: Velocity;

  private constructor(velocity: Velocity) {
    this._velocity = velocity;
  }

  get velocity() {
    return this._velocity;
  }

  get metersPerSecondSquared() {
    return this._velocity.metersPerSecond;
  }

  getAsForceWithKnownDirection(direction: Angle) {
    return Force.create(this.metersPerSecondSquared, direction);
  }

  static create(acceleration: Velocity) {
    return new Acceleration(acceleration);
  }

  static createMetersPerSecondSquared(value: number) {
    return new Acceleration(Velocity.initMetersPerSecond(value));
  }

  static empty() {
    return Acceleration.create(Velocity.initMetersPerSecond(0));
  }
}