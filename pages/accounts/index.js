import { useState, useEffect, Fragment } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

import Link from 'next/link';

import UserAsset from 'components/user-asset';

function Accounts() {
  const { data: session, status } = useSession();
  const [message, setMessage] = useState();
  const [accounts, setAccounts] = useState([]);

  // might be able to add this to getStaticProps
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/secret');
      const data = await res.json();

      if (data.message) {
        setMessage(data.message);
        setAccounts(data.accounts);
      }
    };
    fetchData();
  }, [session]);

  const accountsList = accounts.map((account) => (
    <Link
      key={account.currency}
      href={`/accounts/${account.name}/${account.currency}/${account.amount}/${account.resourcePath}`}
    >
      <UserAsset
        name={account.name}
        currency={account.currency}
        amount={account.amount}
      />
    </Link>
  ));

  if (status === 'loading') return <p>Loading.....</p>;

  if (!session) {
    //redirect to Sign In page
    return (
      <main>
        <div>
          <h1>You are not signed in, please sign in first</h1>
          <button onClick={() => signIn('coinbase')}>SignIn</button>
        </div>
      </main>
    );
  }
  return (
    <main>
      <div>
        <h1> This is the protected page</h1>
        <Fragment>
          <p>{message}</p>
          {accountsList}
          <button onClick={() => signOut()}>SignOut</button>
        </Fragment>
      </div>
    </main>
  );
}

export default Accounts;
