import { Mass } from "../mass/mass";
import { Time } from "../time/time";

export class FuelExhaust {
  _mass: Mass;
  _exhaustTime: Time;

  constructor(mass: Mass, time: Time) {
    this._mass = mass;
    this._exhaustTime = time;
  }

  get kilogramsPerSecond(): number {
    return this._mass.kilograms / this._exhaustTime.seconds;
  }

  getAsMassPerTimeframe(timeframe: Time) {
    return Mass.createKilograms(this.kilogramsPerSecond * timeframe.seconds);
  }

  static createKilogramsPerSecond(kilograms: number): FuelExhaust {
    return new FuelExhaust(Mass.createKilograms(kilograms), Time.createSeconds(1));
  }
}