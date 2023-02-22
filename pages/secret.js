import { useState, useEffect, Fragment } from 'react';
import { useSession } from 'next-auth/react';

import UserAsset from 'components/user-asset';

function Secret() {
  const { data: session, status } = useSession();
  const [message, setMessage] = useState();
  const [accounts, setAccounts] = useState([]);

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
    <UserAsset
      key={account.currency}
      name={account.name}
      currency={account.currency}
      amount={account.amount}
    />
  ));

  if (status === 'loading') return <p>Loading.....</p>;

  if (!session) {
    return (
      <main>
        <div>
          <h1>You are not signed in, please sign in first</h1>
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
        </Fragment>
      </div>
    </main>
  );
}

export default Secret;
