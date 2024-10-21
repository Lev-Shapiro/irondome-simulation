import { Angle } from "../angle/angle";
import { Scalar } from "../scalar/scalar";
import { Vector } from "../vector/vector";

export class Force {
  private readonly _vector: Vector;

  constructor(vector: Vector) {
    this._vector = vector;
  }

  clone() {
    return Force.create(this._vector.magnitude.clone(), this._vector.direction);
  }

  get vector() {
    return this._vector;
  }

  get newtons() {
    return this._vector.magnitude.value;
  }

  get direction() {
    return this._vector.direction;
  }

  getMultipliedBy(amount: number) {
    this._vector.magnitude.multiply(amount);

    return Force.create(this._vector.magnitude.clone().multiply(amount), this._vector.direction);
  }

  static create(magnitude: Scalar, direction: Angle) {
    return new Force(Vector.create(magnitude, direction));
  }

  static fromVector(vector: Vector) {
    return new Force(vector);
  }

  static empty() {
    return Force.create(Scalar.create(0), Angle.createDegreeAngle(0));
  }
}