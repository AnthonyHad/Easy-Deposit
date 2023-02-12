import NextAuth from 'next-auth';
import CoinbaseProvider from 'next-auth/providers/coinbase';
import GitHubProvider from 'next-auth/providers/github';

export default NextAuth({
  providers: [
    // CoinbaseProvider({
    //   clientId: '',
    //   clientSecret: '',
    // }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
});
