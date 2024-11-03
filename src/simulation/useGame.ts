import { useSimulationDistance } from "@/external/hooks/use-window-size";
import { ConsoleStep, StepVariety } from "@shapilev/console-step";
import { Application, Assets, Sprite } from "pixi.js";
import { useEffect, useMemo } from "react";
import { qassam3 } from "./objects/missile/missile.dataset";
import { Angle } from "./physics/angle/angle";
import { Distance } from "./physics/distance/distance";
import { Time } from "./physics/time/time";

const missile = qassam3.clone();
missile.angle = Angle.createDegreeAngle(30);

export const useGame = (app: Application | undefined) => {
  const { isDataReady, toSimulation } = useSimulationDistance();

  const missileSize = useMemo(() => {
    const heightRatio = missile.size.width.centimeters / missile.size.height.centimeters

    return {
      width: 10,
      height: 10 * heightRatio
    }
  }, [])
  
  useEffect(() => {
    if (!app || !isDataReady) return;

    const init = async () => {
      const missileImage = await Assets.load("tamir-interceptor.png");
      const missileCanvasEl = new Sprite(missileImage);

      missileCanvasEl.width = missileSize.width;
      missileCanvasEl.height = missileSize.height;
      missileCanvasEl.rotation = Math.PI - missile.direction.radians;
      missileCanvasEl.x = toSimulation(Distance.createMeters(missile.coords.axisXmeters))
      missileCanvasEl.y = toSimulation(Distance.createMeters(missile.coords.axisYmeters))

      // app.stage.addChild(missileCanvasEl);

      const INTERVAL_TIME = Time.createSeconds(1);
      
      setInterval(() => {
        const { coords, direction } = missile.move(INTERVAL_TIME);
        
        new ConsoleStep(`(${coords.x.kilometers.toFixed(4)}km, ${coords.y.kilometers.toFixed(4)}km)`).logAfter(s => {
          s.createStep("Velocity: " + missile.velocityVector.metersPerSecond.toFixed(4) + "[m/s]")
          
          if(missile.isNoFuelRemaining) {
            s.createStep("No fuel", StepVariety.Warning)
          }
        })
              
        missileCanvasEl.x = toSimulation(coords.x);
        missileCanvasEl.y = toSimulation(coords.y);
        missileCanvasEl.rotation = direction.radians;
      }, INTERVAL_TIME.milliseconds / 2);

      console.log("No more fuel");
    };

    init();
  }, [app, isDataReady, missileSize.height, missileSize.width, toSimulation]);
};
