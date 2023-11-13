import axios from "axios";

export const checkEmail = async (email: string): Promise<any> => {
  const output = await axios
    .get(
      `https://api.zerobounce.net/v2/validate?api_key=${process.env.ZERO_BOUNCE_API_KEY_VALUE}&email=${email}`
    )
    .then((r) => r.data)
    .catch((e) => e);
};
