import { ConsoleStep, StepVariety } from "@shapilev/console-step";
import { MISSILE_EXAMPLE } from "./simulation/objects/missile/missile.dataset";
import { Angle } from "./simulation/physics/angle/angle";
import { Time } from "./simulation/physics/time/time";

const missile = MISSILE_EXAMPLE.clone();
missile.angle = Angle.createDegreeAngle(45);

const getColorType = (stage: number) => {
  if(stage <= 1) return StepVariety.Default;
  if(stage === 2) return StepVariety.Warning;
  if(stage === 3) return StepVariety.Error;
  
  return StepVariety.ObjectBrackets;
}

const INTERVAL_TIME = Time.createMilliseconds(500);
     
let i = 0;
const interval = setInterval(() => {
  i++;

  const { coords } = missile.move(INTERVAL_TIME)  

  new ConsoleStep(`(${coords.x.kilometers.toFixed(4)}km, ${coords.y.kilometers.toFixed(4)}km)`).logAfter(s => {
    s.createStep("Velocity: " + missile.velocityVector.metersPerSecond.toFixed(4) + "[m/s]")
    s.createStep("STAGE: " + missile.currentStage, getColorType(missile.currentStage))
    
    if(missile.propellant.isNoFuelRemaining) {
      s.createStep("No fuel", StepVariety.Warning)
    }
  })

  if(missile.coords.axisYmeters <= 0) {
    console.log(`Took ${Time.createMilliseconds(i * INTERVAL_TIME.milliseconds).minutes.toFixed(3)} minutes until explosion`)
    clearInterval(interval)
    return;
  }
  // if(missile.isNoFuelRemaining) {
  //   console.log(`Took ${Time.createMilliseconds(i * INTERVAL_TIME.milliseconds).minutes.toFixed(3)} minutes until fuel expired`)
  //   clearInterval(interval)
  //   return;
  // }
}, 1);
