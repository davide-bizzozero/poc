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
      // eslint-disable-next-line no-case-declarations
      const collection = state.collections.find((item) => item.collection_id === action.payload.id);
      return {
        ...state,
        isLoading: false,
        products: action.payload.products,
        totalProducts: action.payload.total,
        currentCollecion: collection,
      };
    case 'products/sortAscending':
      return {
        ...state,
        products: action.payload,
      };
    case 'products/sortDescending':
      return {
        ...state,
        products: action.payload,
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

  const getProducts = useCallback(async function getProducts(id, start = 0, end, sort) {
    if (!Number(id)) return;

    dispatch({ type: 'loading' });

    try {
      const res = await fetch(`${BASE_URL}/collections/${id}/products.json`);
      const data = await res.json();
      const productList = data.products;
      if (sort === 'desc') productList.reverse();
      dispatch({
        type: 'products/loaded',
        payload: { products: productList.slice(start, end), total: productList.length, id: id },
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
