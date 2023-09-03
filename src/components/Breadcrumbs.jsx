export default function Breadcrumbs({ children }) {
  return (
    <nav aria-label="breadcrumbs" className="breadcrumbs">
      <ul role="list" className="breadcrumbs-items">
        <li>
          <a href="/">Home</a>
        </li>
        {children}
      </ul>
    </nav>
  );
}
