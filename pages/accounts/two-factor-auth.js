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
        <div class="flex justify-between ">
          <button
            type="submit"
            class="flex-1 px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 mr-2"
          >
            Submit
          </button>
          <button
            className='flex-1 px-4 py-1 text-sm text-red-500 font-semibold rounded-full border border-red-500 hover:text-white hover:bg-red-500 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ml-2"'
            onClick={cancelTansaction}
          >
            Cancel
          </button>
        </div>
      </form>
    </Fragment>
  );
}

export default TwoFactorAuth;
