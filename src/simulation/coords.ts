import { Distance } from "./physics/distance/distance";

export class Coords {
  x: Distance;
  y: Distance;

  constructor(x: Distance, y: Distance) {
    this.x = x;
    this.y = y;
  }

  static init(x: Distance, y: Distance) {
    return new Coords(x, y);
  }
}
