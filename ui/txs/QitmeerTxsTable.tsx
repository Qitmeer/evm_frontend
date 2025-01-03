import { Table, Tbody, Tr, Th } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import React from 'react';

import type { UTXOTransaction } from 'types/api/qitmeer_tx';
import type { TransactionsSortingField, TransactionsSortingValue } from 'types/api/transaction';

import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import useLazyRenderedList from 'lib/hooks/useLazyRenderedList';
import TheadSticky from 'ui/shared/TheadSticky';

import QitmeerTxsTableItem from './QitmeerTxsTableItem';

type Props = {
  txs: Array<UTXOTransaction>;
  sort: (field: TransactionsSortingField) => () => void;
  sorting?: TransactionsSortingValue;
  top: number;
  showBlockInfo: boolean;
  showSocketInfo: boolean;
  socketInfoAlert?: string;
  socketInfoNum?: number;
  currentAddress?: string;
  enableTimeIncrement?: boolean;
  isLoading?: boolean;
};

const QitmeerTxsTable = ({
  txs,
  top,
  showBlockInfo,
  currentAddress,
  enableTimeIncrement,
  isLoading,
}: Props) => {
  const { cutRef, renderedItemsNum } = useLazyRenderedList(txs, !isLoading);

  return (
    <AddressHighlightProvider>
      <Table minWidth="950px">
        <TheadSticky top={ top }>
          <Tr>
            <Th width="54px"></Th>
            <Th width="180px">Txn hash</Th>
            <Th width="160px">Vin</Th>
            <Th width="224px">To</Th>
            <Th width="224px">Amount</Th>
            <Th width="180px">vout index</Th>
          </Tr>
        </TheadSticky>
        <Tbody>
          <AnimatePresence initial={ false }>
            { txs.slice(0, renderedItemsNum).map((item, index) => (
              <QitmeerTxsTableItem
                key={ item.hash + (isLoading ? index : '') }
                tx={ item }
                showBlockInfo={ showBlockInfo }
                currentAddress={ currentAddress }
                enableTimeIncrement={ enableTimeIncrement }
                isLoading={ isLoading }
              />
            )) }
          </AnimatePresence>
        </Tbody>
      </Table>
      <div ref={ cutRef }/>
    </AddressHighlightProvider>
  );
};

export default React.memo(QitmeerTxsTable);
