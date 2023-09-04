import { createContext, useEffect, useContext, useReducer, useCallback } from 'react';

const BASE_URL = import.meta.env.VITE_API_URL;
const AppContext = createContext();

const initialState = {
  collections: [],
  currentCollecion: {},
  products: [],
  totalProducts: 0,
  productDetail: {},
  isLoading: false,
  error: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'collections/loaded':
      return {
        ...state,
        isLoading: false,
        collections: action.payload,
      };
    case 'products/loaded':
      /* eslint-disable no-case-declarations */
      const collection = state.collections.find((item) => item.collection_id === action.payload.collectionId);
      const productList = action.payload.products.sort((a, b) => a.title.localeCompare(b.title));
      const total = productList.length;
      const start = action.payload.start;
      const end = action.payload.end;

      if (action.payload.order === 'asc') productList.reverse();

      return {
        ...state,
        isLoading: false,
        products: productList.slice(start, end),
        totalProducts: total,
        currentCollecion: collection,
      };
    case 'productDetail/loaded':
      return {
        ...state,
        isLoading: false,
        productDetail: action.payload,
        currentCollecion: {},
      };
    default:
      throw new Error('Unknown action type');
  }
}

function AppProvider({ children }) {
  const [{ collections, currentCollecion, products, totalProducts, productDetail, isLoading, error }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(function () {
    async function fetchCollections() {
      dispatch({ type: 'loading' });

      try {
        const res = await fetch(`${BASE_URL}/collection_listings.json`);
        const data = await res.json();
        dispatch({ type: 'collections/loaded', payload: data.collection_listings });
      } catch {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading collections...',
        });
      }
    }
    fetchCollections();
  }, []);

  const getProducts = useCallback(async function getProducts(collectionId, start = 0, end, order) {
    if (!Number(collectionId)) return;

    dispatch({ type: 'loading' });

    try {
      const res = await fetch(`${BASE_URL}/collections/${collectionId}/products.json`);
      const data = await res.json();

      dispatch({
        type: 'products/loaded',
        payload: { products: data.products, start: start, end: end, collectionId: collectionId, order: order },
      });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error loading the products...',
      });
    }
  }, []);

  const getProductDetail = useCallback(async function getProducts(id) {
    if (!Number(id)) return;

    dispatch({ type: 'loading' });

    try {
      const res = await fetch(`${BASE_URL}/products/${id}.json`);
      const data = await res.json();
      dispatch({
        type: 'productDetail/loaded',
        payload: data.product,
      });
    } catch {
      dispatch({
        type: 'rejected',
        payload: 'There was an error loading the product detail...',
      });
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        collections,
        currentCollecion,
        getProducts,
        products,
        totalProducts,
        getProductDetail,
        productDetail,
        isLoading,
        error,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

function useGlobalContext() {
  const context = useContext(AppContext);
  if (context === undefined) throw new Error('GlobalContext was used outside of the AppProvider');
  return context;
}

export { AppProvider, useGlobalContext };
