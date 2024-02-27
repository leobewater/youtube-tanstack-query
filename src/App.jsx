import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <div className="text-white text-left">
        <h1 className="text-white text-3xl font-bold mb-6">Tanstack Query:</h1>
        <ul>
          <li>
            <Link to={`/withoutquery`}>Without Query</Link>
          </li>
          <li>
            <Link to={`/withquery`}>With Query</Link>
          </li>
          <li>
            <Link to={`/withquerypagination`}>With Query Pagination</Link>
          </li>
          <li>
            <Link to={`/withinfinitequery`}>With Infinite Query</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default App;
