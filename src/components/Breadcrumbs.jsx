import { Link, useLocation } from 'react-router-dom';

export default function Breadcrumbs({ collection, products }) {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  /* const paths = pathnames.reduce(function (sum, name) {
    if (name !== 'collection') {
      sum.push(name);
    }
    return sum;
  }, []);
 */
  const paths = pathnames;

  console.log('paths', paths);

  return (
    <>
      {pathnames.map((item) => (
        <p>{item}</p>
      ))}
    </>
  );
}

{
  /* <nav aria-label="breadcrumbs">
      <ul role="list" style={{ display: 'flex' }}>
        {location.pathname === '/' ? null : (
          <li key="0">
            <Link to="/">Home</Link>
          </li>
        )}
        {paths.map((value, index) => {
          const last = index === paths.length - 1;
          const to = `/${paths.slice(0, index + 1).join('/')}`;
          const aria = last ? { 'aria-current': 'location' } : '';
          return (
            <li key={index} {...aria}>
              {last || value === '' ? (
                <span key={to}>&nbsp;&gt; {value}</span>
              ) : (
                <span key={to}>
                  &nbsp;&gt; <Link to={to}>{value}</Link>
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav> */
}
