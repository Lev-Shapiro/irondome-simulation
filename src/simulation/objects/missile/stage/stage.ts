import { Mass } from "@/simulation/physics/mass/mass";
import { Time } from "@/simulation/physics/time/time";
import { PropulsionSystem, PropulsionSystemProps } from "../propulsion/propulsion";

interface StageProps {
  dryMass: Mass;
  detachable: boolean;
  propulsion: PropulsionSystem;
}

export class MissileStage {
  private _propulsion: PropulsionSystem;
  private _dryMass: Mass;
  readonly detachable: boolean;

  constructor(props: StageProps) {
    this._dryMass = props.dryMass;
    this.detachable = props.detachable;
    this._propulsion = props.propulsion;
  }

  get isNoFuelRemaining() {
    return this.fuelRemainingInKilograms === 0;
  }

  get fuelRemainingInKilograms() {
    return this._propulsion.fuelRemainingInKilograms;
  }

  burn(timeframe: Time) {
    return this._propulsion.burnBallistically(timeframe);
  }

  static createFrom(dryMass: Mass, detachable: boolean, propulsionProps: PropulsionSystemProps) {
    return new MissileStage({
      propulsion: new PropulsionSystem(propulsionProps),
      dryMass,
      detachable
    })
  }
}