import { Book, BookCreateData, BookUpdatedData } from '../types/Book';

const API_URL = 'http://localhost:3000/books';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return fetch(API_URL + url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  getById: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};


export async function getBooks(): Promise<Book[]> {
  return client.get('/');
}

export const getByIdBook = (id: number): Promise<Book> => {
  return client.getById(`/${id}`);
};

export const createBook = (newBook: BookCreateData) => {
  return client.post<Book>('/', newBook);
};

export const deleteBook = (id: number) => {
  return client.delete(`/${id}`);
};

export const patchBook = (
  id: number, updateData: BookUpdatedData,
) => {
  return client.patch<Book>(`/${id}`, updateData);
};
