import { Mass } from "@/simulation/physics/mass/mass";

export class MissilePayload {
  _mass: Mass;

  constructor(mass: Mass) {
    this._mass = mass;
  }

  get massInKilograms() {
    return this._mass.kilograms
  }
}