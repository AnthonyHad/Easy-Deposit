import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function Secret() {
  const { data: session, status } = useSession();
  const [message, setMessage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/secret');
      const json = await res.json();

      if (json.message) {
        setMessage(json.message);
      }
      console.log(message, 'hello');
      fetchData();
    };
  }, [session]);

  console.log(session);
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
        <h1> Protected Page</h1>
        <p style={{ color: 'red' }}>{message}</p>
      </div>
    </main>
  );
}
