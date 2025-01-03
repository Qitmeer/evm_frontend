import {
  Tr,
  Td,
  VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';

import type { UTXOTransaction } from 'types/api/qitmeer_tx';

import TxEntity from 'ui/shared/entities/tx/TxEntity';
import TimeAgoWithTooltip from 'ui/shared/TimeAgoWithTooltip';
import TxAdditionalInfo from 'ui/txs/TxAdditionalInfo';

type Props = {
  tx: UTXOTransaction;
  showBlockInfo: boolean;
  currentAddress?: string;
  enableTimeIncrement?: boolean;
  isLoading?: boolean;
};

const QitmeerTxsTableItem = ({ tx, enableTimeIncrement, isLoading }: Props) => {

  return (
    <Tr
      as={ motion.tr }
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transitionDuration="normal"
      transitionTimingFunction="linear"
      key={ tx.hash }
    >
      <Td pl={ 4 }>
        <TxAdditionalInfo tx={ tx } isLoading={ isLoading }/>
      </Td>
      <Td pr={ 4 }>
        <VStack alignItems="start" lineHeight="24px">
          <TxEntity
            hash={ tx.hash }
            isLoading={ isLoading }
            fontWeight={ 700 }
            noIcon
            maxW="100%"
            truncation="constant_long"
          />
          <TimeAgoWithTooltip
            timestamp={ tx.tx_time }
            enableIncrement={ enableTimeIncrement }
            isLoading={ isLoading }
            color="text_secondary"
            fontWeight="400"
          />
        </VStack>
      </Td>
      <Td>{ tx.vin }</Td>
      <Td whiteSpace="nowrap">{ tx.to_address }</Td>
      <Td whiteSpace="nowrap">{ tx.amount }</Td>
      <Td whiteSpace="nowrap">{ tx.index }</Td>
    </Tr>
  );
};

export default React.memo(QitmeerTxsTableItem);
