import { Angle } from "../angle/angle";
import { Force } from "../force/force";
import { Speed } from "../speed/speed";

export type MagnitudeOfVector = Speed | Force;

export abstract class Vector<T extends MagnitudeOfVector> {
  private readonly _magnitude: T;
  private readonly _direction: Angle;

  constructor(magnitude: T, direction: Angle) {
    this._magnitude = magnitude;
    this._direction = direction;
  }

  get magnitude() {
    return this._magnitude
  }

  abstract get axisX(): T;
  abstract get axisY(): T;

  get factors() {
    return {
      axisX: this.axisX,
      axisY: this.axisY
    }
  }

  get direction() {
    return this._direction
  }

  /**
 * Determines if the vector's direction is in the positive direction.
 * The direction is considered positive if the angle, normalized to [0, 2π),
 * is less than π radians. This effectively checks if the angle is in the 
 * range from 0 to π radians, which corresponds to the positive x-axis 
 * and the upper half-plane in a standard Cartesian coordinate system.
 */
  get isPositiveDirection() {
    const fullCircle = 2 * Math.PI;

    // Normalize the angle to [0, 2π)
    const normalizedAngle = ((this.direction.radians % fullCircle) + fullCircle) % fullCircle;

    // Determine if the angle is in the positive direction
    return normalizedAngle < Math.PI;
  }

  abstract get textified(): string
}