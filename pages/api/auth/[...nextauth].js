import NextAuth from 'next-auth';
import CoinbaseProvider from 'next-auth/providers/coinbase';

export default NextAuth({
  providers: [
    CoinbaseProvider({
      clientId: '',
      clientSecret: '',
    }),
  ],
});
