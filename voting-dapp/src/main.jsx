import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import {
   WagmiProvider,
   createConfig,
   http,
} from "wagmi";

import { SCROLL_SEPOLIA_CHAIN} from "./constants/config";
import { injected } from "wagmi/connectors";


import {QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const config = createConfig({
   autoConnect: true,
   chains: [SCROLL_SEPOLIA_CHAIN],
   connectors: [injected()],
   PublicClient: http(),
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <QueryClientProvider client={queryClient}>
       <WagmiProvider config={config}>
          <App />
       </WagmiProvider>
     </QueryClientProvider>
   </React.StrictMode>
);