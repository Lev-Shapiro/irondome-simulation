import { Speed } from "../speed/speed";
import { Vector } from "./vector";

export class VelocityVector extends Vector<Speed> {
  /**
   * Gets the velocity in meters per second.
   * @returns The velocity in meters per second.
   */
  get metersPerSecond() {
    return this.magnitude.metersPerSecond;
  }

  /**
   * Gets the velocity in kilometers per hour.
   * @returns The velocity in kilometers per hour.
   */
  get kilometersPerHour() {
    return this.magnitude.kilometersPerHour;  
  }

  get axisX() {
    return Speed.createMetersPerSecond(
      this.magnitude.metersPerSecond * Math.cos(this.direction.radians)
    );
  }

  get axisY() {
    return Speed.createMetersPerSecond(
      this.magnitude.metersPerSecond * Math.sin(this.direction.radians)
    );
  }

  get textified(): string {
    return `(${this.magnitude.metersPerSecond.toFixed(3)}mps, ${this.direction.degrees.toFixed(3)}deg)`
  }
}
