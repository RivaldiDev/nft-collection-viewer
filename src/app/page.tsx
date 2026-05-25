"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface NFT {
  id: string;
  name: string;
  symbol: string;
  asset_platform_id: string;
  data?: {
    floor_price_native_currency?: number;
    h24_volume_native_currency?: number;
    h24_volume_change_usd?: number;
  };
}

function fmtNum(n: number) {
  if (n >= 1e9) return (n / 1e9).toFixed(2) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(2) + "M";
  return n.toFixed(2);
}

const emojis = ["🎨","🖼️","🎮","🎵","💎","🚀","🌟","🔥","⚡","🌈","🎪","🎭","🦾","👾","🎲","🎯","🏆","💫","🌙","🔮"];

export default function Home() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNFTs() {
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/nfts/list?order=h24_volume_native_desc&per_page=20&page=1");
        const data = await res.json();
        setNfts(data.slice(0, 20));
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    }
    fetchNFTs();
  }, []);

  const totalVol = nfts.reduce((s, n) => s + (n.data?.h24_volume_native_currency || 0), 0);
  const totalFloor = nfts.reduce((s, n) => s + (n.data?.floor_price_native_currency || 0), 0);

  return (
    <div className="min-h-screen bg-[#0c0c14] text-slate-200">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-violet-950/20 via-[#0c0c14] to-cyan-950/10" />

      <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="border-b border-white/5 backdrop-blur-xl bg-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">NFT Galaxy</h1>
          <p className="text-xs text-slate-500 mt-1">Explore top NFT collections | CoinGecko NFT API</p>
        </div>
      </motion.header>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-4 gap-4">
        {[
          { label: "Total Collections", value: String(nfts.length), color: "text-violet-400" },
          { label: "Total Volume (24h)", value: fmtNum(totalVol) + " ETH", color: "text-cyan-400" },
          { label: "Avg Floor Price", value: (totalFloor / (nfts.length || 1)).toFixed(3) + " ETH", color: "text-pink-400" },
          { label: "Top Collection", value: nfts[0]?.name || "--", color: "text-yellow-400" },
        ].map((s) => (
          <Card key={s.label} className="bg-white/5 border-white/5">
            <CardContent className="p-4 text-center">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">{s.label}</p>
              <p className={`text-lg font-bold mt-1 ${s.color} truncate`}>{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-4">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-gradient-to-b from-violet-400 to-cyan-400 rounded-full" />
          Top NFT Collections
        </h2>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-2 border-white/10 border-t-violet-400 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-500">Loading NFT collections...</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {nfts.map((nft, i) => {
              const floor = nft.data?.floor_price_native_currency || 0;
              const vol = nft.data?.h24_volume_native_currency || 0;
              const change = nft.data?.h24_volume_change_usd || 0;
              return (
                <motion.div key={nft.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                  <Card className="bg-white/[0.03] border-white/5 hover:border-violet-500/30 transition-all hover:-translate-y-1 cursor-pointer">
                    <div className="aspect-square bg-gradient-to-br from-violet-950/50 to-cyan-950/30 flex items-center justify-center text-5xl relative">
                      {emojis[i % emojis.length]}
                      <span className="absolute top-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[10px] font-bold text-violet-400">#{i + 1}</span>
                    </div>
                    <CardContent className="p-3">
                      <p className="font-semibold text-sm truncate">{nft.name} <Badge variant="outline" className="text-[9px] text-violet-400 border-violet-400/20 ml-1">{(nft.asset_platform_id || "ETH").substring(0, 4).toUpperCase()}</Badge></p>
                      <p className="text-[11px] text-slate-500 mb-2">{nft.symbol || "NFT"}</p>
                      <div className="flex justify-between text-xs">
                        <div>
                          <p className="text-[9px] text-slate-500">Floor</p>
                          <p className="font-semibold text-violet-400">{floor ? floor.toFixed(3) + " ETH" : "--"}</p>
                        </div>
                        <div>
                          <p className="text-[9px] text-slate-500">24h Vol</p>
                          <p className="font-semibold">{vol ? vol.toFixed(2) + " ETH" : "--"}</p>
                        </div>
                        <div>
                          <p className="text-[9px] text-slate-500">24h</p>
                          <p className={`font-semibold ${change >= 0 ? "text-green-400" : "text-red-400"}`}>{change ? change.toFixed(1) + "%" : "--"}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <footer className="max-w-7xl mx-auto px-6 py-8 text-center text-xs text-slate-600 border-t border-white/5">
        NFT Galaxy &copy; 2026 | Data from CoinGecko NFT API (Free) | Built with Next.js + shadcn/ui
      </footer>
    </div>
  );
}
