import { memo } from 'react';
import { IListItem } from '../../context/ListItemsContext';
import ListItem from '../listItem/ListItem';

interface IProps {
  items: IListItem[];
}

function ListItems({ items }: IProps) {
  return (
    <ul>
      {items.map((item) => <li key={item.id}><ListItem item={item} /></li>)}
    </ul>
  );
}

export default memo(ListItems);
