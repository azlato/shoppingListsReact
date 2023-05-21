import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopingListsContext, IList } from '../../context/ShopingListsContext';
import ShoppingListForm from '../../components/shoppingListForm/ShoppingListForm';

function CreateList() {
  const { createList } = useContext(ShopingListsContext);
  const navigate = useNavigate();

  const onSubmit = (values: Partial<IList>) => {
    createList(values).then(() => {
      navigate('/');
    });
  };

  return (
    <div>
      <h2>Vytvoření nového seznamu</h2>
      <ShoppingListForm onSubmit={onSubmit} />
    </div>
  );
}

export default CreateList;
