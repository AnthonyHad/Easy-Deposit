import { signIn, useSession } from 'next-auth/react';

import { useRouter } from 'next/router';
import SendForm from '@/components/send-form';

function AccountData() {
  const router = useRouter();
  const { data: session } = useSession();

  const { accountData } = router.query;
  const [name, currency, amount, ...resourcePath] = accountData || [];

  if (!accountData || !name || !currency || !amount || !resourcePath) {
    return <div>Loading...</div>;
  }
  console.log(session);
  async function sendTransactionHandler(transactionData) {
    const transactionDataWithTwoFactor = { ...transactionData }; // creating a copy of the transaction data.

    if (
      !session ||
      !session.accessToken ||
      !session.scope.includes('wallet:transactions:send')
    ) {
      // Reauthenticate the user and get new permissions and check on scopes
      await signIn('coinbase', undefined, {
        scope:
          'wallet:accounts:read,wallet:transactions:read,wallet:transactions:send',
        'meta[send_limit_amount]': '1',
        'meta[send_limit_currency': 'USD',
        'meta[send_limit_period]': 'day',
        account: 'all',
      });
    }

    //Send Transaction Data
    console.log('I am hereeee');
    fetch('/api/send', {
      method: 'POST',
      body: JSON.stringify(transactionData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
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
          router.push('/accounts/two-factor-auth');
        }
      });
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

// might need to refresh the page in case the user buys some crypto
