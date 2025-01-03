import type { UseQueryResult } from '@tanstack/react-query';
import React from 'react';

import type { UTXOBlockTransactionsResponse } from 'types/api/qitmeer_block';
import type { TransactionsSortingValue } from 'types/api/transaction';
import type { SelectOption } from 'ui/shared/select/types';

import type { ResourceError } from 'lib/api/resources';
import * as cookies from 'lib/cookies';

import sortQitmeerTxs from './sortQitmeerTxs';

export const SORT_OPTIONS: Array<SelectOption<TransactionsSortingValue>> = [
  { label: 'Default', value: undefined },
  { label: 'Value ascending', value: 'value-asc' },
  { label: 'Value descending', value: 'value-desc' },
  { label: 'Fee ascending', value: 'fee-asc' },
  { label: 'Fee descending', value: 'fee-desc' },
  { label: 'Block number ascending', value: 'block_number-asc' },
];

type SortingValue = TransactionsSortingValue | undefined;

type HookResult = UseQueryResult<
  UTXOBlockTransactionsResponse,
  ResourceError<unknown>
> & {
  sorting: SortingValue;
  setSortByValue: (value: SortingValue) => void;
};

export default function useQitmeerTxsSort(
  queryResult: UseQueryResult<
    UTXOBlockTransactionsResponse,
    ResourceError<unknown>
  >,
): HookResult {
  const [ sorting, setSorting ] = React.useState<SortingValue>(
    cookies.get(cookies.NAMES.TXS_SORT) as SortingValue,
  );

  const setSortByValue = React.useCallback((value: SortingValue) => {
    setSorting((prevVal: SortingValue) => {
      let newVal: SortingValue = undefined;
      if (value !== prevVal) {
        newVal = value as SortingValue;
      }
      cookies.set(cookies.NAMES.TXS_SORT, newVal ? newVal : '');
      return newVal;
    });
  }, []);

  return React.useMemo(() => {
    if (queryResult.isError || queryResult.isPending) {
      return { ...queryResult, setSortByValue, sorting };
    }

    return {
      ...queryResult,
      data: {
        ...queryResult.data,
        items: queryResult.data.items.slice().sort(sortQitmeerTxs(sorting)),
      },
      setSortByValue,
      sorting,
    };
  }, [ queryResult, setSortByValue, sorting ]);
}