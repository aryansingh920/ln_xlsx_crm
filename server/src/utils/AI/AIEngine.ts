// import { GPTInterface } from './AIEngine';
import axios from "axios";

export interface MPTInterface {
  MPT: string;
  servercode: number;
}

export interface GPTInterface {
  result: string | null;
}

export interface LlamaInterface {
  LLAMA: string | null;
}

export async function Conversation_gpt35(query: String): Promise<GPTInterface> {
  const options = {
    method: "POST",
    url: "https://open-ai21.p.rapidapi.com/conversationgpt35",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.RAPID_API_KEY_VALUE,
      "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
    },
    data: {
      messages: [
        {
          role: "ai",
          content: query,
        },
      ],
      web_access: false,
      stream: false,
    },
  };

  try {
    const response = await axios.request(options);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function Bard_Palm2(query: String): Promise<void> {
  const options = {
    method: "POST",
    url: "https://open-ai21.p.rapidapi.com/conversationpalm2",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.RAPID_API_KEY_VALUE,
      "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
    },
    data: {
      messages: [
        {
          role: "ai",
          content: query,
        },
      ],
    },
  };

  try {
    const response = await axios.request(options);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function Chat_GPT(query: String): Promise<GPTInterface> {
  const options = {
    method: "POST",
    url: "https://open-ai21.p.rapidapi.com/conversationgpt",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.RAPID_API_KEY_VALUE,
      "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
    },
    data: {
      messages: [
        {
          role: "ai",
          content: query,
        },
      ],
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function Chat_GPT_35_Conversation(
  query: String
): Promise<GPTInterface> {
  const options = {
    method: "POST",
    url: "https://open-ai21.p.rapidapi.com/conversationmpt",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.RAPID_API_KEY_VALUE,
      "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
    },
    data: {
      messages: [
        {
          role: "user",
          content: query,
        },
      ],
      web_access: true,
    },
  };

  try {
    console.log("AI Called");
    const response = await axios.request(options);
    // console.log("response", response);
    console.log("AI gave response");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function Chat_GPT_35_Chat(query: String): Promise<GPTInterface> {
  const options = {
    method: "POST",
    url: "https://open-ai21.p.rapidapi.com/chatmpt",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.RAPID_API_KEY_VALUE,
      "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
    },
    data: { message: query },
  };

  try {
    const response = await axios.request(options);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function Chat_Llama_2(query: String): Promise<LlamaInterface> {
  const options = {
    method: "POST",
    url: "https://open-ai21.p.rapidapi.com/chatllama",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.RAPID_API_KEY_VALUE,
      "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
    },
    data: { message: query },
  };

  try {
    const response = await axios.request(options);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function Question_Answer(query: String): Promise<void> {
  const options = {
    method: "POST",
    url: "https://open-ai21.p.rapidapi.com/qa",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.RAPID_API_KEY_VALUE,
      "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
    },
    data: {
      question:
        "Give just the first name without accents with first letter capitalized",
      context: "àryäÑ(He/Him) Singh",
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
