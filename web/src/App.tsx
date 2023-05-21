import { Routes, Route } from 'react-router-dom';
import IndexPage from './pages/index/Index';
import CreateListPage from './pages/createList/CreateList';
import EditListPage from './pages/editList/EditList';
import CommonLayout from './components/CommonLayout';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<CommonLayout />}>
        <Route index element={<IndexPage />} />
        <Route path="/lists/create" element={<CreateListPage />} />
        <Route path="/lists/edit/:id" element={<EditListPage />} />
      </Route>
    </Routes>
  );
}

export default App;
