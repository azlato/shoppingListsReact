import { memo, useContext } from 'react';
import { styled } from 'styled-components';
import { IListItem, ListItemsContext } from '../../context/ListItemsContext';
import { PureButton } from '../button/Button';

const Container = styled.div`
    margin-bottom: 6px;
`;

const StyledItemName = styled.span`
    margin-left: 12px;
`;

interface IProps {
  item: IListItem;
}

function ListItem({ item }: IProps) {
  const { fetchList, deleteListItem } = useContext(ListItemsContext);
  const onRemoveClick = () => deleteListItem(item).then(() => {
    fetchList(item.listId);
  });

  return (
    <Container>
      <PureButton onClick={onRemoveClick}>Smazat</PureButton>
      <StyledItemName>{item.name}</StyledItemName>
    </Container>
  );
}

export default memo(ListItem);
