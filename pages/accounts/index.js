import { useState, useEffect, Fragment } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import UserAsset from 'components/user-asset';

function Accounts() {
  const { data: session, status } = useSession();
  const [accounts, setAccounts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/secret');
        const data = await res.json();

        if (data.message) {
          setAccounts(data.accounts);
        }
      } catch (error) {
        console.error(error);
        // Display an appropriate error message to the user
        setMessage('An error occurred while fetching data');
      }
    };
    fetchData();
  }, [session]);

  const accountsList = accounts.map(
    ({ name, currency, amount, resourcePath }) => (
      <Link
        key={currency}
        href={`/accounts/${name}/${currency}/${amount}/${resourcePath}`}
      >
        <UserAsset name={name} currency={currency} amount={amount} />
      </Link>
    )
  );

  useEffect(() => {
    if (!session) {
      router.replace('/');
    }
  }, [session]);

  if (!session) {
    return (
      <main>
        <div>
          <h1>You are not signed in, please sign in first</h1>
        </div>
      </main>
    );
  }
  //signout added as a temporrary fix for the problem
  if (status === 'loading' || accounts.length === 0) {
    return (
      <main>
        <div>
          <h1>Loading accounts...</h1>
          <button onClick={() => signOut()}>SignOut</button>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div>
        <h1>
          Here is a list of all supported assets which you can migrate to Ledger
          easily!
        </h1>
        <Fragment>
          {accountsList}
          <button onClick={() => signOut()}>SignOut</button>
        </Fragment>
      </div>
    </main>
  );
}

export default Accounts;

//Questions:
// Not sure I need to fetch everytime the accounts, might need a combination of GetStatic Props and useEffect
