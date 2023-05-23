import { memo } from 'react';
import { IListItem } from '../../context/ListItemsContext';

interface IProps {
  item: IListItem;
}

function ListItem({ item }: IProps) {
  return (
    <div>{item.name}</div>
  );
}

export default memo(ListItem);
