import { useContext } from 'react';
import { styled } from 'styled-components';
import { ShopingListsDataContext, ShopingListsApiContext } from '../../context/ShopingListsContext';
import ShoppingListRow from '../shoppingListRow/ShoppingListRow';
import { LinkButton } from '../button/Button';
import styleVariables from '../../styleVariables';

const HeaderContainer = styled.div`
  margin-bottom: 24px;
  border-bottom: 1px solid ${styleVariables.colors.gray300};
  padding-bottom: 24px;
`;

function ShopingLists() {
  const { items } = useContext(ShopingListsDataContext);
  const { deleteList } = useContext(ShopingListsApiContext);

  return (
    <div>
      <HeaderContainer>
        <h2>Nákupní seznamy</h2>
        <LinkButton to="/lists/create">Vytvořit nový seznam</LinkButton>
      </HeaderContainer>
      {items.map((item) => (
        <ShoppingListRow key={item.id} item={item} deleteList={deleteList} />
      ))}
    </div>
  );
}

export default ShopingLists;
