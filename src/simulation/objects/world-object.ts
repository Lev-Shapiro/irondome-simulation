import { Angle } from "../physics/angle/angle";
import { Coords } from "../physics/coords/coords";
import { Force } from "../physics/force/force";
import { Gravity } from "../physics/gravity/gravity";
import { Mass } from "../physics/mass/mass";
import { Speed } from "../physics/speed/speed";
import { Time } from "../physics/time/time";
import { ForceVector } from "../physics/vector/force-vector";
import { VelocityVector } from "../physics/vector/velocity-vector";
import { Size } from "../size";

export interface WorldObjectProps {
  id: string;
  coords: Coords;
  dryMass: Mass;
  size: Size;
  direction: Angle;
  speed?: Speed;
}

export abstract class WorldObject {
  public readonly id: string;
  private readonly _dryMass: Mass;
  private readonly _coords: Coords;
  private readonly _size: Size;
  private _direction: Angle;
  private _speed: Speed;

  constructor(props: WorldObjectProps) {
    this.id = props.id;
    this._coords = props.coords;
    this._dryMass = props.dryMass;
    this._size = props.size;
    this._direction = props.direction;
    this._speed = props.speed || Speed.createMetersPerSecond(0);
  }

  setAngle(angle: Angle) {
    return this._direction = angle;
  }

  get coords(): Coords {
    return this._coords;
  }

  get size(): Size {
    return this._size;
  }

  get direction(): Angle {
    return this._direction;
  }

  get dryMass(): Mass {
    return this._dryMass;
  }

  // Objects with additional elements should reinitialize this property
  get mass(): Mass {
    return this._dryMass;
  }

  /**
   * Calculates the weight of the object as a force per second.
   * This is based on the object's mass and the gravitational force.
   * 
   * @returns {Force} The gravitational force acting on the object per second.
   */
  get weight(): ForceVector {
    return Gravity.getWeightForcePerSecond(this.mass);
  }

  get velocityVector() {
    return new VelocityVector(Speed.createMetersPerSecond(this._speed.metersPerSecond), this.direction)
  }

  // addVelocity(velocityToAdd: VelocityVector) {
  //   const totalVelocity = MotionService.getVelocitySum([
  //     this.velocityVector, // current velocity vector
  //     velocityToAdd,
  //   ])

  //   this._speed = Speed.createMetersPerSecond(totalVelocity.metersPerSecond)
  // }

  setVelocity(velocity: VelocityVector) {
    this._speed = Speed.createMetersPerSecond(velocity.metersPerSecond)
  }

  getWeightPerTimeframe(timeframe: Time): ForceVector {
    const { magnitude, direction } = this.weight;

    const forcePerTimeframe = magnitude.getAsMultipliedBy(timeframe.seconds);

    return new ForceVector(forcePerTimeframe, direction);
  }

  getVelocityPerTimeframe(timeframe: Time): VelocityVector {
    const speedPerTimeframe = this._speed.getAsMultipliedBy(timeframe.seconds);

    return new VelocityVector(speedPerTimeframe, this.direction)
  }
}
