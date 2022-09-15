import { Navigate, Route, Routes } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import 'bulma/css/bulma.min.css';
import { AddBook } from './components/AddBook';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { BookCreateData, Book, BookUpdatedData } from './types/Book';
import { createBook, deleteBook, getBooks, patchBook } from './service/api';

export const App: FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoad, setIsLoad] = useState(false);
  const [errorLoad, setErroreLoad] = useState(false);

  useEffect(() => {
    setIsLoad(true);
    setErroreLoad(false)
    getBooks()
      .then((res) => {
        setBooks(res);
      })
      .catch(() => setErroreLoad(true))
      .finally(() => setIsLoad(false));
  }, []);

  const handlerDeleteBook = (id: number) => {
    deleteBook(id)
      .then(() => {
        setBooks((prevBooks) => prevBooks.filter(book => book.id !== id));
      })
      .catch((error) => {
        setErroreLoad(true)
      });
  }

  const addBookHandler = (data: BookCreateData) => {
    return createBook(data)
      .then((bookResponse) => {
        bookResponse && setBooks((prevBooks) => ([...prevBooks, bookResponse]));
      })
  };

  const handlerEditBook = (id: number, updatedBook: BookUpdatedData) => {
    return patchBook(id, updatedBook)
      .then((bookUpdatedResponse) => {
        const idx = books.findIndex(book => book.id === id)
        bookUpdatedResponse && setBooks((prevBooks) => {
          prevBooks.splice(idx, 1, bookUpdatedResponse);
          return prevBooks;
        });
      })
  }

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
                  onDeleteBookId={handlerDeleteBook}
                />
              }
            />

            <Route path="dashboard" element={<Navigate to="/" replace />} />

            <Route path="add-book" element={<AddBook onAdd={addBookHandler} onEdit={handlerEditBook} />} />

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