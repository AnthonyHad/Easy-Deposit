import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

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

  // const accountList = accounts.map((account) => (
  //   <ul key={account.id}>
  //     <li>{account.id}</li>
  //   </ul>
  // ));

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
        <p>{message}</p>
        <ol>
          {accounts.map((account) => (
            <li key={account}>
              {account.name}
              <p>
                {account.amount} {account.currency}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}

export default Secret;
