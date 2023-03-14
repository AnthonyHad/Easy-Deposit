import { useSession, signIn, getSession } from 'next-auth/react';

import { useRouter } from 'next/router';
import SendForm from '@/components/send-form';
import { useEffect, useState } from 'react';

function AccountData() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const { accountData } = router.query;
  const [name, currency, amount, ...resourcePath] = accountData || [];
  // const [storedTransactionData, setStoredTransactionData] = useState();

  useEffect(() => {
    const storageData = localStorage.getItem('transactionData');
    if (storageData) {
      // setStoredTransactionData(JSON.parse(storageData));
      const transactionDataWithTwoFactor = JSON.parse(storageData);
      if (transactionDataWithTwoFactor.requiresTwoFactor) {
        localStorage.removeItem('transactionData'); // Clear stored data here
        return;
      }
      fetch('/api/send', {
        method: 'POST',
        body: JSON.stringify(transactionDataWithTwoFactor),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('response data:', data);

          if (
            data.errors &&
            data.errors[0] &&
            data.errors[0].id === 'two_factor_required'
          ) {
            console.log('I am here');

            transactionDataWithTwoFactor.requiresTwoFactor = true;
            transactionDataWithTwoFactor.transactionResponse = data;
            localStorage.setItem(
              'transactionData',
              JSON.stringify(transactionDataWithTwoFactor)
            );
            console.log('redirecting user to twoFA page');

            router.push('/accounts/two-factor-auth');
          } else {
            console.log('unexpected response:', data);
            localStorage.removeItem('transactionData'); // Clear stored data here
          }
        })
        .catch((error) => {
          console.error('Send Request Failed', error);
        });
    }
  }, []);

  if (status === 'loading') {
    return <div>Loading....</div>;
  }

  if (!accountData || !name || !currency || !amount || !resourcePath) {
    return <div>Loading...</div>;
  }

  async function sendTransactionHandler(transactionData) {
    const transactionDataWithTwoFactor = { ...transactionData }; // creating a copy of the transaction data.
    console.log(transactionData);
    if (!session || !session.scope.includes('wallet:transactions:send')) {
      // Reauthenticate the user and get new permissions and check on scopes
      localStorage.setItem(
        'transactionData',
        JSON.stringify(transactionDataWithTwoFactor)
      );

      try {
        await signIn('coinbase', undefined, {
          scope:
            'wallet:accounts:read,wallet:transactions:read,wallet:transactions:send',
          'meta[send_limit_amount]': '1',
          'meta[send_limit_currency]': 'USD',
          'meta[send_limit_period]': 'day',
          account: 'all',
        });
        const updatedSession = await getSession();
        if (
          !updatedSession ||
          !updatedSession.scope.includes('wallet:transactions:send')
        ) {
          console.log('User does not have required permissions');
          return;
        }
      } catch (error) {
        console.error('Sign In Failed', error);
        return;
      }
    } else {
      console.log('Iam hereerererere');
      localStorage.setItem(
        'transactionData',
        JSON.stringify(transactionDataWithTwoFactor)
      );
      const response = await fetch('/api/send', {
        method: 'POST',
        body: JSON.stringify(transactionDataWithTwoFactor),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('response data:', data);

      if (
        data.errors &&
        data.errors[0] &&
        data.errors[0].id === 'two_factor_required'
      ) {
        console.log('I am here');

        transactionDataWithTwoFactor.requiresTwoFactor = true;
        transactionDataWithTwoFactor.transactionResponse = data;
        localStorage.setItem(
          'transactionData',
          JSON.stringify(transactionDataWithTwoFactor)
        );
        console.log('redirecting user to twoFA page');

        router.push('/accounts/two-factor-auth');
      } else {
        console.log('unexpected response:', data);
        localStorage.removeItem('transactionData'); // Clear stored data here
      }
    }
  }

  return (
    <SendForm
      name={name}
      currency={currency}
      amount={amount}
      resourcePath={resourcePath}
      onInitiateSend={sendTransactionHandler}
    />
  );
}

export default AccountData;
