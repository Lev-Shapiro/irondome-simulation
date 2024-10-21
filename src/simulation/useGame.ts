import { useSimulationDistance } from "@/external/hooks/use-window-size";
import { Application, Assets, Sprite } from "pixi.js";
import { useEffect, useMemo } from "react";
import { qassam3 } from "./objects/missile/missile.dataset";
import { Angle } from "./physics/angle/angle";
import { Time } from "./physics/time/time";

const missile = qassam3.clone();
missile.setAngle(Angle.createDegreeAngle(30));

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
      missileCanvasEl.x = toSimulation(missile.coords.x)
      missileCanvasEl.y = toSimulation(missile.coords.y)

      // app.stage.addChild(missileCanvasEl);

      const INTERVAL_TIME = Time.createSeconds(1);
      
      setInterval(() => {
        const force = missile.burnIncludingOtherForcesPerTimeframe(INTERVAL_TIME);
        
        missile.move(force.axisX, force.axisY);
        console.log({ x: missile.coords.x.kilometers, y: missile.coords.y.kilometers, speed: missile.velocityMetersPerSecond.value + "m/s" });
        
        missileCanvasEl.x = toSimulation(missile.coords.x);
        missileCanvasEl.y = toSimulation(missile.coords.y);
      }, INTERVAL_TIME.milliseconds);

      console.log("No more fuel");
    };

    init();
  }, [app, isDataReady, missileSize.height, missileSize.width, toSimulation]);
};
