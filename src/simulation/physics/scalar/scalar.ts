export class Scalar {
  private _value: number;

  constructor(value: number) {
    this._value = value;
  }

  get value() {
    return this._value;
  }

  clone() {
    return Scalar.create(this._value);
  }

  nullify() {
    this._value = 0;
  }

  add(amount: number) {
    this._value += amount;

    return this;
  }

  subtract(amount: number) {
    this._value -= amount;

    return this;
  }

  multiply(amount: number) {
    this._value *= amount;

    return this;
  }

  divide(amount: number) {
    this._value /= amount;

    return this;
  }

  static create(value: number) {
    return new Scalar(value);
  }
}