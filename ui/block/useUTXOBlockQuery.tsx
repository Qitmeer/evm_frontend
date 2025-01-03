/* eslint-disable @stylistic/array-bracket-spacing */
import type { UseQueryResult } from '@tanstack/react-query';
import React from 'react';

import type { UTXOBlock } from 'types/api/qitmeer_block';

import type { ResourceError } from 'lib/api/resources';
import useApiQuery from 'lib/api/useApiQuery';
import { retry } from 'lib/api/useQueryClientConfig';
import { SECOND } from 'lib/consts';
import { publicClient } from 'lib/web3/client';
import { UTXOBLOCK } from 'stubs/block';
export type UTXOBlockQuery = UseQueryResult<
  UTXOBlock,
  ResourceError<{ status: number }>
> & {
  isDegradedData: boolean;
};
interface Params {
  heightOrHash: string;
}
export default function useUTXOBlockQuery({
  heightOrHash,
}: Params): UTXOBlockQuery {
  const [isRefetchEnabled, setRefetchEnabled] = React.useState(false);
  const apiQuery = useApiQuery<'qitmeer_block', { status: number }>(
    'qitmeer_block',
    {
      pathParams: { height_or_hash: heightOrHash },
      queryOptions: {
        enabled: Boolean(heightOrHash),
        placeholderData: UTXOBLOCK,
        refetchOnMount: false,
        retry: (failureCount, error) => {
          if (isRefetchEnabled) {
            return false;
          }
          return retry(failureCount, error);
        },
        refetchInterval: (): number | false => {
          return isRefetchEnabled ? 15 * SECOND : false;
        },
      },
    },
  );
  // const rpcQuery = useQuery<RpcResponseType, unknown, UTXOBlock | null>({
  //   queryKey: ['RPC', 'utxoblock', { heightOrHash }],
  //   queryFn: async () => {
  //     if (!publicClient) {
  //       return null;
  //     }
  //     const blockParams = heightOrHash.startsWith('0x')
  //       ? { blockHash: heightOrHash as `0x${string}` }
  //       : { blockNumber: BigInt(heightOrHash) };
  //     return publicClient.getBlock(blockParams).catch(() => null);
  //   },
  //   select: (block) => {
  //     if (!block) {
  //       return null;
  //     }
  //     return {
  //       height: Number(block.number),
  //       blockorder: Number(block.number),
  //     };
  //   },
  //   placeholderData: GET_BLOCK,
  //   enabled:
  //     publicClient !== undefined &&
  //     (apiQuery.isError || apiQuery.errorUpdateCount > 0),
  //   retry: false,
  //   refetchOnMount: false,
  // });
  React.useEffect(() => {
    if (apiQuery.isPlaceholderData || !publicClient) {
      return;
    }
    if (apiQuery.isError && apiQuery.errorUpdateCount === 1) {
      setRefetchEnabled(true);
    } else if (!apiQuery.isError) {
      setRefetchEnabled(false);
    }
  }, [apiQuery.errorUpdateCount, apiQuery.isError, apiQuery.isPlaceholderData]);
  React.useEffect(() => {
    setRefetchEnabled(false);
  }, []);
  // const isRpcQuery = Boolean(
  //   publicClient &&
  //     (apiQuery.isError || apiQuery.isPlaceholderData) &&
  //     apiQuery.errorUpdateCount > 0 &&
  //     rpcQuery.data
  // );
  const query = apiQuery;
  return {
    ...query,
    isDegradedData: false,
  };
}
