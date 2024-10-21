import { Scalar } from "../scalar/scalar";
import { MassUnit } from "./mass-unit";

export class Mass {
  private readonly _mass: Scalar;
  private readonly _unit: MassUnit;

  private constructor(mass: Scalar, unit: MassUnit) {
    if (mass.value < 0) {
      throw new Error("Mass value must be non-negative");
    }

    this._mass = mass;
    this._unit = unit;
  }

  clone() {
    return new Mass(this._mass, this._unit);
  }

  get grams(): number {
    switch (this._unit) {
      case MassUnit.GRAM:
        return this._mass.value;
      case MassUnit.KILOGRAM:
        return this._mass.value * 1000;
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

  /**
   * Empties the mass by setting its value to 0.
   */
  emptify() {
    this._mass.nullify();
  }

  increase(massToAdd: Mass) {
    this._mass.add(massToAdd.getAs(this._unit))
    
    return this;
  }

  decrease(massToDeduct: Mass) {
    this._mass.subtract(massToDeduct.getAs(this._unit))

    return this;
  }

  multiply(amount: number) {
    this._mass.multiply(amount);

    return this;
  }

  static createGrams(mass: number): Mass {
    return new Mass(Scalar.create(mass), MassUnit.GRAM);
  }

  static createKilograms(mass: number): Mass {
    return new Mass(Scalar.create(mass), MassUnit.KILOGRAM);
  }
}