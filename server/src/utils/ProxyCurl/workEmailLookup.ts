import axios, { AxiosResponse } from "axios";

interface ApiResponse {
  // Define the response structure based on your API's response
  // For example, if your API returns a JSON object with a 'data' field,
  // you can define it like this:
  data: any;
}

const uri = "https://nubela.co/proxycurl/api/linkedin/profile/email";

export async function fetchLinkedInProfileEmail(
  //   apiKey: string,
  linkedInProfileUrl: string,
  callbackUrl: string
): Promise<AxiosResponse<ApiResponse>> {
  try {
    const response = await axios.get(uri, {
      headers: {
        Authorization: `Bearer ${process.env.PROXYCURL_API_KEY}`,
      },
      params: {
        linkedin_profile_url: linkedInProfileUrl,
        callback_url: callbackUrl,
      },
    });

    return response;
  } catch (error) {
    // Handle errors here
    throw error;
  }
}

// // Example usage:
// const YOUR_API_KEY = "your_actual_api_key";
// const linkedInProfileUrl = "https://sg.linkedin.com/in/williamhgates";
// const callbackUrl = "https://webhook.site/29e12f17-d5a2-400a-9d08-42ee9d83600a";

// fetchLinkedInProfileEmail(YOUR_API_KEY, linkedInProfileUrl, callbackUrl)
//   .then((response) => {
//     console.log("Response:", response.data);
//   })
//   .catch((error) => {
//     console.error("Error:", error.message);
//   });
