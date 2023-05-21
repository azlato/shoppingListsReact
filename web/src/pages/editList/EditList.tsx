import { useContext, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopingListsContext, IList } from '../../context/ShopingListsContext';
import ShoppingListForm from '../../components/shoppingListForm/ShoppingListForm';
import BreadCrumbs from '../../components/breadcrumbs/Breadcrumbs';

function EditList() {
  const { id } = useParams();
  const { items, updateList } = useContext(ShopingListsContext);
  const navigate = useNavigate();

  const listItem = useMemo(() => (
    items.find((item) => item.id === id)
  ), [id, items]);

  const onSubmit = (values: Partial<IList>) => {
    if (id && values.name) {
      updateList({ ...values, id } as IList).then(() => {
        navigate('/');
      });
    }
  };

  return (
    <div>
      <BreadCrumbs title={listItem ? `Úprava "${listItem.name}"` : 'Úprava'} />

      <h2>Úprava seznamu</h2>
      {listItem
        ? <ShoppingListForm isEditMode initialValues={listItem} onSubmit={onSubmit} />
        : 'Seznam nenalezen'}
    </div>
  );
}

export default EditList;
