import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopingListsApiContext, IList } from '../../context/ShopingListsContext';
import ShoppingListForm from '../../components/shoppingListForm/ShoppingListForm';
import BreadCrumbs from '../../components/breadcrumbs/Breadcrumbs';

function CreateList() {
  const { createList } = useContext(ShopingListsApiContext);
  const navigate = useNavigate();

  const onSubmit = (values: Partial<IList>) => createList(values).then(() => {
    navigate('/');
  });

  return (
    <div>
      <BreadCrumbs title="Vytvoření nového seznamu" />

      <h2>Vytvoření nového seznamu</h2>
      <ShoppingListForm onSubmit={onSubmit} />
    </div>
  );
}

export default CreateList;
