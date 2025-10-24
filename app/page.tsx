"use client";

import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  const CustomWalletButton = () => {
    const { connected, publicKey, disconnect, connecting } = useWallet();
    const { setVisible } = useWalletModal();

    const baseButtonClass =
      "bg-[#0A4D3C] hover:bg-[#0c5f4a] text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 duration-300 shadow-md shadow-green-200";

    const copyToClipboard = async (text?: string) => {
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
        toast.success("Wallet address copied!", {
          style: {
            background: "#0A4D3C",
            color: "#fff",
          },
        });
      } catch (err) {
        toast.error("Failed to copy wallet address");
        console.error("Copy failed:", err);
      }
    };

    if (connecting) {
      return <button className={baseButtonClass} disabled>Connecting...</button>;
    }

    if (connected) {
      const short =
        publicKey &&
        `${publicKey.toBase58().slice(0, 4)}...${publicKey
          .toBase58()
          .slice(-4)}`;

      return (
        <div className="relative inline-flex items-center gap-2">
          {/* Main button - click to copy */}
          <button
            className={baseButtonClass + " flex items-center gap-2"}
            onClick={() => copyToClipboard(publicKey?.toBase58())}
            aria-label="Copy wallet address"
            title="Click to copy wallet address"
          >
            {short}
          </button>

          {/* Change wallet button */}
          <button
            className="bg-white/10 hover:bg-white/20 text-white rounded-md p-2 transition"
            onClick={() => setVisible(true)}
            aria-label="Change wallet"
            title="Change wallet"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
              />
            </svg>
          </button>

          {/* Disconnect button (hover menu) */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
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

  const copyTopRight = async (text?: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Wallet address copied!", {
        style: {
          background: "#0A4D3C",
          color: "#fff",
        },
      });
    } catch (err) {
      toast.error("Failed to copy wallet address");
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#E8F5F0]">
      {/* Top-right wallet info (only if connected) */}
      {publicKey && (
        <div className="absolute top-4 right-6 flex items-center gap-4">
          {/* Balance display - separate from wallet address */}
          <div className="bg-white text-[#0A4D3C] shadow-md rounded-xl px-4 py-3 font-medium border border-[#0A4D3C]/20">
            <p className="flex items-center gap-2">
              <span>💰</span>
              <span>{balance !== null ? balance.toFixed(4) : "--"} SOL</span>
            </p>
          </div>

          {/* Wallet address - green background */}
          <div
            className="bg-[#0A4D3C] text-white shadow-md rounded-xl px-4 py-3 font-medium cursor-pointer select-none hover:bg-[#0c5f4a] transition-colors"
            onClick={() => copyTopRight(publicKey.toBase58())}
            title="Click to copy wallet address"
          >
            <p className="text-sm">
              {publicKey.toBase58().slice(0, 6)}...{publicKey.toBase58().slice(-4)}
            </p>
          </div>
        </div>
      )}

      {/* Center connect button */}
      <CustomWalletButton />
    </div>
  );
}