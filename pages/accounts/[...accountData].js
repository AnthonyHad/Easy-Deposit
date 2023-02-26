import { useRouter } from 'next/router';
import SendForm from '@/components/send-form';

function AccountData() {
  const router = useRouter();
  const { accountData } = router.query;
  const [name, currency, amount, ...resourcePath] = accountData || [];

  if (!accountData || !name || !currency || !amount || !resourcePath) {
    return <div>Loading...</div>;
  }

  function sendTransactionHandler(transactionData) {
    const transactionDataWithTwoFactor = { ...transactionData }; // creating a copy of the transaction data.

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
          router.push('/accounts/two-fa');
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
