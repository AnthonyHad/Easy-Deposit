import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
const inter = Inter({ subsets: ['latin'] });

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

      <main className={styles.main}>
        {!session && (
          <div>
            <p>Not Signed in</p> <br />
            <button onClick={() => signIn()}>Sign In</button>
          </div>
        )}
        {session && (
          <div>
            <p>Signed in as {session.user.email} </p>
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
