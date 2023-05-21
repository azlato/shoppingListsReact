import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopingListsContext } from '../../context/ShopingListsContext';

function ShopingLists() {
  const { items } = useContext(ShopingListsContext);

  return (
    <div>
      <h2>Nákupní seznamy</h2>
      <Link to="/lists/create">Vytvořit</Link>
      {items.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}

export default ShopingLists;
