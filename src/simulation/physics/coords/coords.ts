import { Distance } from "../distance/distance";

export class Coords {
  private readonly _x: Distance;
  private readonly _y: Distance;

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

  get textified() {
    return `(${this.axisXmeters}m, ${this.axisYmeters}m)`;
  }
}
