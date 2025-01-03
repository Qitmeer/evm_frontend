/* eslint-disable react/jsx-curly-spacing */
import { Flex, Skeleton, Text } from '@chakra-ui/react';
import React from 'react';

import type { UTXOBlock } from 'types/api/qitmeer_block';

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
    <ListItemMobile rowGap={3} key={String(data.block_order)} isAnimated>
      <Flex justifyContent="space-between" w="100%">
        <Flex columnGap={2} alignItems="center">
          <UTXOBlockEntity
            isLoading={isLoading}
            number={data.block_order}
            hash={data.hash}
            noIcon
            fontWeight={600}
          />
        </Flex>
        <TimeAgoWithTooltip
          timestamp={data.timestamp}
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
          <span>{data.coinbase} MEER</span>
        </Skeleton>
      </Flex>
      <Flex columnGap={2}>
        <Text fontWeight={500}>Algorithm</Text>
        <Skeleton
          isLoaded={!isLoading}
          display="inline-block"
          color="text_secondary"
        >
          <span>{data.pow_name}</span>
        </Skeleton>
      </Flex>
      <Flex columnGap={2}>
        <Text fontWeight={500}>Miner</Text>
        <span>{data.miner_hash} </span>
      </Flex>
      <Flex columnGap={2}>
        <Text fontWeight={500}>Txn</Text>
        {data.tx_count > 0 ? (
          <Skeleton isLoaded={!isLoading} display="inline-block">
            <LinkInternal
              href={route({
                pathname: '/qitmeer_block/[height_or_hash]',
                query: { height_or_hash: String(data.block_order), tab: 'txs' },
              })}
            >
              {data.tx_count}
            </LinkInternal>
          </Skeleton>
        ) : (
          <Text variant="secondary">{data.tx_count}</Text>
        )}
      </Flex>
    </ListItemMobile>
  );
};
export default UTXOBlocksListItem;
