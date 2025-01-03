import type { UTXOTransaction } from 'types/api/qitmeer_tx';
import type { TransactionsSortingValue } from 'types/api/transaction';

import compareBns from 'lib/bigint/compareBns';

export default function sortQitmeerTxs(sorting: TransactionsSortingValue | undefined) {
  return function sortingFn(tx1: UTXOTransaction, tx2: UTXOTransaction) {
    switch (sorting) {
      case 'value-desc':
        return compareBns(tx2.amount, tx1.amount);
      case 'value-asc':
        return compareBns(tx1.amount, tx2.amount);
      case 'fee-desc':
        return compareBns(tx2.fee || 0, tx1.fee || 0);
      case 'fee-asc':
        return compareBns(tx1.fee || 0, tx2.fee || 0);
      case 'block_number-asc': {
        if (tx1.block_order && tx2.block_order) {
          return tx1.block_order - tx2.block_order;
        }
        return 0;
      }
      default:
        return 0;
    }
  };
}
