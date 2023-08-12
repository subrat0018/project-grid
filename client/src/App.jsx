import { Routes, Route } from 'react-router-dom';
import { HomeLayout } from './routes/HomeLayout';
import { SharedLayout } from './routes/sharedLayout';

function App() {
  return (
    <div id="App">
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomeLayout />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
