import { Angle } from "./angle/angle";
import { Force } from "./force/force";
import { Mass } from "./mass/mass";
import { Speed } from "./speed/speed";
import { ForceVector } from "./vector/force-vector";
import { VelocityVector } from "./vector/velocity-vector";

export class MotionService {
  static getForceFromAcceleration(acceleration: VelocityVector, mass: Mass): ForceVector {
    const updatedSpeed = new Force(acceleration.magnitude.metersPerSecond * mass.kilograms)
    return new ForceVector(updatedSpeed, acceleration.direction)
  }

  static getAccelerationFromForce(force: ForceVector, mass: Mass): VelocityVector {
    const updatedSpeed = Speed.createMetersPerSecond(force.magnitude.newtons / mass.kilograms)
    return new VelocityVector(updatedSpeed, force.direction)
  }

  static getVectorSum(factorArray: { axisX: number; axisY: number }[]) {
    let totalAxisX = 0,
      totalAxisY = 0;

    for (const vector of factorArray) {
      totalAxisX += vector.axisX;
      totalAxisY += vector.axisY;
    }

    const totalDistance = Math.sqrt(
      Math.pow(totalAxisX, 2) + Math.pow(totalAxisY, 2)
    );

    const totalAngle = Angle.createRadianAngle(
      Math.atan2(totalAxisY, totalAxisX)
    );

    return { totalAxisX, totalAxisY, totalAngle, totalDistance };
  }

  static getVectorVelocitySum(velocityVectorArray: VelocityVector[]) {
    const sum = this.getVectorSum(
      velocityVectorArray.map((v) => ({
        axisX: v.axisX.metersPerSecond,
        axisY: v.axisY.metersPerSecond,
      }))
    );

    return new VelocityVector(
      Speed.createMetersPerSecond(sum.totalDistance),
      sum.totalAngle
    );
  }

  static getVectorForceSum(velocityForceArray: ForceVector[]) {
    const sum = this.getVectorSum(
      velocityForceArray.map((v) => ({
        axisX: v.axisX.newtons,
        axisY: v.axisY.newtons,
      }))
    );

    return new ForceVector(new Force(sum.totalDistance), sum.totalAngle);
  }
}
