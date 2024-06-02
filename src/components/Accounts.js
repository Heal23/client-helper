import React, { useState, useEffect } from 'react';

function Accounts() {
  const [accountType, setAccountType] = useState('');
  const [owner, setOwner] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [amountInputs, setAmountInputs] = useState({});  // Track input amounts for each account

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accountData = {
      type: accountType,
      owner: owner,
      amount: 0  // Initialize amount to 0 when creating a new account
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
      const responseData = await response.json();
      alert(`Server says: ${responseData.message}`);
      fetchData();  // Fetch all accounts after a new one is added
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
  };

  const fetchData = async () => {
    const response = await fetch('http://127.0.0.1:5000/accounts');
    const data = await response.json();
    setAccounts(data);
    // Initialize amount inputs
    const initialAmountInputs = {};
    data.forEach(account => {
      initialAmountInputs[account.id] = '';  // Initialize with an empty string
    });
    setAmountInputs(initialAmountInputs);
  };

  const handleAmountChange = (accountId, value) => {
    setAmountInputs(prev => ({ ...prev, [accountId]: value }));
  };

  const applyAmountChange = async (accountId, modifier) => {
    const amountChange = parseFloat(amountInputs[accountId] || 0) * modifier;
    const response = await fetch(`http://127.0.0.1:5000/accounts/${accountId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount_change: amountChange })
    });
    if (response.ok) {
      fetchData();  // Refresh accounts to show the updated amounts
    }
  };

  const deleteAccount = async (accountId) => {
    const response = await fetch(`http://127.0.0.1:5000/accounts/${accountId}`, { method: 'DELETE' });
    if (response.ok) {
      setAccounts(accounts.filter(account => account.id !== accountId));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
        <label>Account Type:
          <select value={accountType} onChange={e => setAccountType(e.target.value)}>
            <option value="">Select Type</option>
            <option value="main">Main</option>
            <option value="savings">Savings</option>
            <option value="investment">Investment</option>
          </select>
        </label>
        <br />
        <label>Owner:
          <input type="text" value={owner} onChange={e => setOwner(e.target.value)} />
        </label>
        <br />
        <button type="submit">Create Account</button>
      </form>

      <h2>Accounts List</h2>
      <ul>
        {accounts.map(account => (
          <li key={account.id}>
            <div>
              {account.type} - {account.owner} - ${account.amount}
              <input
                type="text"
                value={amountInputs[account.id] || ''}
                onChange={(e) => handleAmountChange(account.id, e.target.value)}
                placeholder="Adjust amount"
                style={{ width: 'auto' }} // Adjust width as needed
              />
            </div>
            <div>
              <button onClick={() => applyAmountChange(account.id, 1)}>Add</button>
              <button onClick={() => applyAmountChange(account.id, -1)}>Subtract</button>
              <button onClick={() => deleteAccount(account.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Accounts;