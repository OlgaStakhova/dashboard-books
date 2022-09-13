import { Book } from '../types/Book';

export const filtredBooks = (
  booksToFilter: Book[],

  order: string | null,
  sort: string | null,
): Book[] => {
  let copy = [...booksToFilter];
  if (sort) {
    copy.sort((a, b) => {
      const aElement = (order === 'desc')
        ? b[sort as keyof Book]
        : a[sort as keyof Book];
      const bElement = (order === 'desc')
        ? a[sort as keyof Book]
        : b[sort as keyof Book];

      if (typeof aElement === 'string' && typeof bElement === 'string') {
        return aElement.localeCompare(bElement);
      }

      if (typeof aElement === 'number' && typeof bElement === 'number') {
        return aElement - bElement;
      }

      return 0;
    });
  }

  return copy;
};