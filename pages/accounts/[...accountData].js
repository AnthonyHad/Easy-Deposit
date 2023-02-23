import { useRouter } from 'next/router';
import SendForm from '@/components/send-form';

function AccountData() {
  const router = useRouter();
  const { accountData } = router.query;
  const [name, currency, amount, ...resourcePath] = accountData || [];

  if (!accountData || !name || !currency || !amount || !resourcePath) {
    return <div>Loading...</div>;
  }

  return (
    <SendForm
      name={name}
      currency={currency}
      amount={amount}
      resourcePath={resourcePath}
    />
  );
}

export default AccountData;
