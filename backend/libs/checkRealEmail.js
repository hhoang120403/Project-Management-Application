import aj from './arcjet.js';

export const checkEmail = async (req, res, email) => {
  const decision = await aj.protect(req, { email });

  if (decision.isDenied()) {
    return false;
  }
  return true;
};
