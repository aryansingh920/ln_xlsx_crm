import axios from "axios";

export interface ZeroBounceResponse {
  address: string;
  status: string;
  sub_status: string;
  free_email: boolean;
  did_you_mean: string;
  account: string;
  domain: string;
  domain_age_days: number;
  smtp_provider: string;
}

export const checkEmail = async (
  email: string
): Promise<ZeroBounceResponse> => {
  try {
    const response = await axios.get(
      `https://api.zerobounce.net/v2/validate?api_key=${process.env.ZERO_BOUNCE_API_KEY_VALUE}&email=${email}`
    );

    // Log the response data for debugging
    console.log(response.data);

    return response.data;
  } catch (error: any) {
    console.error("Error checking email:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};
