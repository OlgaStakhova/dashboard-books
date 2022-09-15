import { FC, useMemo } from "react";
import { FormEvent, useEffect, useState } from 'react';
import { Book, BookCreateData, BookUpdatedData } from '../types/Book';
import { TextField } from "./TextField";
import { NavLink, useSearchParams } from 'react-router-dom';
import { getByIdBook } from "../service/api";

type Props = {
  onAdd: (book: BookCreateData) => Promise<void>,
  onEdit: (id: number, book: BookUpdatedData) => Promise<void>,
};

export const AddBook: FC<Props> = ({ onAdd, onEdit }) => {

  const [count, setCount] = useState(0);
  const [bookTitle, setBookTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [category, setCategory] = useState('');
  const [ISBN, setISBN] = useState('');
  const [bookCounter, setBookCounter] = useState(0);
  const [successAdd, setSuccessAdd] = useState(false);
  const [errorAction, setErrorAction] = useState(false);
  const [searchParams] = useSearchParams();

  const editId = searchParams.get('editId') || null;

  const requiredControl = [bookTitle, authorName, category, ISBN].length;

  useMemo(() => {
    const editBookId = editId && Number(editId);
    if (editBookId) {
      getByIdBook(editBookId)
        .then((updatedBook: Book) => {
          setBookTitle(updatedBook.bookTitle);
          setAuthorName(updatedBook.authorName);
          setCategory(updatedBook.category);
          setISBN(updatedBook.ISBN);
        })
    }
  }, [editId])

  const resetForm = () => {
    setCount(0);
    setBookTitle('');
    setAuthorName('');
    setCategory('');
    setISBN('');
  };

  useEffect(() => {
    const fieldController = {
      bookTitle: { value: bookTitle, required: true },
      authorName: { value: authorName, required: true },
      category: { value: category, required: true },
      ISBN: { value: ISBN, required: true },
    };

    setCount(Object.values(fieldController).filter(item => {
      return item.value && item.required;
    }).length);
  }, [bookTitle,
    authorName,
    category,
    ISBN,]);

  const handlerInput = (name: string, value: string) => {
    switch (name) {
      case 'bookTitle':
        setBookTitle(value);
        break;
      case 'authorName':
        setAuthorName(value);
        break;
      case 'category':
        setCategory(value);
        break;
      case 'ISBN':
        setISBN(value);
        break;
      default:
        break;
    }
  };

  const handelSubmitForm = (event: FormEvent) => {
    event.preventDefault();
    const newBook: BookCreateData = {
      bookTitle,
      authorName,
      category,
      ISBN,
    };
    if (!editId) {
      onAdd(newBook)
        .then(() => {
          setSuccessAdd(true);
          setTimeout(() => {
            setSuccessAdd(false)
          }, 2000);
          resetForm();
        })
        .catch((error) => {
          setErrorAction(true)
        });
      setBookCounter(bookCounter + 1);
    } else {
      onEdit(Number(editId), newBook)
        .then(() => {
          setSuccessAdd(true);
          setTimeout(() => {
            setSuccessAdd(false)
          }, 2000);
          resetForm();
        })
        .catch((error) => {
          setErrorAction(true)
        });
    }
  };

  return (
    <>
      <form
        className="NewBook"
        onSubmit={handelSubmitForm}
        key={bookCounter}
      >
        <h2 className="title">
          {`${editId ? "Edit" : "Add"} a book`}
        </h2>

        <TextField
          name="bookTitle"
          label="Book title"
          value={bookTitle}
          onChange={handlerInput}
          count={count}
          required
        />

        <TextField
          name="authorName"
          label="Author name"
          value={authorName}
          onChange={handlerInput}
          count={count}
        />

        <TextField
          name="category"
          label="Category"
          value={category}
          onChange={handlerInput}
          count={count}
          required
        />

        <TextField
          name="ISBN"
          label="ISBN"
          value={ISBN + ""}
          onChange={handlerInput}
          count={count}
          required
        />

        <div className="field is-grouped">
          <div className="control">
            <button
              type="submit"
              data-cy="submit-button"
              className="button is-link"
              disabled={count < requiredControl}
            >
              {editId ? "Edit" : "Add"}
            </button>
          </div>
        </div>
      </form>
      {!editId && successAdd && <div className="notification is-success is-light">
        <button className="delete" onClick={() => setSuccessAdd(false)}></button>
        The book has been <strong>added successfully</strong>.
        You can add the next one or go to <NavLink to="/">Dashboard</NavLink>.
      </div>}
      {editId && successAdd && <div className="notification is-success is-light">
        <button className="delete" onClick={() => setSuccessAdd(false)}></button>
        The book has been <strong>edit successfully</strong>.
        You can go on <NavLink to="/">Dashboard</NavLink>.
      </div>}
      {errorAction && <div className="notification is-warning is-light">
        <button className="delete" onClick={() => setErrorAction(false)}></button>
        <strong>Something went wrong</strong>.
        try again!
      </div>}
    </>
  );
};
