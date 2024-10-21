import { Distance } from "./physics/distance/distance";

export class Size {
  readonly width: Distance;
  readonly height: Distance;

  constructor(w: Distance, h: Distance) {
    this.width = w;
    this.height = h;
  }

  static init(w: Distance, h: Distance) {
    return new Size(w, h);
  }
}