import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import Homepage from './pages/Homepage';

//import Listingpage from './pages/Listingpage';
import PageNotFound from './pages/PageNotFound';
//import PassengersList from './components/PassengersList';
import SpinnerFullPage from './components/SpinnerFullPage';
import Header from './components/Header';

const Homepage = lazy(() => import('./pages/Homepage'));
const Listingpage = lazy(() => import('./pages/Listingpage'));

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="/collection/:handle" element={<Listingpage />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </main>
      </BrowserRouter>
    </>
  );
}
