import { Distance } from "../distance/distance";

export class Coords {
  private _x: Distance;
  private _y: Distance;

  constructor(x: Distance, y: Distance) {
    this._x = x;
    this._y = y;
  }

  get axisXmeters() {
    return this._x.meters;
  }

  get axisYmeters() {
    return this._y.meters;
  }

  addX(value: Distance) {
    return this._x = this._x.getAsIncreased(value)
  }

  addY(value: Distance) {
    return this._y = this._y.getAsIncreased(value)
  }

  get textified() {
    return `(${this.axisXmeters}m, ${this.axisYmeters}m)`;
  }
}
