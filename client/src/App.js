import { Link, Route, Routes } from 'react-router-dom';
import { AllAuthors } from './views/AllAuthors';
import { OneAuthor } from './views/OneAuthor';
import { EditAuthor } from './views/EditAuthor';
import { NewAuthor } from './views/NewAuthor';


import "./App.css";

function App() {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top justify-content-between mb-4 px-4 rounded border">
        <h1 className="navbar-brand mb-0 fs-1">Authors</h1>
        <div className="navbar-nav">
          <Link to="/author/new" className="btn btn-success mx-1">
            Add an author
          </Link>
          <Link to="/" className="btn btn-primary mx-1">
            Home
          </Link>
        </div>
      </nav>




      <Routes>
        <Route path="/" element={<AllAuthors/>}/>
        <Route path="/author/new" element={<NewAuthor/>}/>
        <Route path="/author/:id" element={<OneAuthor/>}/>
        <Route path="/author/:id/edit" element={<EditAuthor/>}/>
      </Routes>
    </div>
  );
}

export default App;
