let novuInstance = null;

const getNovu = async () => {
  if (!novuInstance) {
    const { Novu } = await import("@novu/api");

    novuInstance = new Novu({
      secretKey: process.env.NOVU_SECRET_KEY
    });
  }

  return novuInstance;
};

module.exports = getNovu;
