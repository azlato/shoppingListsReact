import { styled } from 'styled-components';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { IList } from '../../context/ShopingListsContext';
import { LinkButton, PureButton } from '../button/Button';

const Container = styled.div`
  display: grid;
  gap: 12px;
  align-items: center;

  margin-bottom: 8px;
  grid-template-columns: 2fr 1fr 1fr;
`;

interface IProps {
  item: IList;
  deleteList(id: string): Promise<unknown>;
}

function ShoppingListRow({ item, deleteList }: IProps) {
  const onDeleteList = () => {
    deleteList(item.id);
  };

  return (
    <Container>
      <div>
        <Link to={`/lists/${item.id}`}>
          {item.name}
        </Link>
      </div>
      <LinkButton to={`/lists/edit/${item.id}`}>Editovat</LinkButton>
      <PureButton className="button" type="button" onClick={onDeleteList}>Smazat</PureButton>
    </Container>
  );
}

export default memo(ShoppingListRow);
