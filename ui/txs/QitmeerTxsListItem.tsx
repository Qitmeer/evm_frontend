import {
  HStack,
  Flex,
  Skeleton,
} from '@chakra-ui/react';
import React from 'react';

import type { UTXOTransaction } from 'types/api/qitmeer_tx';

import ListItemMobile from 'ui/shared/ListItemMobile/ListItemMobile';
import TimeAgoWithTooltip from 'ui/shared/TimeAgoWithTooltip';

type Props = {
  tx: UTXOTransaction;
  showBlockInfo: boolean;
  currentAddress?: string;
  enableTimeIncrement?: boolean;
  isLoading?: boolean;
};

const QitmeerTxsListItem = ({ tx, isLoading, enableTimeIncrement }: Props) => {
  return (
    <ListItemMobile display="block" width="100%" isAnimated key={ tx.hash }>
      <Flex justifyContent="space-between" mt={ 4 }>
        <HStack flexWrap="wrap">{ tx.status }</HStack>
      </Flex>
      <Flex mt={ 3 }>
        <Skeleton isLoaded={ !isLoading } display="inline-block" whiteSpace="pre">
          Tx Hash
        </Skeleton>
        <Skeleton
          isLoaded={ !isLoading }
          color="text_secondary"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
        >
          <span>{ tx.hash }</span>
        </Skeleton>
      </Flex>
      <Flex mt={ 3 }>
        <Skeleton isLoaded={ !isLoading } display="inline-block" whiteSpace="pre">
          Vin
        </Skeleton>
        <Skeleton
          isLoaded={ !isLoading }
          color="text_secondary"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
        >
          <span>{ tx.vin }</span>
        </Skeleton>
      </Flex>
      <Flex mt={ 3 }>
        <Skeleton isLoaded={ !isLoading } display="inline-block" whiteSpace="pre">
          to
        </Skeleton>
        <Skeleton
          isLoaded={ !isLoading }
          color="text_secondary"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
        >
          <span>{ tx.to_address }</span>
        </Skeleton>
        <Flex mt={ 3 }>
          <Skeleton
            isLoaded={ !isLoading }
            display="inline-block"
            whiteSpace="pre"
          >
            amount
          </Skeleton>
          <Skeleton
            isLoaded={ !isLoading }
            color="text_secondary"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
          >
            <span>{ tx.amount }</span>
          </Skeleton>
        </Flex>
        <Flex mt={ 3 }>
          <Skeleton
            isLoaded={ !isLoading }
            display="inline-block"
            whiteSpace="pre"
          >
            vout index
          </Skeleton>
          <Skeleton
            isLoaded={ !isLoading }
            color="text_secondary"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
          >
            <span>{ tx.index }</span>
          </Skeleton>
        </Flex>
        <TimeAgoWithTooltip
          timestamp={ tx.tx_time }
          enableIncrement={ enableTimeIncrement }
          isLoading={ isLoading }
          color="text_secondary"
          fontWeight="400"
          fontSize="sm"
        />
      </Flex>
    </ListItemMobile>
  );
};

export default React.memo(QitmeerTxsListItem);
