/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @stylistic/array-bracket-spacing */
/* eslint-disable @stylistic/comma-dangle */
/* eslint-disable @stylistic/indent */
/* eslint-disable @stylistic/operator-linebreak */
/* eslint-disable react/jsx-tag-spacing */
/* eslint-disable @stylistic/template-curly-spacing */
/* eslint-disable react/jsx-curly-spacing */
import { chakra, Skeleton } from '@chakra-ui/react';
import capitalize from 'lodash/capitalize';
import { useRouter } from 'next/router';
import React from 'react';

import type { PaginationParams } from 'ui/shared/pagination/types';
import type { RoutedTab } from 'ui/shared/Tabs/types';

import config from 'configs/app';
import { useAppContext } from 'lib/contexts/app';
import throwOnAbsentParamError from 'lib/errors/throwOnAbsentParamError';
import useIsMobile from 'lib/hooks/useIsMobile';
import getNetworkValidationActionText from 'lib/networks/getNetworkValidationActionText';
import getQueryParamString from 'lib/router/getQueryParamString';
import useUTXOBlockQuery from 'ui/block/useUTXOBlockQuery';
import useUTXOBlockTxsQuery from 'ui/block/useUTXOBlockTxsQuery';
import UTXOBlockDetails from 'ui/block/UTXOBlockDetails';
import TextAd from 'ui/shared/ad/TextAd';
import ServiceDegradationWarning from 'ui/shared/alerts/ServiceDegradationWarning';
import NetworkExplorers from 'ui/shared/NetworkExplorers';
import PageTitle from 'ui/shared/Page/PageTitle';
import Pagination from 'ui/shared/pagination/Pagination';
import RoutedTabs from 'ui/shared/Tabs/RoutedTabs';
import TabsSkeleton from 'ui/shared/Tabs/TabsSkeleton';
import QitmeerTxsWithFrontendSorting from 'ui/txs/QitmeerTxsWithFrontendSorting';
const TAB_LIST_PROPS = {
  marginBottom: 0,
  pt: 6,
  pb: 6,
  marginTop: -5,
};
const TABS_HEIGHT = 88;
const UTXOBlockPageContent = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const appProps = useAppContext();
  const heightOrHash = getQueryParamString(router.query.height_or_hash);
  const tab = getQueryParamString(router.query.tab);
  const blockQuery = useUTXOBlockQuery({ heightOrHash });
  const blockTxsQuery = useUTXOBlockTxsQuery({
    heightOrHash,
    blockQuery,
    tab,
  });
  const blockBlobTxsQuery = useUTXOBlockTxsQuery({
    heightOrHash,
    blockQuery,
    tab,
  });
  const hasPagination = !isMobile && tab === 'txs';
  const tabs: Array<RoutedTab> = React.useMemo(
    () =>
      [
        {
          id: 'index',
          title: 'Details',
          component: (
            <>
              {blockQuery.isDegradedData && (
                <ServiceDegradationWarning
                  isLoading={blockQuery.isPlaceholderData}
                  mb={6}
                />
              )}
              <UTXOBlockDetails query={blockQuery} />
            </>
          ),
        },
        {
          id: 'txs',
          title: 'Transactions',
          component: (
            <>
              {blockTxsQuery.isDegradedData && (
                <ServiceDegradationWarning
                  isLoading={blockTxsQuery.isPlaceholderData}
                  mb={6}
                />
              )}
              <QitmeerTxsWithFrontendSorting
                query={blockTxsQuery}
                showBlockInfo={false}
                showSocketInfo={false}
                top={hasPagination ? TABS_HEIGHT : 0}
              />
            </>
          ),
        },
        config.features.dataAvailability.isEnabled && blockQuery.data?.tx_count
          ? {
              id: 'blob_txs',
              title: 'Blob txns',
              component: (
                <QitmeerTxsWithFrontendSorting
                  query={blockBlobTxsQuery}
                  showBlockInfo={false}
                  showSocketInfo={false}
                />
              ),
            }
          : null,
      ].filter(Boolean),
    [blockBlobTxsQuery, blockQuery, blockTxsQuery, hasPagination, heightOrHash]
  );
  let pagination;
  if (tab === 'txs') {
    pagination = blockTxsQuery.pagination;
  }
  const backLink = React.useMemo(() => {
    const hasGoBackLink =
      appProps.referrer && appProps.referrer.includes('/utxoblocks');
    if (!hasGoBackLink) {
      return;
    }
    return {
      label: 'Back to blocks list',
      url: appProps.referrer,
    };
  }, [appProps.referrer]);
  throwOnAbsentParamError(heightOrHash);
  const title = (() => {
    return `Block #${blockQuery.data?.block_order}`;
  })();
  const titleSecondRow = (
    <>
      {!config.UI.views.block.hiddenFields?.miner &&
        blockQuery.data?.miner_hash && (
          <Skeleton
            isLoaded={!blockQuery.isPlaceholderData}
            fontFamily="heading"
            display="flex"
            minW={0}
            columnGap={2}
            fontWeight={500}
          >
            <chakra.span flexShrink={0}>
              {`${capitalize(getNetworkValidationActionText())} by`}
            </chakra.span>
            {blockQuery.data.miner_hash}
          </Skeleton>
        )}
      <NetworkExplorers
        type="block"
        pathParam={heightOrHash}
        ml={{
          base: config.UI.views.block.hiddenFields?.miner ? 0 : 3,
          lg: 'auto',
        }}
      />
    </>
  );
  return (
    <>
      <TextAd mb={6} />
      <PageTitle
        title={title}
        backLink={backLink}
        secondRow={titleSecondRow}
        isLoading={blockQuery.isPlaceholderData}
      />
      {blockQuery.isPlaceholderData ? (
        <TabsSkeleton tabs={tabs} />
      ) : (
        <RoutedTabs
          tabs={tabs}
          tabListProps={isMobile ? undefined : TAB_LIST_PROPS}
          rightSlot={
            hasPagination ? (
              <Pagination {...(pagination as PaginationParams)} />
            ) : null
          }
          stickyEnabled={hasPagination}
        />
      )}
    </>
  );
};
export default UTXOBlockPageContent;
