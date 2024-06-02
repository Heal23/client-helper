import React, { useState } from 'react';

function Expenses() {
  const [data, setData] = useState('');

  const fetchData = async () => {
    const response = await fetch('http://127.0.0.1:5000/expenses');
    const data = await response.text();
    setData(data);
  };

  return (
    <div>
      <h1>Expenses</h1>
      <button onClick={fetchData}>Test API</button>
      <p>{data}</p>
    </div>
  );
}

export default Expenses;
