exports.handler = async (event) => {
  const { password } = JSON.parse(event.body);

  if (password === process.env.EXCLUSIVE_PASSWORD) {
    return {
      statusCode: 200,
      body: JSON.stringify({ allowed: true }),
    };
  }

  return {
    statusCode: 401,
    body: JSON.stringify({ allowed: false }),
  };
};
