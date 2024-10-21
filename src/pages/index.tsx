import { useMemo } from "react";

import { Conditioned } from "@/external/components/Conditioned/Conditioned";
import dynamic from "next/dynamic";

const Game = dynamic(() => import("@/simulation/Simulation"), {
  ssr: false,
});

export default function App() {
  const documentAndWindowAreDefined = useMemo(
    () => typeof window !== "undefined" && typeof document !== "undefined",
    []
  );

  return (
    <Conditioned is={documentAndWindowAreDefined}>
      <Game />
    </Conditioned>
  );
}
