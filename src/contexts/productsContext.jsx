import React, { useState, useContext, useEffect } from 'react';

const BASE_URL = import.meta.env.VITE_API_URL;
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [collections, setCollections] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchCollectionListing = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/collection_listings.json`);
      const data = await res.json();
      setCollections(data.collection_listings || []);
    } catch (err) {
      console.error(err.response);
    }
    setLoading(false);
  };

  const fetchProducts = async (collectionId, start = 0, end) => {
    if (!collectionId) return;
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/collections/${collectionId}/products.json`);
      const data = await res.json();
      setTotalProducts(data.products.length - 1);
      setProducts(data.products.slice(start, end) || []);
    } catch (err) {
      console.error(err.response);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCollectionListing();
  }, []);

  return (
    <AppContext.Provider
      value={{
        loading,
        collections,
        products,
        totalProducts,
        fetchProducts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

function useGlobalContext() {
  const context = useContext(AppContext);
  if (context === undefined) throw new Error('GlobalContext was used outside of the AppProvider');
  return context;
}

export { AppProvider, useGlobalContext };
