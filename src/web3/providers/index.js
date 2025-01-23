import CrowdFundingProvider from "./crowd-funding-provider";
import IcoProvider from "./ico-provider";
import StakingProvider from "./staking-provider";

export default function Web3Providers({ children }) {
   return (
      <CrowdFundingProvider>
         <IcoProvider>
            <StakingProvider>{children}</StakingProvider>
         </IcoProvider>
      </CrowdFundingProvider>
   );
}
