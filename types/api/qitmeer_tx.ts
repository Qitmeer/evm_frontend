import type { UTXOBlockTransactionsResponse } from './qitmeer_block';
export type UTXOTransaction = {
  hash: string;
  block_order?: number;
  height: number;
  block_hash?: string;
  tx_index: number;
  index: number;
  size: number;
  lock_time?: number;
  to_address: string;
  amount: string;
  fee: string;
  spent_tx_hash?: string;
  tx_time: string;
  vin: string;
  pk_script: string;
  status: number;
};
export type TransactionsResponse =
  | UTXOTransactionsResponseValidated
  | UTXOTransactionsResponsePending;
export interface UTXOTransactionsResponseValidated {
  items: Array<UTXOTransaction>;
  next_page_params: {
    block_number: number;
    index: number;
    items_count: number;
    filter: 'validated';
  } | null;
}
export interface UTXOTransactionsResponsePending {
  items: Array<UTXOTransaction>;
  next_page_params: {
    inserted_at: string;
    hash: string;
    filter: 'pending';
  } | null;
}
export interface UTXOTransactionsResponseWithBlobs {
  items: Array<UTXOTransaction>;
  next_page_params: {
    block_number: number;
    index: number;
    items_count: number;
  } | null;
}
export type UTXOTxsResponse =
  | UTXOTransactionsResponseValidated
  | UTXOTransactionsResponsePending
  | UTXOBlockTransactionsResponse;
export interface UTXOTransactionsSorting {
  sort: 'amount' | 'fee' | 'blockorder';
  order: 'asc' | 'desc';
}
