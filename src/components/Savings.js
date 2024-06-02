import React, { useState } from 'react';

function Savings() {
  const [data, setData] = useState('');

  const fetchData = async () => {
    const response = await fetch('http://127.0.0.1:5000/savings');
    const data = await response.text();
    setData(data);
  };

  return (
    <div>
      <h1>Savings</h1>
      <button onClick={fetchData}>Test API</button>
      <p>{data}</p>
    </div>
  );
}

export default Savings;
