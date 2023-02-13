import { getServerSession } from 'next-auth/next';

async function handler(req, res) {
  const session = await getServerSession(req);

  if (session) {
    res.send({
      message: ' You have gained access to the super secret page!',
    });
  } else {
    res.send({
      error: ' You cannot access this page',
    });
  }
  res.end();
}

export default handler;
