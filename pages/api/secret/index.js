import { getServerSession } from 'next-auth/next';
import { getToken } from 'next-auth/jwt';

async function handler(req, res) {
  const token = await getToken({ req });
  const session = await getServerSession(req, res);

  if (session) {
    const url = 'https://api.coinbase.com/v2/accounts';
    const options = {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
        'CB-VERSION': '2023-02-11',
      },
    };
    console.log('token', token.accessToken);
    const walletData = await fetch(url, options);
    const { data: accounts } = await walletData.json();
    const formattedWalletData = accounts.map((account) => ({
      name: account.currency.name,
      amount: account.balance.amount,
      currency: account.currency.code,
      resourcePath: account.resource_path.substring(1),
    }));
    console.log(formattedWalletData);

    try {
      res.send({
        message: ' You have gained access to the super secret page!',
        accounts: formattedWalletData,
      });
    } catch (error) {
      console.log('I am here');
    }
  } else {
    res.send({
      error: ' You cannot access this page',
    });
  }
}

export default handler;
