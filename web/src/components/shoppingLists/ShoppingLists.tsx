import { useContext } from 'react';
import { ShopingListsContext } from '../../context/ShopingListsContext';

function ShopingLists() {
  const { items } = useContext(ShopingListsContext);

  return (
    <div>
      <h2>Nákupní seznamy</h2>
      {items.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}

export default ShopingLists;
