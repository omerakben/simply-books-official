import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAuthors = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const filteredAuthors = Object.values(data).filter((author) => author.uid === uid);
          resolve(filteredAuthors);
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

const createAuthor = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        const firebaseKey = data.name;
        const authorWithKey = { ...payload, firebaseKey };
        return fetch(`${endpoint}/authors/${firebaseKey}.json`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(authorWithKey),
        })
          .then((response) => response.json())
          .then(() => resolve(authorWithKey));
      })
      .catch(reject);
  });

const getSingleAuthor = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors/${firebaseKey}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const deleteAuthor = (firebaseKey) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors/${firebaseKey}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const updateAuthor = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors/${payload.firebaseKey}.json`, {
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

const getAuthorBooks = (authorId) =>
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
          const books = Object.values(data).filter((book) => book.author_id === authorId);
          resolve(books);
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

const getFavoriteAuthors = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/authors.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const favorites = Object.values(data).filter((item) => item.favorite);
        resolve(favorites);
      })
      .catch(reject);
  });

export { createAuthor, deleteAuthor, getAuthorBooks, getAuthors, getFavoriteAuthors, getSingleAuthor, updateAuthor };
