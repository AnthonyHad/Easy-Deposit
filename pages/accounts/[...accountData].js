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
    fetch('/api/send', {
      method: 'POST',
      body: JSON.stringify(transactionData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
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
