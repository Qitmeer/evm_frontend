export interface UTXOBlock {
  BlockOrder: number;
  Height: number;
  Coinbase: number;
  BlockTime: string;
  TransactionsCount: number;
  Miner: string;
  hash: string;
  Pow: string;
  Difficulty: string;
  Parents: Array<string>;
  Children: Array<string>;
  ParentRoot: string;
  TxRoot: string;
  StateRoot: string;
  Status: string;
}
export interface UTXOBlocksResponse {
  items: Array<UTXOBlock>;
  next_page_params: {
    block_number: number;
    items_count: number;
  } | null;
}
