/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable @stylistic/comma-dangle */
/* eslint-disable @stylistic/array-bracket-spacing */
import { Grid, GridItem, Text, Box, Skeleton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

import { route } from 'nextjs-routes';

import config from 'configs/app';
import getQueryParamString from 'lib/router/getQueryParamString';
import CopyToClipboard from 'ui/shared/CopyToClipboard';
import * as DetailsInfoItem from 'ui/shared/DetailsInfoItem';
import DetailsInfoItemDivider from 'ui/shared/DetailsInfoItemDivider';
import DetailsTimestamp from 'ui/shared/DetailsTimestamp';
import HashStringShortenDynamic from 'ui/shared/HashStringShortenDynamic';
import LinkInternal from 'ui/shared/links/LinkInternal';
import PrevNext from 'ui/shared/PrevNext';

import type { UTXOBlockQuery } from './useUTXOBlockQuery';
interface Props {
  query: UTXOBlockQuery;
}
const UTXOBlockDetails = ({ query }: Props) => {
  // const [isExpanded, setIsExpanded] = React.useState(false);
  const router = useRouter();
  const heightOrHash = getQueryParamString(router.query.height_or_hash);
  const { data, isPlaceholderData } = query;
  // const handleCutClick = React.useCallback(() => {
  //   setIsExpanded((flag) => !flag);
  //   scroller.scrollTo('BlockDetails__cutLink', {
  //     duration: 500,
  //     smooth: true,
  //   });
  // }, []);
  const handlePrevNextClick = React.useCallback(
    (direction: 'prev' | 'next') => {
      if (!data) {
        return;
      }
      const increment = direction === 'next' ? +1 : -1;
      const nextId = String(data.height + increment);
      router.push(
        {
          pathname: '/qitmeer_block/[height_or_hash]',
          query: { height_or_hash: nextId },
        },
        undefined
      );
    },
    [data, router]
  );
  if (!data) {
    return null;
  }
  const txsNum = (() => {
    const blockTxsNum = (
      <LinkInternal
        href={route({
          pathname: '/qitmeer_block/[height_or_hash]',
          query: { height_or_hash: heightOrHash, tab: 'txs' },
        })}
      >
        {data.tx_count} txn{data.tx_count === 1 ? '' : 's'}
      </LinkInternal>
    );
    const blockBlobTxsNum =
      config.features.dataAvailability.isEnabled && data.tx_count ? (
        <>
          <span> including </span>
          <LinkInternal
            href={route({
              pathname: '/qitmeer_block/[height_or_hash]',
              query: { height_or_hash: heightOrHash, tab: 'blob_txs' },
            })}
          >
            {data.tx_count} blob txn{data.tx_count === 1 ? '' : 's'}
          </LinkInternal>
        </>
      ) : null;
    return (
      <>
        {blockTxsNum}
        {blockBlobTxsNum}
        <span> in this block</span>
      </>
    );
  })();
  const blockTypeLabel = (() => {
    return 'Block';
  })();
  return (
    <Grid
      columnGap={8}
      rowGap={{ base: 3, lg: 3 }}
      templateColumns={{
        base: 'minmax(0, 1fr)',
        lg: 'minmax(min-content, 200px) minmax(0, 1fr)',
      }}
      overflow="hidden"
    >
      <DetailsInfoItem.Label
        hint="The block height of a particular block is defined as the number of blocks preceding it in the blockchain"
        isLoading={isPlaceholderData}
      >
        {blockTypeLabel} height
      </DetailsInfoItem.Label>
      <DetailsInfoItem.Value>
        <Skeleton isLoaded={!isPlaceholderData}>{data.height}</Skeleton>
        {data.height === 0 && <Text whiteSpace="pre"> - Genesis Block</Text>}
        <PrevNext
          ml={6}
          onClick={handlePrevNextClick}
          prevLabel="View previous block"
          nextLabel="View next block"
          isPrevDisabled={data.height === 0}
          isLoading={isPlaceholderData}
        />
      </DetailsInfoItem.Value>
      <DetailsInfoItem.Label
        hint="Order of the block in bytes"
        isLoading={isPlaceholderData}
      >
        Order
      </DetailsInfoItem.Label>
      <DetailsInfoItem.Value>
        <Skeleton isLoaded={!isPlaceholderData}>{data.block_order}</Skeleton>
      </DetailsInfoItem.Value>
      <DetailsInfoItem.Label hint="Pow of the block in bytes">
        Pow
      </DetailsInfoItem.Label>
      <DetailsInfoItem.Value>{data.pow_name}</DetailsInfoItem.Value>
      <DetailsInfoItem.Label
        hint="Date & time at which block was produced."
        isLoading={isPlaceholderData}
      >
        Timestamp
      </DetailsInfoItem.Label>
      <DetailsInfoItem.Value>
        <DetailsTimestamp
          timestamp={data.timestamp}
          isLoading={isPlaceholderData}
        />
      </DetailsInfoItem.Value>
      <DetailsInfoItem.Label
        hint="The number of transactions in the block"
        isLoading={isPlaceholderData}
      >
        Transactions
      </DetailsInfoItem.Label>
      <DetailsInfoItem.Value>
        <Skeleton isLoaded={!isPlaceholderData}>{txsNum}</Skeleton>
      </DetailsInfoItem.Value>
      <DetailsInfoItemDivider />
      {/* CUT */}
      {/* <GridItem colSpan={{ base: undefined, lg: 2 }}>
        <Element name="BlockDetails__cutLink">
          <Skeleton isLoaded={!isPlaceholderData} mt={6} display="inline-block">
            <Link
              fontSize="sm"
              textDecorationLine="underline"
              textDecorationStyle="dashed"
              onClick={handleCutClick}
            >
              {isExpanded ? 'Hide details' : 'View details'}
            </Link>
          </Skeleton>
        </Element>
      </GridItem> */}
      {/* ADDITIONAL INFO */}
      {!isPlaceholderData && (
        <>
          <GridItem
            colSpan={{ base: undefined, lg: 2 }}
            mt={{ base: 1, lg: 4 }}
          />
          <DetailsInfoItem.Label hint="Block difficulty , used to calibrate block generation time">
            Difficulty
          </DetailsInfoItem.Label>
          <DetailsInfoItem.Value overflow="hidden">
            {data.difficulty}
          </DetailsInfoItem.Value>
          <DetailsInfoItemDivider />
          <DetailsInfoItem.Label hint="The hash of the block">
            Hash
          </DetailsInfoItem.Label>
          <DetailsInfoItem.Value flexWrap="nowrap">
            <Box overflow="hidden">
              <HashStringShortenDynamic hash={data.hash} />
            </Box>
            <CopyToClipboard text={data.hash} />
          </DetailsInfoItem.Value>
          {data.height > 0 && (
            <>
              <DetailsInfoItem.Label hint="The hash of the block from which this block was generated">
                Parent hash
              </DetailsInfoItem.Label>
              <DetailsInfoItem.Value flexWrap="nowrap">
                <LinkInternal
                  href={route({
                    pathname: '/block/[height_or_hash]',
                    query: { height_or_hash: String(data.height - 1) },
                  })}
                  overflow="hidden"
                  whiteSpace="nowrap"
                >
                  <HashStringShortenDynamic hash={data.parent_root} />
                </LinkInternal>
                <CopyToClipboard text={data.parent_root} />
              </DetailsInfoItem.Value>
            </>
          )}
          {!config.UI.views.block.hiddenFields?.nonce && (
            <>
              <DetailsInfoItem.Label hint="Block nonce is a value used during mining to demonstrate proof of work for a block">
                Nonce
              </DetailsInfoItem.Label>
              <DetailsInfoItem.Value>{data.nonce}</DetailsInfoItem.Value>
            </>
          )}
        </>
      )}
    </Grid>
  );
};
export default UTXOBlockDetails;
