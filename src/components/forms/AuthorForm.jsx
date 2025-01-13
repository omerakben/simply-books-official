'use client';

import { createAuthor, updateAuthor } from '@/api/authorData';
import { useAuth } from '@/utils/context/authContext';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';

const initialState = {
  first_name: '',
  last_name: '',
  email: '',
  image: '',
  favorite: false,
};

function AuthorForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj && obj.firebaseKey) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj && obj.firebaseKey) {
      updateAuthor(formInput).then(() => router.push('/authors'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createAuthor(payload).then(() => {
        router.push('/authors');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-color-primary">
      <h2 className="mt-5 text-center">{obj && obj.firebaseKey ? 'Update' : 'Create'} Author</h2>

      {/* FIRST NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="First Name" className="mb-4">
        <Form.Control type="text" placeholder="Enter first name" name="first_name" value={formInput.first_name} onChange={handleChange} required />
      </FloatingLabel>

      {/* LAST NAME INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Last Name" className="mb-4">
        <Form.Control type="text" placeholder="Enter last name" name="last_name" value={formInput.last_name} onChange={handleChange} required />
      </FloatingLabel>

      {/* EMAIL INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Email" className="mb-4">
        <Form.Control type="email" placeholder="Enter email" name="email" value={formInput.email} onChange={handleChange} required />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput4" label="Image URL (optional)" className="mb-4">
        <Form.Control type="url" placeholder="Enter image URL" name="image" value={formInput.image} onChange={handleChange} />
        <Form.Text className="text-muted">Leave empty to use default avatar</Form.Text>
      </FloatingLabel>

      {/* FAVORITE CHECKBOX  */}
      <Form.Check
        className="mb-3"
        type="switch"
        id="favorite"
        name="favorite"
        label="Favorite?"
        checked={formInput.favorite}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            favorite: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <div className="d-flex justify-content-center">
        <Button type="submit" variant="success" size="lg">
          {obj && obj.firebaseKey ? 'Update' : 'Create'} Author
        </Button>
      </div>
    </Form>
  );
}

AuthorForm.propTypes = {
  obj: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

export default AuthorForm;
