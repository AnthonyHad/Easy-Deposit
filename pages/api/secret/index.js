import { getServerSession } from 'next-auth/next';
import { getToken } from 'next-auth/jwt';

const secret = process.env.GITHUB_SECRET;
async function handler(req, res) {
  const token = await getToken({ req, secret });
  console.log(token);
  const session = await getServerSession(req, res);

  if (session) {
    try {
      res.send({
        message: ' You have gained access to the super secret page!',
      });
    } catch (error) {
      console.log('I am here');
    }
  } else {
    res.send({
      error: ' You cannot access this page',
    });
  }
}

export default handler;
