
// Missile{
//   gravity: -1346.2643333333333
//   thrust: 4000N
//   velocity: 0
//   coords: (0km, 0km)
//   angle: 30
//   }
// { axisX: 0, axisY: 0, total: Scalar { _value: 0 } }
// Missile{
//   gravity: -1319.5976666666668
//   thrust: 4000N
//   velocity: 25.679109277624136
//   coords: (3.4641016151377557km, 0.6537356666666665km)
//   angle: 10.687014021130313
//   }

import { ConsoleStep, StepVariety } from "@shapilev/console-step";
import { gradRocket } from "./simulation/objects/missile/missile.dataset";
import { Angle } from "./simulation/physics/angle/angle";
import { Time } from "./simulation/physics/time/time";

const missile = gradRocket.clone();
missile.setAngle(Angle.createDegreeAngle(60));


const INTERVAL_TIME = Time.createMilliseconds(500);
      
let i = 0;
const interval = setInterval(() => {
  i++;

  const { coords } = missile.move(INTERVAL_TIME)  

  new ConsoleStep(`(${coords.x.kilometers.toFixed(4)}km, ${coords.y.kilometers.toFixed(4)}km)`).logAfter(s => {
    s.createStep("Velocity: " + missile.velocityVector.metersPerSecond.toFixed(4) + "[m/s]")
    
    if(missile.isNoFuelRemaining) {
      s.createStep("No fuel", StepVariety.Warning)
    }
  })

  if(missile.coords.axisYmeters <= 0) {
    console.log(`Took ${Time.createMilliseconds(i * INTERVAL_TIME.milliseconds).minutes.toFixed(3)} minutes until explosion`)
    clearInterval(interval)
    return;
  }
}, 1);
