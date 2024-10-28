import { MassUnit } from "./mass-unit";

export class Mass {
  private readonly _mass: number;
  private readonly _unit: MassUnit;

  private constructor(mass: number, unit: MassUnit) {
    if (mass < 0) {
      throw new Error("Mass value must be non-negative");
    }

    this._mass = mass;
    this._unit = unit;
  }

  get grams(): number {
    switch (this._unit) {
      case MassUnit.GRAM:
        return this._mass;
      case MassUnit.KILOGRAM:
        return this._mass * 1000;
    }
  }

  get kilograms(): number {
    return this.grams / 1000;
  }

  getAs(unit: MassUnit) {
    switch(unit) {
      case MassUnit.GRAM:
        return this.grams
      case MassUnit.KILOGRAM:
        return this.kilograms
      default:
        throw new Error("Incorrect mass unit specified (not GRAM/KILOGRAM)")
    }
  }

  static createGrams(mass: number): Mass {
    return new Mass(mass, MassUnit.GRAM);
  }

  static createKilograms(mass: number): Mass {
    return new Mass(mass, MassUnit.KILOGRAM);
  }
}