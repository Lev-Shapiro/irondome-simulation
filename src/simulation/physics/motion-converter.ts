import { Angle } from "./angle/angle";
import { Distance } from "./distance/distance";
import { Force } from "./force/force";
import { Mass } from "./mass/mass";
import { Vector } from "./vector/vector";
import { Velocity } from "./velocity/velocity";

export class MotionConverter {
  static getVectorFromVelocity(velocity: Velocity) {
    return Vector.create(velocity.metersPerSecond, velocity.direction);
  }

  static getForceFromVelocity(objectMass: Mass, velocity: Velocity) {
    return Force.create(
      velocity.metersPerSecond * objectMass.kilograms,
      velocity.direction
    );
  }

  static getVelocityFromForce(objectMass: Mass, force: Force) {
    return Velocity.initMetersPerSecond(
      force.axisX / objectMass.kilograms,
      force.axisY / objectMass.kilograms
    );
  }

  private static getFactorSum(factorArray: { axisX: number; axisY: number }[]) {
    let totalAxisX = 0,
      totalAxisY = 0;

    for (const vector of factorArray) {
      totalAxisX += vector.axisX;
      totalAxisY += vector.axisY;
    }

    const totalDistance = Distance.createMeters(
      Math.sqrt(Math.pow(totalAxisX, 2) + Math.pow(totalAxisY, 2))
    );

    const totalAngle = Angle.createRadianAngle(
      Math.atan2(totalAxisY, totalAxisX)
    );

    return { totalAxisX, totalAxisY, totalAngle, totalDistance };
  }

  static getVectorSum(vectors: Vector[]) {
    const sum = this.getFactorSum(vectors.map((v) => v.byFactors));
    // TODO

    return Vector.create(sum.totalDistance.meters, sum.totalAngle);
  }

  static getForceSum(forces: Force[]) {
    const sum = this.getFactorSum(forces.map((v) => v.byFactors));
  }

  // static getVelocitySum(velocities: Velocity[]) {

  // }
}
