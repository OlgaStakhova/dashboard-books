import { FC } from "react";
import { FormEvent, useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { TextField } from "./TextField";

type Props = {
    onAdd: (book: Book) => void
  };

export const AddAbook: FC<Props> = ({ onAdd }) => {(
    <h1>Form add or edit book</h1>
);

    const [count, setCount] = useState(0);
    const [bookTitle, setBookTitle] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [category, setCategory] = useState('');
    const [ISBN, setISBN] = useState('');
    const [bookCounter, setBookCounter] = useState(0);
  
    const requiredControl = [bookTitle, authorName, category, ISBN].length;
  
    const resetForm = () => {
      setCount(0);
      setBookTitle('');
      setAuthorName('');
      setCategory('');
      setISBN('0');
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
    
        const newBook: Book = {
            bookTitle,
            authorName,
            category,
            ISBN,
        };
    
        onAdd(newBook);
        resetForm();
        setBookCounter(bookCounter + 1);
      };
      return (
      <form
      className="NewBook"
      onSubmit={handelSubmitForm}
      key={bookCounter}
    >
      <h2 className="title">
        Add or edit a book
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
              Add
            </button>
          </div>
        </div>
      </form>
    );
  };