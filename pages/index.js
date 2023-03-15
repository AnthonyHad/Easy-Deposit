import { getProviders, signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';

export default function SignIn({ providers }) {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="container mx-auto p-8">
          <div className="text-4xl">Easy Deposit</div>
          <div className="text-lg">
            Deposit crypto from you favorite exchanges to your Ledger easily!
          </div>
          {Object.values(providers).map((provider) => (
            <div className="mt-10" key={provider.name}>
              <button
                className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                onClick={() => signIn(provider.id)}
              >
                Deposit from {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
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

// import Head from 'next/head';
// import Link from 'next/link';

// import { signIn, signOut, useSession } from 'next-auth/react';

// export default function Home() {
//   const { data: session, status } = useSession();

//   return (
//     <>
//       <Head>
//         <title>Easy Deposit</title>
//         <meta
//           name="description"
//           content="Transfer Crypto from Coinbase to your Ledger wallet safely and securely"
//         />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className="container mx-auto">
//         <div className="flex flex-col items-center">
//           <h1 className="text-4xl">Easy Deposit</h1>
//           <h2 className="text-lg">
//             Deposit crypto from you favaorite excahnges to any account or your
//             Ledger easily!
//           </h2>
//         </div>
//         {!session && (
//           <div className=" flex flex-col items-center justify-center h-screen">
//             <p>Not Signed in</p> <br />
//             <button
//               className="bg-indigo-500 hover:bg-indigo-700 text-base rounded px-4"
//               onClick={() => signIn()}
//             >
//               Sign In
//             </button>
//           </div>
//         )}
//         {session && (
//           <div>
//             <p>Signed in as {session.user.email || session.user.name} </p>
//             <p>You can now access a super secret page! GG</p>
//             <div>
//               <button className="bg-indigo-500 hover:bg-indigo-700 text-base rounded px-4">
//                 <Link href="/accounts">To the secret</Link>
//               </button>
//             </div>
//             <button onClick={() => signOut()}>SignOut</button>
//           </div>
//         )}
//       </main>
//     </>
//   );
// }
