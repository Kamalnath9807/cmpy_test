import { useState } from 'react';
import { useRouter } from 'next/router';
import { SignupForm } from '../components/SignupForm';

export default function Home() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSignupPopup, setShowSignupPopup] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/login`;
    const body = {
      phone,
      password,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('role', data.user.role);
        localStorage.setItem('accessToken', data.accessToken);

        router.push('/home');
      } else {
        if (response.status === 400) {
          setErrorMessage(data.message || 'Invalid credentials');
        } else {
          setErrorMessage('Login failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      setPhone(value);
    } else if (name === 'password') {
      setPassword(value);
    }
    if (phone.trim() !== '' && password.trim() !== '') {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
    setErrorMessage('');
  };
  const handleSignupPopupOpen = () => {
    setShowSignupPopup(true);
  };

  const handleSignupPopupClose = () => {
    setShowSignupPopup(false);
  };

  const handleSignupSubmit = async (signupData) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/signup`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });
      if (response.ok) {
        alert('User created successfully!');
        router.reload();
      } else {
        const data = await response.json();
        setErrorMessage(data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <section className='homeSection'>
        <h1>Cmpy test</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='phoneInput' className='form-label'>
              Mobile Number
            </label>
            <input
              type='text'
              className='form-control'
              id='phoneInput'
              name='phone'
              value={phone}
              onChange={handleInputChange}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='passwordInput' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              id='passwordInput'
              name='password'
              value={password}
              onChange={handleInputChange}
            />
          </div>
          <button
            type='submit'
            className='btn btn-primary'
            disabled={!formValid}
          >
            Submit
          </button>
          <button
            type='button'
            className='btn btn-secondary ms-2'
            onClick={handleSignupPopupOpen}
          >
            Sign Up
          </button>
          {errorMessage && (
            <div className='alert alert-danger mt-3'>{errorMessage}</div>
          )}
        </form>
      </section>
      {showSignupPopup && (
        <div className='signup-popup'>
          <div className='signup-popup-content'>
            <button className='close-btn' onClick={handleSignupPopupClose}>
              X
            </button>
            <h2>Signup</h2>
            <SignupForm onSubmit={handleSignupSubmit} />
          </div>
        </div>
      )}
    </div>
  );
}
