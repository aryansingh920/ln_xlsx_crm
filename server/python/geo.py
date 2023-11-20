from geopy.geocoders import Nominatim
import sys 

def read_country(city):
    # print("Python script running...")
    # print("city: ", city)
    try:
        geolocator = Nominatim(user_agent="excel-manipulATOR")
        location = geolocator.geocode(city)
        country = location.address.split(',')[-1].strip()
        print(country)
    except Exception as e:
        # print(f"Error: {str(e)}", file=sys.stderr)
        print(city)
        sys.exit(1)


if __name__ == "__main__":
    read_country(sys.argv[1])
