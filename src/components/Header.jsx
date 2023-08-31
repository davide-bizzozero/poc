import { useEffect, useState } from 'react';
import { useGlobalContext } from '../contexts/productsContext';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
  const { collections } = useGlobalContext();
  const navigateTo = useNavigate();
  const location = useLocation();

  const [curentCategory, setCurrenCategory] = useState('');

  useEffect(
    function () {
      const locationPath = location.pathname;
      const cat = locationPath.slice(locationPath.lastIndexOf('/') + 1, locationPath.length);
      setCurrenCategory(cat);
    },
    [location],
  );

  function handleChange(value) {
    navigateTo(`/collection/${value}`);
  }

  return (
    <header className="header">
      <h1>
        <a href="/" class="logo">
          <span>POC</span>
          <span>Proof Of Concept</span>
        </a>
      </h1>
      <select value={curentCategory} onChange={(e) => handleChange(e.target.value)}>
        <option value=""> Change category </option>
        {collections.map((collection) => (
          <option value={collection.handle} key={collection.collection_id}>
            {collection.title}
          </option>
        ))}
      </select>
    </header>
  );
}
