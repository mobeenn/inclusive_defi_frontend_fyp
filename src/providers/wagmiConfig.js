import { createConfig, cookieStorage, createStorage } from "wagmi";
import { bscTestnet, mainnet } from "wagmi/chains";

export const config = createConfig({
   appName: "Inclusive Defi",
   projectId: "81071c472fca374201396407d4cad368",
   chains: [bscTestnet, mainnet],
   ssr: true,
   storage: createStorage({
      storage: cookieStorage,
   }),
});
