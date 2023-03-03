import NextAuth from 'next-auth';
import CoinbaseProvider from 'next-auth/providers/coinbase';
import { getProviders } from 'next-auth/react';

export default NextAuth({
  providers: [
    CoinbaseProvider({
      clientId: process.env.COINBASE_ID,
      clientSecret: process.env.COINBASE_SECRET,
      authorization: {
        url: 'https://www.coinbase.com/oauth/authorize',
        params: {
          scope: 'wallet:accounts:read,wallet:transactions:read',
          account: 'all',
        },
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.

      const providers = await getProviders();
      console.log(providers);

      // session.scope = 'wallet:accounts:read,wallet:transactions:read';
      // console.log(session);

      return session;
    },
  },
});

// Questions
// 2. is it relevant to create specific API routes for each scope ?
