"use client";

import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export default function Home() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  const CustomWalletButton = () => {
    const { connected, publicKey, disconnect, connecting } = useWallet();
    const { setVisible } = useWalletModal();

    const baseButtonClass =
      "bg-[#0A4D3C] hover:bg-[#0c5f4a] text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 duration-300 shadow-md shadow-green-200";

    if (connecting) {
      return <button className={baseButtonClass} disabled>Connecting...</button>;
    }

    if (connected) {
      return (
        <div className="relative group">
          <button className={baseButtonClass} onClick={() => setVisible(true)}>
            {publicKey &&
              `${publicKey.toBase58().slice(0, 4)}...${publicKey
                .toBase58()
                .slice(-4)}`}
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={() => setVisible(true)}
            >
              Change Wallet
            </button>
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              onClick={disconnect}
            >
              Disconnect
            </button>
          </div>
        </div>
      );
    }

    return (
      <button className={baseButtonClass} onClick={() => setVisible(true)}>
        Connect Wallet
      </button>
    );
  };

  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey) {
        try {
          const lamports = await connection.getBalance(publicKey);
          setBalance(lamports / LAMPORTS_PER_SOL);
        } catch (error) {
          console.error("Failed to fetch balance:", error);
        }
      }
    };

    fetchBalance();
    const interval = setInterval(fetchBalance, 10000);
    return () => clearInterval(interval);
  }, [connection, publicKey]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#E8F5F0]">
      {/* Top-right wallet info (only if connected) */}
      {publicKey && (
        <div className="absolute top-4 right-6 bg-[#0A4D3C] text-white shadow-md rounded-xl px-4 py-2 font-medium">
          <p>
            💰 {balance !== null ? balance.toFixed(4) : "--"} SOL
          </p>
          <p className="text-sm text-gray-200">
            {publicKey.toBase58().slice(0, 6)}...{publicKey.toBase58().slice(-4)}
          </p>
        </div>
      )}

      {/* Center connect button */}
      <CustomWalletButton />
    </div>
  );
}
