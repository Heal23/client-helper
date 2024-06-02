// client-helper/src/components/CreateAccount.js
import React, { useState } from 'react';

const CreateAccount = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('saving');
  const [message, setMessage] = useState('');

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    const accountData = { name, account_type: type };

    try {
      const response = await fetch('http://localhost:5000/api/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      console.error('Error creating account:', error);
      setMessage('Error creating account');
    }
  };

  return (
    <div className="create-account">
      <h2>Create a New Account</h2>
      <form onSubmit={handleCreateAccount}>
        <div className="form-group">
          <label htmlFor="name">Account Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Account Type:</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="saving">Saving</option>
            <option value="main">Main</option>
            <option value="investment">Investment</option>
          </select>
        </div>
        <button type="submit">Create Account</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateAccount;
