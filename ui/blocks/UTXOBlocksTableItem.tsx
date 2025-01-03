/* eslint-disable react/jsx-curly-spacing */
import { Tr, Td, Flex, Tooltip, Skeleton } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';

import type { UTXOBlock } from 'types/api/qitmeer_block';

import { route } from 'nextjs-routes';

import UTXOBlockEntity from 'ui/shared/entities/block/UTXOBlockEntity';
import LinkInternal from 'ui/shared/links/LinkInternal';
import TimeAgoWithTooltip from 'ui/shared/TimeAgoWithTooltip';
interface Props {
  data: UTXOBlock;
  isLoading?: boolean;
  enableTimeIncrement?: boolean;
}
const UTXOBlocksTableItem = ({
  data,
  isLoading,
  enableTimeIncrement,
}: Props) => {
  return (
    <Tr
      as={motion.tr}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transitionDuration="normal"
      transitionTimingFunction="linear"
      key={data.block_order}
    >
      <Td fontSize="sm">
        <Flex columnGap={2} alignItems="center" mb={2}>
          <Tooltip label="Block">
            <UTXOBlockEntity
              isLoading={isLoading}
              number={data.block_order}
              hash={data.hash}
              noIcon
              fontSize="sm"
              lineHeight={5}
              fontWeight={600}
            />
          </Tooltip>
        </Flex>
        <TimeAgoWithTooltip
          timestamp={data.timestamp}
          enableIncrement={enableTimeIncrement}
          isLoading={isLoading}
          color="text_secondary"
          fontWeight={400}
          display="inline-block"
        />
      </Td>
      <Td fontSize="sm">
        <Skeleton isLoaded={!isLoading} display="inline-block">
          {data.hash}
        </Skeleton>
      </Td>
      <Td fontSize="sm">
        <Skeleton isLoaded={!isLoading} display="inline-block">
          {data.coinbase}
        </Skeleton>
      </Td>
      <Td fontSize="sm">
        <Skeleton isLoaded={!isLoading} display="inline-block">
          {data.pow_name}
        </Skeleton>
      </Td>
      <Td fontSize="sm">
        <Skeleton isLoaded={!isLoading} display="inline-block">
          {data.miner_hash}
        </Skeleton>
      </Td>
      <Td isNumeric fontSize="sm">
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
          data.tx_count
        )}
      </Td>
      <Td fontSize="sm">
        <Skeleton isLoaded={!isLoading} display="inline-block">
          {data.status}
        </Skeleton>
      </Td>
    </Tr>
  );
};
export default React.memo(UTXOBlocksTableItem);
