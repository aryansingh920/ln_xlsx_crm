import axios from "axios";

export async function ZeroBounce(email: String): Promise<void> {
  const options = {
    method: "GET",
    url: "https://zerobounce1.p.rapidapi.com/v2/validate",
    params: {
      api_key: process.env.ZERO_BOUNCE_API_KEY_VALUE,
      email: email,
    },
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY_VALUE,
      "X-RapidAPI-Host": "zerobounce1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
