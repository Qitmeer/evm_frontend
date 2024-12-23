import { Table, Tbody, Tr, Th } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import React from 'react';

import type { UTXOBlock } from 'types/api/utxoblock';

import { AddressHighlightProvider } from 'lib/contexts/addressHighlight';
import UTXOBlocksTableItem from 'ui/blocks/UTXOBlocksTableItem';
import * as SocketNewItemsNotice from 'ui/shared/SocketNewItemsNotice';
import { default as Thead } from 'ui/shared/TheadSticky';

interface Props {
  data: Array<UTXOBlock>;
  isLoading?: boolean;
  top: number;
  page: number;
  socketInfoNum?: number;
  socketInfoAlert?: string;
  showSocketInfo?: boolean;
}

const UTXOBlocksTable = ({
  data,
  isLoading,
  top,
  page,
  showSocketInfo,
  socketInfoNum,
  socketInfoAlert,
}: Props) => {
  return (
    <AddressHighlightProvider>
      <Table minWidth="1040px" fontWeight={ 500 }>
        <Thead top={ top }>
          <Tr>
            <Th width="150px">BlockOrder</Th>
            <Th width="120px">Hash</Th>
            <Th width="120px">Coinbase</Th>
            <Th width="120px">Algorithm</Th>
            <Th width="120px">Age</Th>
            <Th width="120px">Miner</Th>
            <Th width="64px" isNumeric>
              TransactionsCount
            </Th>
            <Th width="64px" isNumeric>
              Status
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          { showSocketInfo && (
            <SocketNewItemsNotice.Desktop
              url={ window.location.href }
              alert={ socketInfoAlert }
              num={ socketInfoNum }
              type="block"
              isLoading={ isLoading }
            />
          ) }
          <AnimatePresence initial={ false }>
            { data.map((item, index) => (
              <UTXOBlocksTableItem
                key={ item.BlockOrder + (isLoading ? `${ index }_${ page }` : '') }
                data={ item }
                enableTimeIncrement={ page === 1 && !isLoading }
                isLoading={ isLoading }
              />
            )) }
          </AnimatePresence>
        </Tbody>
      </Table>
    </AddressHighlightProvider>
  );
};

export default UTXOBlocksTable;
