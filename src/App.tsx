import { Navigate, Route, Routes } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import 'bulma/css/bulma.min.css';
import { AddAbook } from './components/AddAbook';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { Book } from './types/Book';
import { getBooks } from './api';

export const App: FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoad, setIsLoad] = useState(false);
  const [errorLoad, setErroreLoad] = useState(false);

  useEffect(() => {
    setIsLoad(true);
    getBooks()
      .then((res) => {
        setBooks(res);
      })
      .catch(() => setErroreLoad(true))
      .finally(() => setIsLoad(false));
  }, []);

  const addBookHandler = (book: Book) => {
    setBooks((prevBooks) => ([...prevBooks, book]));
  };

  return (
    <div data-cy="app">
      <Navbar />

      <div className="section">
        <div className="container">
        <Routes>
            <Route
              path="/"
              element={
              < Dashboard
                 books={books} 
                 isLoad={isLoad}
                 errorLoad={errorLoad}
               />
              }
            />

            <Route path="dashboard" element={<Navigate to="/" replace />} />

            <Route path="addAbook">
              <Route
                index
                element={<AddAbook onAdd={addBookHandler}  />}
              />

              <Route
                path=":slug"
                element={<AddAbook onAdd={addBookHandler}  />}
              />
            </Route>

            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </div>
    </div>
 );
};