import { DistanceUnit } from "./distance-unit";

export class Distance {
  private _distance: number;
  private readonly _unit: DistanceUnit;

  private constructor(distance: number, unit: DistanceUnit) {
    this._distance = distance;
    this._unit = unit;
  }

  get millimeters(): number {
    switch (this._unit) {
      case DistanceUnit.MILLIMETER:
        return this._distance;
      case DistanceUnit.CENTIMETER:
        return this._distance * 10;
      case DistanceUnit.METER:
        return this._distance * 1000;
      case DistanceUnit.KILOMETER:
        return this._distance * 1000000;
      default:
        throw new Error(`Unsupported DistanceUnit: ${this._unit}`);
    }
  }

  get centimeters(): number {
    return this.millimeters / 10;
  }

  get meters(): number {
    return this.millimeters / 1000;
  }

  get kilometers(): number {
    return this.millimeters / 1000000;
  }

  getAs(unit: DistanceUnit) {
    switch(unit) {
      case DistanceUnit.MILLIMETER:
        return this.millimeters
      case DistanceUnit.CENTIMETER:
        return this.centimeters
      case DistanceUnit.METER:
        return this.meters
      case DistanceUnit.KILOMETER:
        return this.kilometers
      default:
        throw new Error("Incorrect mass unit specified (not GRAM/KILOGRAM)")
    }
  }

  increase(distanceToAdd: Distance) {
    return Distance.createCentimeters(this.centimeters + distanceToAdd.centimeters)
  }

  static createMillimeters(distance: number): Distance {
    return new Distance(distance, DistanceUnit.MILLIMETER);
  }

  static createCentimeters(distance: number): Distance {
    return new Distance(distance, DistanceUnit.CENTIMETER);
  }

  static createMeters(distance: number): Distance {
    return new Distance(distance, DistanceUnit.METER);
  }

  static createKilometers(distance: number): Distance {
    return new Distance(distance, DistanceUnit.KILOMETER);
  }
}
