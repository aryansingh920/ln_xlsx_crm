from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import os

# Set the path to your webdriver (e.g., ChromeDriver)
webdriver_path = "..\chromedriver-win64\chromedriver.exe"

# LinkedIn credentials
linkedin_username = os.environ.get('LINKEDIN_USERNAME')
linkedin_password = os.environ.get('LINKEDIN_PASSWORD')

# Set up Chrome WebDriver
driver = webdriver.Chrome(executable_path=webdriver_path)
driver.get("https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin")

try:
    # Wait for the login form elements to be present
    username_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "username"))
    )
    password_input = driver.find_element(By.ID, "password")
    submit_button = driver.find_element(By.CSS_SELECTOR, "button[data-litms-control-urn='login-submit']")

    # Input LinkedIn credentials and submit the form
    username_input.send_keys(linkedin_username)
    password_input.send_keys(linkedin_password)
    submit_button.click()

    # Wait for the homepage to load
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "nav-typeahead-wormhole"))
    )

    # Perform further actions if needed

except Exception as e:
    print(f"An error occurred: {e}")

# Close the browser
driver.quit()
