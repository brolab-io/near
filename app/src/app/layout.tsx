"use client";
/* eslint-disable @next/next/no-head-element */
import "../styles/globals.css";
import "@near-wallet-selector/modal-ui/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "../common/configs/web3Config";
import "../common/plugins/axios.plugin";
import Footer from "../common/components/Footer";
import Navbar from "../common/components/Navbar";
// import Web3Provider from "../common/components/Web3Provider";
import { ToastContainer } from "../common/components/ToastContainer";
import queryClient from "../common/configs/query.client";
import { QueryClientProvider } from "../common/components/QueryClientProvider";
import NearGlobalContextProvider from "../common/contexts/NearGlobalContextProvider";

export default function RootLayout({ children }: { children: any }) {
  return (
    <html>
      <head></head>
      <body>
        <NearGlobalContextProvider>
          <QueryClientProvider client={queryClient}>
            <Navbar />
            <main className="py-[108px] bg-[#0C1226] min-h-screen">
              <>{children}</>
            </main>
            <Footer />
            {/* <Web3Provider /> */}
            <ToastContainer />
          </QueryClientProvider>
        </NearGlobalContextProvider>
      </body>
    </html>
  );
}
