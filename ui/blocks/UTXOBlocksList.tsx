import { Box } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import React from 'react';

import type { UTXOBlock } from 'types/api/utxoblock';

import UTXOBlocksListItem from 'ui/blocks/UTXOBlocksListItem';

interface Props {
  data: Array<UTXOBlock>;
  isLoading: boolean;
  page: number;
}

const UTXOBlocksList = ({ data, isLoading, page }: Props) => {
  return (
    <Box>
      <AnimatePresence initial={ false }>
        { data.map((item, index) => (
          <UTXOBlocksListItem
            key={ item.BlockOrder + (isLoading ? String(index) : '') }
            data={ item }
            isLoading={ isLoading }
            enableTimeIncrement={ page === 1 && !isLoading }
          />
        )) }
      </AnimatePresence>
    </Box>
  );
};

export default UTXOBlocksList;
