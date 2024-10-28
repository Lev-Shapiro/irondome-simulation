import { Coords } from "../physics/coords/coords";
import { Distance } from "../physics/distance/distance";

export const getDistance = (from: Coords, to: Coords) => {
  return Distance.createMeters(Math.sqrt(Math.pow(to.axisXmeters - from.axisXmeters, 2) + Math.pow(to.axisYmeters - from.axisYmeters, 2)))
}