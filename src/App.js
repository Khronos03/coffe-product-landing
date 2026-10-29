import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import ConsentBanner from "./components/ConsentBanner";

const CoffeeRecipes = lazy(() => import("./pages/CoffeeRecipes"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Privacy = lazy(() => import("./pages/Privacy"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recetas-cafe" element={<CoffeeRecipes />} />
          <Route path="/privacidad" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <ConsentBanner />
    </BrowserRouter>
  );
}

export default App;
