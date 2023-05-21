import { Routes, Route } from 'react-router-dom';
import IndexPage from './pages/index/Index';
import CommonLayout from './components/CommonLayout';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<CommonLayout />}>
        <Route index element={<IndexPage />} />
      </Route>
    </Routes>
  );
}

export default App;
