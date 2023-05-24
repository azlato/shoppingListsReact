import {
  memo, useContext, useState, useCallback,
} from 'react';
import { styled } from 'styled-components';
import { IListItem, ListItemsApiContext, ListItemsDataContext } from '../../context/ListItemsContext';
import { PureButton } from '../button/Button';

const Container = styled.div`
    display: grid;
    margin-bottom: 6px;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 16px;
    align-items: center;
`;

const StyledItemName = styled.span`
    margin-left: 12px;
`;

interface IProps {
  item: IListItem;
}

function ListItem({ item }: IProps) {
  const [itemNameField, setItemNameField] = useState(item.name);
  const [isEditing, setIsEditing] = useState(false);

  const { fetchList } = useContext(ListItemsDataContext);
  const { deleteListItem, editListItem } = useContext(ListItemsApiContext);
  const onRemoveClick = () => deleteListItem(item).then(() => {
    fetchList(item.listId);
  });

  const onChangeNameField = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    setItemNameField(newValue);
  }, [setItemNameField]);

  const onSaveItemNameField = useCallback(() => {
    if (item.name === itemNameField || !itemNameField) {
      setIsEditing(false);
      return;
    }

    editListItem({ ...item, name: itemNameField }).then(() => {
      fetchList(item.listId);
      setIsEditing(false);
    });
  }, [item, itemNameField, editListItem, fetchList]);

  return (
    <Container>
      {isEditing
        ? <input type="text" value={itemNameField} onChange={onChangeNameField} />
        : <StyledItemName>{item.name}</StyledItemName>}
      <PureButton onClick={onRemoveClick}>Smazat</PureButton>
      {isEditing
        ? <PureButton onClick={onSaveItemNameField}>Uložit</PureButton>
        : <PureButton onClick={() => setIsEditing(true)}>Upravit</PureButton>}
    </Container>
  );
}

export default memo(ListItem);
