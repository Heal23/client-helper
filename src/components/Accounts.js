import React, { useState, useEffect } from 'react';

function Accounts() {
  const [accountType, setAccountType] = useState('');
  const [owner, setOwner] = useState('');
  const [accounts, setAccounts] = useState([]);  // State to store the list of accounts

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accountData = {
      type: accountType,
      owner: owner
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(accountData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.text();
      alert(`Server says: ${responseData}`);
      fetchData();  // Fetch all accounts after a new one is added
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
  };

  // Function to fetch all accounts
  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/accounts');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAccounts(data);
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
  };

  // Fetch accounts on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Account Type:
          <select value={accountType} onChange={e => setAccountType(e.target.value)}>
            <option value="">Select Type</option>
            <option value="main">Main</option>
            <option value="savings">Savings</option>
            <option value="investment">Investment</option>
          </select>
        </label>
        <br />
        <label>
          Owner:
          <input type="text" value={owner} onChange={e => setOwner(e.target.value)} />
        </label>
        <br />
        <button type="submit">Create Account</button>
      </form>

      <h2>Accounts List</h2>
      <ul>
        {accounts.map((account, index) => (
          <li key={index}>
            {account.type} - {account.owner} - {account.amount ? `$${account.amount}` : "No amount specified"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Accounts;

