import { Angle } from "../angle/angle";
import { Vector } from "./vector";

export class VectorService {
  static getVectorSum(vectors: Vector[]) {
    let magnitudeX = 0,
      magnitudeY = 0;

    for (const vector of vectors) {
      magnitudeX += vector.axisX;
      magnitudeY += vector.axisY;
    }

    const sumVectorMagnitude = Math.sqrt(
      Math.pow(magnitudeX, 2) + Math.pow(magnitudeY, 2)
    );

    const sumVectorAngle = Angle.createRadianAngle(
      Math.atan2(magnitudeY, magnitudeX)
    );

    return Vector.create(sumVectorMagnitude, sumVectorAngle);
  }
}
