// Cart utility functions

// Initialize cart in localStorage if it doesn't exist
export const initializeCart = () => {
  if (typeof window === 'undefined') return;

  const cart = localStorage.getItem('cart');
  if (!cart) {
    localStorage.setItem('cart', JSON.stringify({ items: {}, total: '0.00' }));
  }
};

// Get cart from localStorage
export const getCart = () => {
  if (typeof window === 'undefined') return { items: {}, total: '0.00' };

  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : { items: {}, total: '0.00' };
};

// Add item to cart
export const addToCart = (book) => {
  const cart = getCart();

  // Add item if not already in cart
  if (!cart.items[book.firebaseKey]) {
    cart.items[book.firebaseKey] = {
      firebaseKey: book.firebaseKey,
      title: book.title,
      price: book.price,
      sale: book.sale,
      image: book.image,
    };

    // Recalculate total
    cart.total = Object.values(cart.items)
      .reduce((sum, item) => {
        const price = parseFloat(item.price);
        return sum + (item.sale ? price * 0.9 : price); // 10% discount for items on sale
      }, 0)
      .toFixed(2);

    localStorage.setItem('cart', JSON.stringify(cart));
  }

  return cart;
};

// Remove item from cart
export const removeFromCart = (bookId) => {
  const cart = getCart();

  if (cart.items[bookId]) {
    delete cart.items[bookId];

    // Recalculate total
    cart.total = Object.values(cart.items)
      .reduce((sum, item) => {
        const price = parseFloat(item.price);
        return sum + (item.sale ? price * 0.9 : price);
      }, 0)
      .toFixed(2);

    localStorage.setItem('cart', JSON.stringify(cart));
  }

  return cart;
};

// Clear cart
export const clearCart = () => {
  const emptyCart = { items: {}, total: '0.00' };

  if (typeof window === 'undefined') {
    return emptyCart;
  }

  localStorage.setItem('cart', JSON.stringify(emptyCart));
  return emptyCart;
};

// Get cart item count
export const getCartItemCount = () => {
  const cart = getCart();
  return Object.keys(cart.items).length;
};

// Update cart prices based on current book data
export const updateCartPrices = (books) => {
  const cart = getCart();
  let updated = false;

  const updatedItems = Object.fromEntries(
    Object.entries(cart.items).map(([key, item]) => {
      const book = books.find((b) => b.firebaseKey === item.firebaseKey);
      if (book && (book.price !== item.price || book.sale !== item.sale)) {
        updated = true;
        return [key, { ...item, price: book.price, sale: book.sale }];
      }
      return [key, item];
    }),
  );

  if (updated) {
    const updatedCart = {
      items: updatedItems,
      total: Object.values(updatedItems)
        .reduce((sum, item) => {
          const price = parseFloat(item.price);
          return sum + (item.sale ? price * 0.9 : price);
        }, 0)
        .toFixed(2),
    };
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return updatedCart;
  }

  return cart;
};
