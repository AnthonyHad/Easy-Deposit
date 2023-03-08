import NextAuth from 'next-auth';
import CoinbaseProvider from 'next-auth/providers/coinbase';

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
        //not sure we need to pass the access token here
        token.accessToken = account.access_token;
        token.scope = account.scope;

        console.log('token', token);
        console.log('account', account);
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.scope = token.scope;

      console.log('sever session', session);

      return session;
    },
  },
});
