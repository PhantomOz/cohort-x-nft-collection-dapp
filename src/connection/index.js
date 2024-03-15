import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

export const SUPPORTED_CHAIN = 80001;

const mumbai = {
    chainId: SUPPORTED_CHAIN,
    name: "Mumbai",
    currency: "Matic",
    explorerUrl: "https://mumbai.polygonscan.com",
    rpcUrl: import.meta.env.VITE_rpc_url,
};

const metadata = {
    name: "My Website",
    description: "My Website description",
    url: "https://mywebsite.com", // origin must match your domain & subdomain
    icons: ["https://avatars.mywebsite.com/"],
};

export const configureWeb3Modal = () =>
    createWeb3Modal({
        ethersConfig: defaultConfig({ metadata }),
        chains: [mumbai],
        projectId: import.meta.env.VITE_projectId,
        enableAnalytics: false, // Optional - defaults to your Cloud configuration
    });
