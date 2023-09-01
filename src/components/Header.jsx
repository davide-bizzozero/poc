import { useGlobalContext } from '../contexts/productsContext';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { collections, currentCollecion } = useGlobalContext();
  const navigateTo = useNavigate();

  function handleChange(value) {
    navigateTo(`/collection/${value}`);
  }

  return (
    <header className="header">
      {console.log('current', currentCollecion.handle)}
      <h1>
        <a href="/" className="logo">
          <span>POC</span>
          <span>Proof Of Concept</span>
        </a>
      </h1>

      {JSON.stringify(currentCollecion) !== '{}' && (
        <div>
          <label htmlFor="change-category" className="change-category">
            Collection:
          </label>
          <select
            id="change-category"
            name="change-category"
            value={currentCollecion.handle}
            onChange={(e) => handleChange(e.target.value)}
          >
            {collections.map((collection) => (
              <option value={collection.handle} key={collection.collection_id}>
                {collection.title}
              </option>
            ))}
          </select>
        </div>
      )}
    </header>
  );
}
