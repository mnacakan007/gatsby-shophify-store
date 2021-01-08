exports.handler = async (event) => {
  const { password, passwordVariable } = JSON.parse(event.body);

  if (password === process.env[passwordVariable]) {
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
