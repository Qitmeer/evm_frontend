import { Box } from '@chakra-ui/react';
import React from 'react';

import type { UTXOTransaction } from 'types/api/qitmeer_tx';

import useLazyRenderedList from 'lib/hooks/useLazyRenderedList';
import * as SocketNewItemsNotice from 'ui/shared/SocketNewItemsNotice';

import QitmeerTxsListItem from './QitmeerTxsListItem';

interface Props {
  showBlockInfo: boolean;
  showSocketInfo?: boolean;
  socketInfoAlert?: string;
  socketInfoNum?: number;
  enableTimeIncrement?: boolean;
  currentAddress?: string;
  isLoading: boolean;
  items: Array<UTXOTransaction>;
}

const QitmeerTxsList = (props: Props) => {
  const { cutRef, renderedItemsNum } = useLazyRenderedList(props.items, !props.isLoading);

  return (
    <Box>
      { props.showSocketInfo && (
        <SocketNewItemsNotice.Mobile
          url={ window.location.href }
          num={ props.socketInfoNum }
          alert={ props.socketInfoAlert }
          isLoading={ props.isLoading }
        />
      ) }
      { props.items.slice(0, renderedItemsNum).map((tx, index) => (
        <QitmeerTxsListItem
          key={ tx.hash + (props.isLoading ? index : '') }
          tx={ tx }
          showBlockInfo={ props.showBlockInfo }
          currentAddress={ props.currentAddress }
          enableTimeIncrement={ props.enableTimeIncrement }
          isLoading={ props.isLoading }
        />
      )) }
      <Box ref={ cutRef } h={ 0 }/>
    </Box>
  );
};

export default React.memo(QitmeerTxsList);
