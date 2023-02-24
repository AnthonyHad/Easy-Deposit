async function handler(req, res) {
  console.log(req.body);
  res.send({
    message: 'coucou!!!',
  });
}

export default handler;
