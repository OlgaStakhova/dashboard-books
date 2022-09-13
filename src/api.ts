import { Book } from './types/Book';
// eslint-disable-next-line max-len
const API_URL = ' http://localhost:3000/posts/';
function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getBooks(): Promise<Book[]> {
  return wait(500)
    .then(() => fetch(API_URL))
    .then(response => response.json());
}