import openai
import yaml

class OpenAIClient:
    def __init__(self, config_file="config.yaml"):
        self.config_file = config_file

        # Load the configuration from the YAML file
        self.config = self._load_config()

        openai.api_key = self.config.get("openai_api_key")

    def _load_config(self):
        try:
            with open(self.config_file, "r") as file:
                config = yaml.safe_load(file)
                return config
        except FileNotFoundError:
            raise Exception(f"Config file '{self.config_file}' not found.")
        except yaml.YAMLError as e:
            raise Exception(f"Error parsing YAML config file: {e}")

    def generate_text(self, prompt, max_tokens=50, temperature=0.7):
        try:
            response = openai.Completion.create(
                engine="davinci",  # You can change the engine as needed
                prompt=prompt,
                max_tokens=max_tokens,
                temperature=temperature
            )

            if response.choices:
                return response.choices[0].text.strip()
            else:
                return "No response from the AI."

        except Exception as e:
            return f"An error occurred: {str(e)}"

# Example usage:
if __name__ == "__main__":
    openai_client = OpenAIClient()

    # Generate text using the OpenAI API
    prompt = "Translate the following English text to French: 'Hello, how are you?'"
    generated_text = openai_client.generate_text(prompt)

    print(generated_text)
