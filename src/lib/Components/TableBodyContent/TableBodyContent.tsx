import React from 'react';

import NoDataRow from '../NoDataRow/NoDataRow';
import { ITableBodyProps } from '../TableBody/TableBody';
import VirtualizedRows from '../VirtualizedRows/VirtualizedRows';

const TableBodyContent: React.FunctionComponent<ITableBodyProps> = (props) => {
  const {
    data,
  } = props;

  if (!data.length) {
    return <NoDataRow {...props}/>;
  }
  return (
      <VirtualizedRows
        {...props}
      />
  );
};

export default TableBodyContent;
