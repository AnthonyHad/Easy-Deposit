import Head from 'next/head';
import Link from 'next/link';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>Easy Deposit</title>
        <meta
          name="description"
          content="Transfer Crypto from Coinbase to your Ledger wallet safely and securely"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {!session && (
          <div className="container flex flex-col items-center justify-center h-screen">
            <p>Not Signed in</p> <br />
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-base"
              onClick={() => signIn()}
            >
              Sign In
            </button>
          </div>
        )}
        {session && (
          <div>
            <p>Signed in as {session.user.email || session.user.name} </p>
            <p>You can now access a super secret page! GG</p>
            <div>
              <button>
                <Link href="/secret">To the secret</Link>
              </button>
            </div>
            <button onClick={() => signOut()}>SignOut</button>
          </div>
        )}
      </main>
    </>
  );
}
