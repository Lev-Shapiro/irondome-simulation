import { useSimulationDistance } from '@/external/hooks/use-window-size';
import { Application } from 'pixi.js';
import { useEffect, useRef } from 'react';
import { Distance } from './physics/distance/distance';
import { useGame } from './useGame';

export default function Simulation() {
  const appRef = useRef<Application>();
  const {isDataReady, windowSize } = useSimulationDistance();
  const pixiContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      throw new Error("Ensure to load the simulation correctly");
    }

    const app = new Application({
      width: windowSize.widthScreenPixels,
      height: windowSize.heightScreenPixels,
      backgroundColor: 0x1099bb,
    });

    appRef.current = app;

    if (pixiContainerRef.current) {
      pixiContainerRef.current.appendChild(app.view as unknown as Node);
    }

    const handleResize = () => {
      app.renderer.resize(window.innerWidth, window.innerHeight);
      windowSize.handleScreenResize(window.innerWidth, window.innerHeight);
      windowSize.setRealWorld(
        Distance.createKilometers(200),
        Distance.createKilometers((window.innerHeight / window.innerWidth) * 200)
      );
    };

    if(!isDataReady) {
      handleResize();
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      app.destroy(true, { children: true });
    };
  }, [isDataReady, windowSize]);

  useGame(appRef.current);

  return <div ref={pixiContainerRef} style={{ width: '100%', height: '100%' }}></div>;
}
