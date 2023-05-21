import { useContext } from 'react';
import { ShopingListsContext, IList } from '../../context/ShopingListsContext';
import ShoppingListForm from '../../components/shoppingListForm/ShoppingListForm';

function CreateList() {
  const { createList } = useContext(ShopingListsContext);

  const onSubmit = (values: Partial<IList>) => {
    console.log('onSubmit', values);
    createList(values);
  };

  return (
    <ShoppingListForm onSubmit={onSubmit} />
  );
}

export default CreateList;
