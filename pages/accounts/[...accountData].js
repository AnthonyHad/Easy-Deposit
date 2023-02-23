import { useRouter } from 'next/router';
import SendForm from '@/components/send-form';

function AccountData() {
  const router = useRouter();
  const { accountData } = router.query;
  const [name, currency, amount] = accountData || [];

  if (!accountData || !name || !currency || !amount) {
    return <div>Loading...</div>;
  }

  return <SendForm name={name} currency={currency} amount={amount} />;
}

export default AccountData;
