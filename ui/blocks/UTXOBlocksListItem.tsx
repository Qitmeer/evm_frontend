/* eslint-disable react/jsx-curly-spacing */
import { Flex, Skeleton, Text } from '@chakra-ui/react';
import React from 'react';

import type { UTXOBlock } from 'types/api/utxoblock';

import { route } from 'nextjs-routes';

import UTXOBlockEntity from 'ui/shared/entities/block/UTXOBlockEntity';
import LinkInternal from 'ui/shared/links/LinkInternal';
import ListItemMobile from 'ui/shared/ListItemMobile/ListItemMobile';
import TimeAgoWithTooltip from 'ui/shared/TimeAgoWithTooltip';

interface Props {
  data: UTXOBlock;
  isLoading?: boolean;
  enableTimeIncrement?: boolean;
}

const UTXOBlocksListItem = ({
  data,
  isLoading,
  enableTimeIncrement,
}: Props) => {
  return (
    <ListItemMobile rowGap={3} key={String(data.BlockOrder)} isAnimated>
      <Flex justifyContent="space-between" w="100%">
        <Flex columnGap={2} alignItems="center">
          <UTXOBlockEntity
            isLoading={isLoading}
            number={data.BlockOrder}
            hash={data.hash}
            noIcon
            fontWeight={600}
          />
        </Flex>
        <TimeAgoWithTooltip
          timestamp={data.BlockTime}
          enableIncrement={enableTimeIncrement}
          isLoading={isLoading}
          color="text_secondary"
          fontWeight={400}
          display="inline-block"
        />
      </Flex>
      <Flex columnGap={2}>
        <Text fontWeight={500}>Coinbase</Text>
        <Skeleton
          isLoaded={!isLoading}
          display="inline-block"
          color="text_secondary"
        >
          <span>{data.Coinbase} MEER</span>
        </Skeleton>
      </Flex>
      <Flex columnGap={2}>
        <Text fontWeight={500}>Algorithm</Text>
        <Skeleton
          isLoaded={!isLoading}
          display="inline-block"
          color="text_secondary"
        >
          <span>{data.Pow}</span>
        </Skeleton>
      </Flex>
      <Flex columnGap={2}>
        <Text fontWeight={500}>Miner</Text>
        <span>{data.Miner} MEER</span>
      </Flex>
      <Flex columnGap={2}>
        <Text fontWeight={500}>Txn</Text>
        {data.TransactionsCount > 0 ? (
          <Skeleton isLoaded={!isLoading} display="inline-block">
            <LinkInternal
              href={route({
                pathname: '/utxoblock/[height_or_hash]',
                query: { height_or_hash: String(data.BlockOrder), tab: 'txs' },
              })}
            >
              {data.TransactionsCount}
            </LinkInternal>
          </Skeleton>
        ) : (
          <Text variant="secondary">{data.TransactionsCount}</Text>
        )}
      </Flex>
    </ListItemMobile>
  );
};

export default UTXOBlocksListItem;
