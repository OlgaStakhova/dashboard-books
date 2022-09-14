import { FC } from "react";
import { Book } from "../types/Book";
import {
    Link, NavLink, useLocation, useResolvedPath, useSearchParams,
  } from 'react-router-dom';
  import cn from 'classnames';

interface Props {
    books: Book[],
    isActiveSort: boolean,
    activateSort: (param: boolean) => void,
    updateSearch: (params: { [key: string]: string[] | string | null }) => void,
    onDeleteBookId: (id: number) => void,
  }

export const BooksTable: FC<Props> = (props) => {
  const { books, updateSearch, activateSort, isActiveSort, onDeleteBookId } = props;
  const [searchParams] = useSearchParams();
  const order = searchParams.get('order') || null;
  const sort = searchParams.get('sort') || null;
  const ISBN = searchParams.get('ISBN') || null;

  const location = useLocation();
  const parentPath = useResolvedPath('../').pathname;
  const isSelected = (book: Book) => book.ISBN === ISBN;

  const headers: [keyof Book, string][] = [
    ['bookTitle', 'Book title'],
    ['authorName', 'Author name'],
    ['category', 'Category'],
    ['ISBN', 'ISBN'],
  ];

  return (
    <table
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
        {headers.map((title) => (
            <th key={title[0]}>
              <span className="is-flex is-flex-wrap-nowrap">
                {title[1]}
                <a
                  href="/"
                  onClick={(event) => {
                    event.preventDefault();
                    const sortByType = title[0];

                    if (sort !== sortByType) {
                      updateSearch({ order: null, sort: `${sortByType}` });
                      activateSort(true);
                    }

                    if (!isActiveSort && !order) {
                      updateSearch({ sort: `${sortByType}` });
                      activateSort(true);
                    }

                    if (isActiveSort && sort === sortByType) {
                      updateSearch({ order: 'desc', sort: `${sortByType}` });
                      activateSort(false);
                    }

                    if (!isActiveSort && sort === sortByType && order) {
                      updateSearch({ order: null, sort: null });
                    }
                  }}
                >
                  <span className="icon">
                    <i className={cn(
                      'fas',
                      { 'fa-sort': !sort || sort !== title[0] },
                      { 'fa-sort-up': (!order && sort === title[0]) },
                      { 'fa-sort-down': (order && sort === title[0]) },
                    )}
                    ></i>
                  </span>
                </a>
              </span>
            </th>
          ))}
          <th>Edit</th>
          <th>DELETE</th>
        </tr>
      </thead>

      <tbody>
      {books.map(book => (

<tr
  data-cy="person"
  className={cn({
    'has-background-warning': isSelected(book),
  })}
  key={book.id}
>
  <td>
    <Link
      to={{
        pathname: `${parentPath}${book.id}`,
        search: location.search,
      }}
    >
      {book.bookTitle}
    </Link>
  </td>

  <td>{book.authorName}</td>
  <td>{book.category}</td>
  <td>{book.ISBN}</td>
  <td>
    <NavLink to={`/add-book?editId=${book.id}`}>
    <button>
      Edit
    </button>
    </NavLink>
  </td>
  <td>
    <button onClick={() => {onDeleteBookId(book.id)}}>
      Delete
    </button>
  </td>
</tr>
))}
      </tbody>
    </table>
  );
};