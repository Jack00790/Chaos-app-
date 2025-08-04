import { getContract } from "thirdweb";
import { avalanche } from "thirdweb/chains";
import { client } from "./client";

export const contract = getContract({
  client,
  chain: avalanche,
  address: process.env.NEXT_PUBLIC_CHAOS_COIN_ADDRESS!,
});

export const CHAOS_ADDRESS = process.env.NEXT_PUBLIC_CHAOS_COIN_ADDRESS!;
export const TREASURY_ADDRESS = process.env.NEXT_PUBLIC_TREASURY_ADDRESS!;