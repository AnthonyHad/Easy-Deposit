import { useEffect, useState } from 'react';

function TwoFactorAuth() {
  const [transactionData, setTransactionData] = useState(null);
  const [twoFactorCode, setTwoFactoreCode] = useState('');

  useEffect(() => {
    const storedData = localStorage.getItem('transactionData');
    if (storedData) {
      setTransactionData(JSON.parse(storedData));
    }
  }, []);

  function handleTwoFactorSubmit(event) {
    event.preventDefault();

    // Add the 2FA code to the transaction data
    transactionData.twoFactorCode = twoFactorCode;
    delete transactionData.requiresTwoFactor;
    console.log(transactionData);

    fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/html',
      },
      body: JSON.stringify(transactionData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    // setTwoFactoreCode('');
  }

  function handleTwoFactorChange(event) {
    setTwoFactoreCode(event.target.value);
  }

  return (
    <form onSubmit={handleTwoFactorSubmit}>
      <label>
        2FA Code:
        <input
          type="text"
          value={twoFactorCode}
          onChange={handleTwoFactorChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default TwoFactorAuth;
