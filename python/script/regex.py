#regex.py
import re

mobile_pattern_regex = r'\d{3}-\d{3}-\d{4}'
name_pattern_regex = r'[A-Za-z]+'
location_pattern_regex = r'[A-Za-z\s]+'

class TextParser:
    def __init__(self, text):
        self.text = text

    def find_mobile_numbers(self):
        mobile_pattern = mobile_pattern_regex
        matches = re.findall(mobile_pattern, self.text)
        return matches

    def find_names(self):
        name_pattern = name_pattern_regex
        matches = re.findall(name_pattern, self.text)
        return matches

    def find_locations(self):
        location_pattern = location_pattern_regex
        matches = re.findall(location_pattern, self.text)
        return [match.strip() for match in matches]

# # Sample text
# text = "John's mobile number is 123-456-7890. John and Jane are friends, and they live in New York."

# # Create an instance of the TextParser class
# parser = TextParser(text)

# # Find and print mobile numbers
# mobile_numbers = parser.find_mobile_numbers()
# print("Mobile Numbers:", mobile_numbers)

# # Find and print names
# names = parser.find_names()
# print("Names:", names)

# # Find and print locations
# locations = parser.find_locations()
# print("Locations:", locations)
