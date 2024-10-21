import { Angle } from "../angle/angle";
import { Scalar } from "../scalar/scalar";
import { Vector } from "./vector";

export class VectorService {
  static getVectorSum(vectors: Vector[]) {
    const magnitudeX = Scalar.create(0),
      magnitudeY = Scalar.create(0);

    for (const vector of vectors) {
      magnitudeX.add(vector.axisX);
      magnitudeY.add(vector.axisY);
    }

    const sumVectorMagnitude = Scalar.create(
      Math.sqrt(Math.pow(magnitudeX.value, 2) + Math.pow(magnitudeY.value, 2))
    );

    const sumVectorAngle = Angle.createRadianAngle(
      Math.atan2(magnitudeY.value, magnitudeX.value)
    );

    return Vector.create(sumVectorMagnitude, sumVectorAngle);
  }
}
