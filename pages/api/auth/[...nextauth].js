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
          scope:
            'wallet:accounts:read,wallet:transactions:read,wallet:transactions:send,wallet:transactions:transfer',
          'meta[send_limit_amount]': '1',
          'meta[send_limit_currency': 'USD',
          'meta[send_limit_period]': 'day',
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile.id;
      }
      return token;
    },
  },
});

// Questions
// 1. Is it relevant to send the token to the client?
// 2. is it relevant to create specific API routes for each scope ?
