import { deleteAuthor, getAuthorBooks, getSingleAuthor } from './authorData';
import { deleteBook, getSingleBook } from './bookData';

const viewBookDetails = (bookFirebaseKey) =>
  new Promise((resolve, reject) => {
    getSingleBook(bookFirebaseKey)
      .then((bookObject) => {
        if (!bookObject) {
          reject(new Error('Book not found'));
          return;
        }

        if (!bookObject.author_id) {
          resolve({ authorObject: null, ...bookObject });
          return;
        }

        getSingleAuthor(bookObject.author_id)
          .then((authorObject) => {
            resolve({ authorObject: authorObject || null, ...bookObject });
          })
          .catch(() => {
            // If author fetch fails, return book with null author
            resolve({ authorObject: null, ...bookObject });
          });
      })
      .catch((error) => reject(error));
  });

const viewAuthorDetails = (authorFirebaseKey) =>
  new Promise((resolve, reject) => {
    if (!authorFirebaseKey) {
      reject(new Error('Author ID is required'));
      return;
    }

    Promise.all([getSingleAuthor(authorFirebaseKey), getAuthorBooks(authorFirebaseKey)])
      .then(([authorObject, authorBooksArray]) => {
        if (!authorObject) {
          reject(new Error('Author not found'));
          return;
        }

        // Ensure we always have a books array, even if empty
        const books = Array.isArray(authorBooksArray) ? authorBooksArray : [];

        resolve({
          ...authorObject,
          books,
          // Add full name for convenience
          fullName: `${authorObject.first_name} ${authorObject.last_name}`.trim(),
        });
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
