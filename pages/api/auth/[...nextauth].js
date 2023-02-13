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
