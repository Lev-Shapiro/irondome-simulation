// "use client";

// import { useEffect } from 'react';

// import { useWindowSizeStore } from '@/external/hooks/use-window-size';
// import { Stage } from '@pixi/react';
// import { qassam3 } from './objects/missile/missile.dataset';
// import { Distance } from './physics/distance/distance';
// import { Missile } from './presentation/Missile/Missile';


// export default function Simulation() {

//   useEffect(() => {
//     if(typeof window === 'undefined' || typeof document === 'undefined') {
//       throw new Error("Ensure to load the simulation correctly");
//     }
//   }, [])

//   const windowSize = useWindowSizeStore((state) => state);

//   useEffect(() => {
//     const currentWindowWidth = window.innerWidth;
//     const currentWindowHeight = window.innerHeight;

//     const handleResize = () => {
//       windowSize.handleScreenResize(currentWindowWidth, currentWindowHeight);
//       windowSize.setRealWorld(Distance.createKilometers(1000), Distance.createKilometers(window.innerHeight / window.innerWidth * 1000))
//     };

//     if (
//       windowSize.widthScreenPixels !== currentWindowWidth ||
//       windowSize.heightScreenPixels !== currentWindowHeight
//     ) {
//       handleResize()
//     }

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);
  
//   useEffect(() => {
//     let isFullyBurned = false;

//     while(!isFullyBurned) {
//       const info = missile.burn();
      
//       if(!info) {
//         isFullyBurned = true;
//         break;
//       }

//       const x = toSimulation(info.x);
//       const y = toSimulation(info.y);
//       console.log({ x, y });
//     }

//     console.log("No more fuel");
//   }, [])
  
//   return (
//     <Stage width={windowSize.widthScreenPixels} height={windowSize.heightScreenPixels} options={{ background: 0x1099bb }}>
//       <Missile missile={qassam3} />
//     </Stage>
//   );
// }