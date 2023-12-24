from geopy.geocoders import Nominatim
import sys 

def read_country(city):
    print("City: " , city)
    geolocator = Nominatim(user_agent="excel-manipulATOR")
    location = geolocator.geocode(city)
    country = location.address.split(',')[-1]
    return country

print(read_country("chennai"))  # This will output: ' Canada'


# if __name__ == "__main__":
#     print("Python : geography.py")
#     read_country(sys.argv[1])
