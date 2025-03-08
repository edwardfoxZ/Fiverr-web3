import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { createConfig, WagmiProvider } from "wagmi";
import { mainnet, polygon, arbitrum, optimism } from "wagmi/chains";
import { http } from "wagmi";

const chains = [mainnet, polygon, arbitrum, optimism];

const { connectors } = getDefaultWallets({
  appName: "My React App",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient: http(),
});

export function WagmiProviderWrapper({ children }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiProvider>
  );
}
