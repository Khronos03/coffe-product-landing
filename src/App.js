import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";

const CoffeeRecipes = lazy(() => import("./pages/CoffeeRecipes"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recetas-cafe" element={<CoffeeRecipes />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
