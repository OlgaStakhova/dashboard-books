import {
    FC, useCallback, useState,
  } from 'react';
  import { useSearchParams } from 'react-router-dom';
  import { Loader } from './Loader';
  import { BooksTable } from './BooksTable';
  import { Book } from '../types/Book';
  import { filtredBooks } from '../utils/filterHelper';

  interface Props {
    books: Book[], 
    isLoad: boolean,
    errorLoad: boolean,
    onDeleteBookId: (id: number) => void,
  }
  
  export const Dashboard: FC<Props> = (props) => {
    const {books, isLoad, errorLoad, onDeleteBookId } = props
    const [searchParams, setSearchParams] = useSearchParams();
    const [isActiveSort, setIsActiveSort] = useState(false);
  
    const order = searchParams.get('order') || null;
    const sort = searchParams.get('sort') || null;

  
    const activateSort = (param: boolean) => setIsActiveSort(param);
  
    const updateSearch = useCallback((
      params: { [key: string]: string[] | string | null },
    ) => {
      Object.entries(params).forEach(([key, value]) => {
        if (!value) {
          searchParams.delete(key);
        } else if (Array.isArray(value)) {
          searchParams.delete(key);
  
          value.forEach(part => {
            searchParams.append(key, part);
          });
        } else {
          searchParams.set(key, value);
        }
      });
      setSearchParams(searchParams);
    }, [searchParams, setSearchParams]);
  
    const preparedBooks = filtredBooks(
      books, order, sort,
    );
    return (
        <>
          <h1 className="title">Dashboard books</h1>
    
          <div className="block">
            <div className="columns is-desktop is-flex-direction-row-reverse">
          <div className="column">
            <div className="box table-container">
            {isLoad && <Loader />}

            {errorLoad && !isLoad && (
                <p className="has-text-danger">
                  Something went wrong
                </p>
            )}

            {books && !isLoad && books.length === 0 && (
                <p>
                  There are no books on the server
                </p>
            )}

            {(!isLoad) && (
                <BooksTable
                  books={preparedBooks}
                  isActiveSort={isActiveSort}
                  updateSearch={updateSearch}
                  activateSort={activateSort}
                  onDeleteBookId={onDeleteBookId}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};