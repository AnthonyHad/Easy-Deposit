import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

function Secret() {
  const { data: session, status } = useSession();
  const [message, setMessage] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/secret');
      const data = await res.json();

      if (data.message) {
        setMessage(data.message);
      }
    };
    fetchData();
  }, [session]);

  if (typeof window !== 'undefined' && status === 'loading') return null;

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

export default Secret;
