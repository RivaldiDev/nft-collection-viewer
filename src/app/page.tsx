"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  RefreshCw,
  AlertCircle,
  Image as ImageIcon,
  BarChart3,
  TrendingUp,
  Layers,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

function fmtNum(n: number): string {
  if (n >= 1e9) return (n / 1e9).toFixed(2) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(2) + "M";
  return n.toFixed(2);
}

const EMOJIS = [
  "🎨", "🖼️", "🎮", "🎵", "💎", "🚀", "🌟", "🔥", "⚡", "🌈",
  "🎪", "🎭", "🦾", "👾", "🎲", "🎯", "🏆", "💫", "🌙", "🔮",
];

export default function Home() {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNFTs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/nfts/list?order=h24_volume_native_desc&per_page=20&page=1"
      );
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      setNfts(data.slice(0, 20));
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Failed to fetch NFT data"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNFTs();
  }, [fetchNFTs]);

  const totalVol = nfts.reduce(
    (s, n) => s + (n.data?.h24_volume_native_currency || 0),
    0
  );
  const totalFloor = nfts.reduce(
    (s, n) => s + (n.data?.floor_price_native_currency || 0),
    0
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-violet-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <ImageIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold gradient-text">
                  NFT Galaxy
                </h1>
                <p className="text-[10px] text-muted-foreground -mt-0.5 tracking-wider uppercase">
                  Collection Viewer
                </p>
              </div>
            </div>
            <Button
              onClick={fetchNFTs}
              variant="outline"
              size="sm"
              className="border-violet-500/20 hover:bg-violet-500/10"
              disabled={loading}
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
              <span className="hidden sm:inline ml-2">Refresh</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {[
            {
              label: "Total Collections",
              value: String(nfts.length),
              color: "text-violet-400",
              icon: <Layers className="w-5 h-5" />,
            },
            {
              label: "Total Volume (24h)",
              value: fmtNum(totalVol) + " ETH",
              color: "text-cyan-400",
              icon: <BarChart3 className="w-5 h-5" />,
            },
            {
              label: "Avg Floor Price",
              value:
                (totalFloor / (nfts.length || 1)).toFixed(3) + " ETH",
              color: "text-pink-400",
              icon: <TrendingUp className="w-5 h-5" />,
            },
            {
              label: "Top Collection",
              value: nfts[0]?.name || "—",
              color: "text-yellow-400",
              icon: <ImageIcon className="w-5 h-5" />,
            },
          ].map((s) => (
            <Card key={s.label} className="bg-white/5 border-white/5">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2 text-muted-foreground">
                  {s.icon}
                </div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  {s.label}
                </p>
                <p className={`text-lg font-bold mt-1 ${s.color} truncate`}>
                  {s.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Error */}
        {error && (
          <div className="glass rounded-2xl p-6 mb-6 border border-red-500/20">
            <div className="flex items-center gap-3 text-red-400">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <div>
                <p className="font-medium">Failed to load data</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {error}
                </p>
              </div>
            </div>
            <Button
              onClick={fetchNFTs}
              variant="outline"
              size="sm"
              className="mt-4 border-red-500/20 text-red-400 hover:bg-red-500/10"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        )}

        {/* NFT Grid */}
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-gradient-to-b from-violet-400 to-cyan-400 rounded-full" />
          Top NFT Collections
        </h2>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-2 border-white/10 border-t-violet-400 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading NFT collections…</p>
          </div>
        ) : !error ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {nfts.map((nft, i) => {
              const floor =
                nft.data?.floor_price_native_currency || 0;
              const vol =
                nft.data?.h24_volume_native_currency || 0;
              const change =
                nft.data?.h24_volume_change_usd || 0;
              return (
                <motion.div
                  key={nft.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Card className="bg-white/[0.03] border-white/5 hover:border-violet-500/30 transition-all hover:-translate-y-1 cursor-pointer">
                    <div className="aspect-square bg-gradient-to-br from-violet-950/50 to-cyan-950/30 flex items-center justify-center text-5xl relative">
                      {EMOJIS[i % EMOJIS.length]}
                      <span className="absolute top-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[10px] font-bold text-violet-400">
                        #{i + 1}
                      </span>
                    </div>
                    <CardContent className="p-3">
                      <p className="font-semibold text-sm truncate">
                        {nft.name}{" "}
                        <Badge
                          variant="outline"
                          className="text-[9px] text-violet-400 border-violet-400/20 ml-1"
                        >
                          {(
                            nft.asset_platform_id || "ETH"
                          )
                            .substring(0, 4)
                            .toUpperCase()}
                        </Badge>
                      </p>
                      <p className="text-[11px] text-muted-foreground mb-2">
                        {nft.symbol || "NFT"}
                      </p>
                      <div className="flex justify-between text-xs">
                        <div>
                          <p className="text-[9px] text-muted-foreground">
                            Floor
                          </p>
                          <p className="font-semibold text-violet-400">
                            {floor
                              ? floor.toFixed(3) + " ETH"
                              : "—"}
                          </p>
                        </div>
                        <div>
                          <p className="text-[9px] text-muted-foreground">
                            24h Vol
                          </p>
                          <p className="font-semibold">
                            {vol
                              ? vol.toFixed(2) + " ETH"
                              : "—"}
                          </p>
                        </div>
                        <div>
                          <p className="text-[9px] text-muted-foreground">
                            24h
                          </p>
                          <p
                            className={`font-semibold ${
                              change >= 0
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {change
                              ? change.toFixed(1) + "%"
                              : "—"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : null}
      </main>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-xs text-muted-foreground border-t border-white/5">
        NFT Galaxy © 2026 · Data from CoinGecko NFT API
      </footer>
    </div>
  );
}
