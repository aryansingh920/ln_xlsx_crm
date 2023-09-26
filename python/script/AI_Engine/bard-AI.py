import requests
import yaml

class BardAPI:
    def __init__(self, config_file="config.yaml"):
        self.config_file = config_file

        # Load the configuration from the YAML file
        self.config = self._load_config()

    def _load_config(self):
        try:
            with open(self.config_file, "r") as file:
                config = yaml.safe_load(file)
                return config
        except FileNotFoundError:
            raise Exception(f"Config file '{self.config_file}' not found.")
        except yaml.YAMLError as e:
            raise Exception(f"Error parsing YAML config file: {e}")

    def _get_headers(self):
        api_key = self.config.get("api_key")
        if not api_key:
            raise Exception("API key not found in config.yaml")

        return {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        }

    def generate_text(self, prompt):
        base_url = self.config.get("base_url", "https://api.bardai.com")

        endpoint = "/generate"  # Replace with the actual API endpoint for text generation
        url = f"{base_url}{endpoint}"

        data = {
            "prompt": prompt,
            "options": {
                "temperature": 0.7,  # Replace with your desired parameters
                "max_tokens": 50,
            }
        }

        headers = self._get_headers()

        try:
            response = requests.post(url, json=data, headers=headers)
            response.raise_for_status()
            return response.json()["text"]
        except requests.exceptions.RequestException as e:
            raise Exception(f"API request failed: {e}")

# Example usage:
if __name__ == "__main__":
    bard = BardAPI()

    prompt = "Once upon a time,"
    generated_text = bard.generate_text(prompt)
    print(generated_text)
