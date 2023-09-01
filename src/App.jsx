import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import Homepage from './pages/Homepage';

//import Listingpage from './pages/Listingpage';
import PageNotFound from './pages/PageNotFound';
//import PassengersList from './components/PassengersList';
import SpinnerFullPage from './components/SpinnerFullPage';
import Header from './components/Header';

const Homepage = lazy(() => import('./pages/Homepage'));
const Listing = lazy(() => import('./pages/Listing'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="/collection/:handle" element={<Listing />} />
              <Route path="/collection/:handle/products/:handle/:id" element={<ProductDetail />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </main>
      </BrowserRouter>
    </>
  );
}
