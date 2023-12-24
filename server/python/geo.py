from geopy.geocoders import Nominatim
import sys
import re

def clean_string(input_string):
    # Remove non-alphabetic characters and keep spaces
    cleaned_string = re.sub(r'[^a-zA-Z\s]', '', input_string)
    return cleaned_string

def read_country(city):
    try:
        geolocator = Nominatim(user_agent="excel-manipulator")
        location = geolocator.geocode(city)

        if location is not None:
            # Extract country from the address
            country = location.address.split(',')[-1].strip()

            # Clean the country string, removing non-alphabetic characters
            cleaned_country = clean_string(country)

            # Find the position of the first uppercase letter
            start_position = next((i for i, c in enumerate(cleaned_country) if c.isupper()), 0)

            # Extract the substring from the capital onwards
            substring_from_capital = cleaned_country[start_position:]

            print(substring_from_capital)
        else:
            print(f"Location not found for: {city}")
    except Exception as e:
        print(f"Error: {str(e)}", file=sys.stderr)
        sys.exit(1)


# def read_country(city):
#     try:
#         geolocator = Nominatim(user_agent="excel-manipulATOR")
#         location = geolocator.geocode(city)
        
#         if location is not None:
#             # Extract country from the address
#             country = location.address.split(',')[-1].strip()
            
#             # Clean the country string, removing non-alphabetic characters
#             cleaned_country = clean_string(country)
            
#             print(cleaned_country)
#         else:
#             print(f"Location not found for: {city}")
#     except Exception as e:
#         print(f"Error: {str(e)}", file=sys.stderr)
#         sys.exit(1)

if __name__ == "__main__":
    # Check if an argument is provided
    if len(sys.argv) != 2:
        print("Usage: python script.py <city>")
        sys.exit(1)

    # Read the country for the provided city
    read_country(sys.argv[1])
