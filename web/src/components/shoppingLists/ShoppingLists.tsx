import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopingListsContext } from '../../context/ShopingListsContext';

function ShopingLists() {
  const { items } = useContext(ShopingListsContext);

  return (
    <div>
      <h2>Nákupní seznamy</h2>
      <Link to="/lists/create">Vytvořit nový seznam</Link>
      <hr />
      {items.map((item) => (
        <div key={item.id}>
          <Link to={`/lists/${item.id}`}>
            {item.name}
          </Link>
          {' '}
          <Link to={`/lists/edit/${item.id}`}>Editovat</Link>
        </div>
      ))}
    </div>
  );
}

export default ShopingLists;
