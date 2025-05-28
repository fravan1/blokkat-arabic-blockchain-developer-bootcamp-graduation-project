export const CONTRACT_ADDRESS = "0x0e03b8B47A37370D5126AA7ED07B7aAB41964076";

export { default as VotingABI } from "./VotingABI.json";

export const SCROLL_SEPOLIA_CHAIN  = {
    id: 534351,
    name: "Scroll Sepolia",
    network: "scroll-sepolia",
    nativeCurrency: {
        decimals: 18,
        name: "Etherum",
        symbol: "ETH",
    },
    rpcUrls: {
        default: {
            http: ["https://sepolia-rpc.scroll.io"],
        },
    },
    blockExplorers: {
        default: { name: "ScrollScan", url: "https://sepolia.scrollscan.com" },
    },
    testnet: true,
};