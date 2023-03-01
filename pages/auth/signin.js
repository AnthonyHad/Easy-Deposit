import { getProviders, signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';

export default function SignIn({ providers }) {
  return (
    <>
      <main className="container mx-auto">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl">Easy Deposit</h1>
          <h2 className="text-lg">
            Deposit crypto from you favaorite excahnges to any account or your
            Ledger easily!
          </h2>
        </div>
      </main>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: '/accounts' } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
