import type { UTXOTransaction } from './qitmeer_tx';
export interface UTXOBlock {
  block_order: number;
  height: number;
  coinbase: number;
  timestamp: string;
  tx_count: number;
  miner_hash: string;
  hash: string;
  pow_name: string;
  difficulty: string;
  parent_root: string;
  status: string;
  nonce: number;
}
export interface UTXOBlocksResponse {
  items: Array<UTXOBlock>;
  next_page_params: {
    block_number: number;
    items_count: number;
  } | null;
}
export interface UTXOBlockTransactionsResponse {
  items: Array<UTXOTransaction>;
  next_page_params: {
    block_number: number;
    items_count: number;
    index: number;
  } | null;
}
