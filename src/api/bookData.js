import { clientCredentials } from '../utils/client';
// API CALLS FOR BOOKS

const endpoint = clientCredentials.databaseURL;

const getBooks = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const filteredBooks = Object.values(data).filter((book) => book.uid === uid);
          resolve(filteredBooks);
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

// DELETE BOOK
const deleteBook = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// GET SINGLE BOOK
const getSingleBook = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// CREATE BOOK
const createBook = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        const firebaseKey = data.name;
        const bookWithKey = { ...payload, firebaseKey };
        return fetch(`${endpoint}/books/${firebaseKey}.json`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookWithKey),
        })
          .then((response) => response.json())
          .then(() => resolve(bookWithKey));
      })
      .catch(reject);
  });

// UPDATE BOOK
const updateBook = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books/${payload.firebaseKey}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

const getBooksByAuthor = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const filteredBooks = Object.values(data).filter((book) => book.author_id === firebaseKey);
          resolve(filteredBooks);
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

const booksOnSale = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/books.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const filteredBooks = Object.values(data).filter((book) => book.uid === uid && book.sale);
          resolve(filteredBooks);
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

export { booksOnSale, createBook, deleteBook, getBooks, getBooksByAuthor, getSingleBook, updateBook };
