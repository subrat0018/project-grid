import { Routes, Route } from 'react-router-dom';
import { HomeLayout } from './routes/HomeLayout';
import { SharedLayout } from './routes/sharedLayout';
import { ProductsLayout } from './routes/ProductsLayout';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<ProductsLayout />} />
          <Route path="/products" element={<ProductsLayout />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
