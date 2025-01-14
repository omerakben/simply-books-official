'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button, Card, Container, ListGroup } from 'react-bootstrap';
import { clearCart, getCart, removeFromCart } from '../../utils/cart';

export default function CartPage() {
  const [cart, setCart] = useState({ items: {}, total: '0.00' });
  const router = useRouter();

  useEffect(() => {
    setCart(getCart());

    const handleStorageChange = (e) => {
      if (e.key === 'cart') {
        setCart(getCart());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleRemoveItem = (bookId) => {
    const updatedCart = removeFromCart(bookId);
    setCart(updatedCart);
  };

  const handleCheckout = () => {
    if (window.confirm('Would you like to proceed with checkout?')) {
      clearCart();
      setCart({ items: {}, total: '0.00' });
      alert('Thank you for your purchase!');
      router.push('/');
    }
  };

  return (
    <Container className="py-5">
      <Card className="border-0 shadow-sm rounded-4">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h2 mb-0">Shopping Cart</h1>
          </div>

          {Object.keys(cart.items).length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted mb-3">Your cart is empty</p>
              <Button variant="primary" onClick={() => router.push('/books')}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <ListGroup variant="flush">
                {Object.values(cart.items).map((item) => (
                  <ListGroup.Item key={item.firebaseKey} className="py-3">
                    <div className="d-flex align-items-center">
                      <Image src={item.image || '/images/book-placeholder.svg'} alt={item.title} width={80} height={120} className="rounded me-3" style={{ objectFit: 'cover' }} />
                      <div className="flex-grow-1">
                        <h5 className="mb-1">{item.title}</h5>
                        <p className="mb-1 text-success">
                          ${item.sale ? (parseFloat(item.price) * 0.9).toFixed(2) : item.price} {item.sale && <span className="badge bg-danger ms-2">On Sale</span>}
                        </p>
                      </div>
                      <Button variant="outline-danger" size="sm" onClick={() => handleRemoveItem(item.firebaseKey)}>
                        Remove
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <div className="d-flex justify-content-between align-items-center mt-4">
                <h4 className="mb-0">Total: ${cart.total}</h4>
                <div className="d-flex gap-2">
                  <Button variant="outline-primary" onClick={() => router.push('/books')}>
                    Continue Shopping
                  </Button>
                  <Button variant="success" onClick={handleCheckout}>
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
