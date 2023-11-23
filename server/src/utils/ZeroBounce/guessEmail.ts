//  https://api.zerobounce.net/v2/guessformat?api_key=84fd6828a8d9427cb87d40e09d2c71db&domain=wates.co.uk&first_name=Adam&middle_name=&last_name=Cannon
import axios from "axios";
export interface EmailValidationResponse {
  email: string;
  domain: string;
  format: string;
  status: string;
  sub_status: string;
  confidence: string;
  did_you_mean: string;
  failure_reason: string;
  other_domain_formats: DomainFormat[];
}

export interface DomainFormat {
  format: string;
  confidence: string;
}


export async function guessEmail(
    domain: string,
    firstName: string,
    lastName: string
): Promise<EmailValidationResponse> {
    console.log("Checking email...");
    console.log("Domain:", domain);
    console.log("First name:", firstName);
    console.log("Last name:", lastName);
    try {
        const response = await axios.get(
        `https://api.zerobounce.net/v2/guessformat?api_key=${process.env.ZERO_BOUNCE_API_KEY_VALUE}&domain=${domain}&first_name=${firstName}&middle_name=&last_name=${lastName}`
        );   
        // Log the response data for debugging
        console.log(response.data);
    
        return response.data;
    } catch (error: any) {
        console.error("Error checking email:", error);
        return error; // Re-throw the error for the caller to handle
    }
}
    

