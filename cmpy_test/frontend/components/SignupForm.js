import { useState } from 'react';

export function SignupForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      email,
      phone,
      password,
      confirmPassword,
      role,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='mb-3'>
        <label htmlFor='nameInput' className='form-label'>
          Name
        </label>
        <input
          type='text'
          className='form-control'
          id='nameInput'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='emailInput' className='form-label'>
          Email
        </label>
        <input
          type='email'
          className='form-control'
          id='emailInput'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='phoneInputSignup' className='form-label'>
          Mobile Number
        </label>
        <input
          type='text'
          className='form-control'
          id='phoneInputSignup'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='passwordInputSignup' className='form-label'>
          Password
        </label>
        <input
          type='password'
          className='form-control'
          id='passwordInputSignup'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='confirmPasswordInput' className='form-label'>
          Confirm Password
        </label>
        <input
          type='password'
          className='form-control'
          id='confirmPasswordInput'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='roleInput' className='form-label'>
          Role
        </label>
        <select
          className='form-control'
          id='roleInput'
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value=''>Select Role</option>
          <option value='admin'>Admin</option>
          <option value='customer'>Customer</option>
        </select>
      </div>
      <button type='submit' className='btn btn-primary'>
        Sign Up
      </button>
    </form>
  );
}
