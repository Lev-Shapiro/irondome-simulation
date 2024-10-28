import { Force } from "../force/force";
import { Vector } from "./vector";

export class ForceVector extends Vector<Force> {
  get axisX() {
    return new Force(this.magnitude.newtons * Math.cos(this.direction.radians));
  }

  get axisY() {
    return new Force(this.magnitude.newtons * Math.sin(this.direction.radians));
  }
}
