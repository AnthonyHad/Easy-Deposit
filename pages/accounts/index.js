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
    if (!session) {
      router.replace('/');
    } else {
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
        }
      };
      fetchData();
    }
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

  //signout added as a temporrary fix for the problem
  if (accounts.length === 0 && session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-3xl font-bold mb-8">Loading accounts...</div>
        <button
          className="px-4 py-2 text-lg text-white font-semibold rounded-full bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  } else if (!session) {
    return;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="container mx-auto p-8">
        <div className="text-center font-semibold text-l">
          Here is a list of all supported assets which you can migrate to Ledger
          easily!
        </div>
        <Fragment>
          <div className="mt-8">{accountsList}</div>
          <div className="text-center mt-8">
            <button
              className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
              onClick={() => signOut()}
            >
              Sign out
            </button>
          </div>
        </Fragment>
      </div>
    </div>
  );
}

export default Accounts;

// Accounts might not need to be fetched everytime we can us a combination getStaticProps and useEffect
