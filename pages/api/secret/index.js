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

    const walletData = await fetch(url, options);
    const accounts = await walletData.json();
    console.log(accounts.data);

    try {
      res.send({
        message: ' You have gained access to the super secret page!',
        accounts: accounts.data,
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
