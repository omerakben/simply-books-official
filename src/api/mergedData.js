import { deleteAuthor, getAuthorBooks, getSingleAuthor } from './authorData';
import { deleteBook, getSingleBook } from './bookData';

const viewBookDetails = (bookFirebaseKey) =>
  new Promise((resolve, reject) => {
    getSingleBook(bookFirebaseKey)
      .then((bookObject) => {
        getSingleAuthor(bookObject.author_id).then((authorObject) => {
          resolve({ authorObject, ...bookObject });
        });
      })
      .catch((error) => reject(error));
  });

const viewAuthorDetails = (authorFirebaseKey) =>
  new Promise((resolve, reject) => {
    Promise.all([getSingleAuthor(authorFirebaseKey), getAuthorBooks(authorFirebaseKey)])
      .then(([authorObject, authorBooksArray]) => {
        resolve({ ...authorObject, books: authorBooksArray });
      })
      .catch((error) => reject(error));
  });

const deleteAuthorBooks = (authorId) =>
  new Promise((resolve, reject) => {
    getAuthorBooks(authorId)
      .then((booksArray) => {
        console.warn(booksArray, 'Author Books');
        const deleteBookPromises = booksArray.map((book) => deleteBook(book.firebaseKey));

        Promise.all(deleteBookPromises).then(() => {
          deleteAuthor(authorId).then(resolve);
        });
      })
      .catch((error) => reject(error));
  });

export { deleteAuthorBooks, viewAuthorDetails, viewBookDetails };
