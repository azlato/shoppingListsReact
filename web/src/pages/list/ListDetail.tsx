import {
  useContext, useMemo, useCallback, useEffect,
} from 'react';
import { useParams } from 'react-router-dom';
import { ShopingListsContext, IList } from '../../context/ShopingListsContext';
import { ListItemsContext, IListItem } from '../../context/ListItemsContext';
import ListItemsForm from '../../components/listItemsForm/ListItemsForm';
import BreadCrumbs from '../../components/breadcrumbs/Breadcrumbs';
import ListItems from '../../components/listItems/ListItems';

function ListDetail() {
  const { id } = useParams();
  const { items } = useContext(ShopingListsContext);
  const { createListItem, listItems, fetchList } = useContext(ListItemsContext);

  useEffect(() => {
    if (id) {
      fetchList(id);
    }
  }, [id, fetchList]);

  const listItem = useMemo(() => (
    items.find((item) => item.id === id)
  ), [id, items]);

  const onSubmit = useCallback((values: Partial<IList>) => {
    if (id && values.name) {
      return createListItem({ ...values, listId: id } as IListItem).then(() => {
        fetchList(id);
      });
    }

    return Promise.reject(new Error('Unknown list'));
  }, [id, fetchList, createListItem]);

  return (
    <div>
      <BreadCrumbs title={listItem ? `Položky seznamu "${listItem.name}"` : 'Položky seznamu'} />

      <h2>Položky seznamu</h2>
      {listItem
        ? <ListItemsForm onSubmit={onSubmit} />
        : 'Seznam nenalezen'}
      <ListItems items={listItems} />
    </div>
  );
}

export default ListDetail;
