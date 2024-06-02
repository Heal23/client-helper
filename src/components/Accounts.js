import React, { useState } from 'react';

function Accounts() {
  const [data, setData] = useState('');

  const fetchData = async () => {
    const response = await fetch('http://127.0.0.1:5000/accounts');
    const data = await response.text();
    setData(data);
  };

  return (
    <div>
      <h1>Accounts</h1>
      <button onClick={fetchData}>Test API</button>
      <p>{data}</p>
    </div>
  );
}

export default Accounts;
