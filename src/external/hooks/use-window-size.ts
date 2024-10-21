import { Distance } from "@/simulation/physics/distance/distance";
import { useCallback, useMemo } from "react";
import { create } from "zustand";

export interface WindowSize {
  widthScreenPixels: number;
  widthDistanceRealWorld: Distance;
  heightScreenPixels: number;
  heightDistanceRealWorld: Distance;
  handleScreenResize: (width: number, height: number) => void;
  setRealWorld: (width: Distance, height: Distance) => void;
}

export const useWindowSizeStore = create<WindowSize>((set) => ({
  widthScreenPixels: 0,
  widthDistanceRealWorld: Distance.createKilometers(0),
  heightScreenPixels: 0,
  heightDistanceRealWorld: Distance.createKilometers(0),
  handleScreenResize: (width: number, height: number) =>
    set((prev) => ({
      ...prev,
      widthScreenPixels: width,
      heightScreenPixels: height,
    })),
  setRealWorld: (width: Distance, height: Distance) =>
    set((prev) => ({
      ...prev,
      widthDistanceRealWorld: width,
      heightDistanceRealWorld: height,
    })),
}));

export const useSimulationDistance = () => {
  const windowSize = useWindowSizeStore();

  const metersPerPixel = useMemo(() => {
    // MPP - Meter per Pixel
    const widthMPP =
      windowSize.widthDistanceRealWorld.meters / windowSize.widthScreenPixels;
    const heightMPP =
      windowSize.heightDistanceRealWorld.meters / windowSize.heightScreenPixels;

    return {
      widthMPP: Distance.createMeters(widthMPP),
      heightMPP: Distance.createMeters(heightMPP),
    };
  }, [windowSize]);

  const pixelsPerMeter = useMemo(() => {
    // PPM - Pixel per Meter
    const widthPPM =
      windowSize.widthScreenPixels / windowSize.widthDistanceRealWorld.meters;
    const heightPPM =
      windowSize.heightScreenPixels / windowSize.heightDistanceRealWorld.meters;

    return {
      widthPPM,
      heightPPM,
    };
  }, [windowSize]);

  const toRealWorld = useCallback(
    (px: number) => Distance.createMeters(px * metersPerPixel.widthMPP.meters),
    [metersPerPixel]
  );
  const toSimulation = useCallback(
    (d: Distance) => d.meters * pixelsPerMeter.widthPPM,
    [pixelsPerMeter]
  );

  const isDataReady = useMemo(() => windowSize.heightDistanceRealWorld && windowSize.heightScreenPixels && windowSize.widthDistanceRealWorld && windowSize.widthScreenPixels, [windowSize])

  return { isDataReady, windowSize, toRealWorld, toSimulation };
};
