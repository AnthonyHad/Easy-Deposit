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
  }

  function cancelTansaction() {
    localStorage.removeItem('transactionData');
    router.replace('/accounts');
  }

  return (
    <Fragment>
      <form
        onSubmit={handleTwoFactorSubmit}
        class="flex flex-col items-center mt-8 justify-center h-screen"
      >
        <label class="text-lg font-medium mb-2">2FA Code:</label>
        <input
          type="text"
          value={twoFactorCode}
          onChange={handleTwoFactorChange}
          class="w-48 outline-none rounded-lg px-3 py-2 mb-4 text-center"
        />
        <button
          type="submit"
          class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
        >
          Submit
        </button>
        <button onClick={cancelTansaction}>Cancel Transaction</button>
      </form>
    </Fragment>
  );
}

export default TwoFactorAuth;
