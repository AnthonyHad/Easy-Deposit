import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function TwoFactorAuth() {
  const [transactionData, setTransactionData] = useState(null);
  const [twoFactorCode, setTwoFactoreCode] = useState('');

  const router = useRouter();

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
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transactionData),
    })
      .then((response) => response.json())
      // will need to poll here to check transaction data check documentation
      .then((data) => console.log(data));

    // setTwoFactoreCode('');
  }

  function handleTwoFactorChange(event) {
    setTwoFactoreCode(event.target.value);
    router.replace('/accounts');
  }

  function cancelTansaction() {
    localStorage.removeItem('transactionData');
    router.replace('/accounts');
  }

  return (
    <Fragment>
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
      <button onClick={cancelTansaction}>Cancel Transaction</button>
    </Fragment>
  );
}

export default TwoFactorAuth;
