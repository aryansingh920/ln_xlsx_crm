import requests
from bs4 import BeautifulSoup
import re
from urllib.parse import urljoin

def scrape_and_search_emails(url):
    # Make a GET request to the URL
    response = requests.get(url)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # Parse the HTML content
        soup = BeautifulSoup(response.text, 'html.parser')

        # Find all email addresses on the webpage using a regular expression
        email_pattern = re.compile(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b')
        emails = re.findall(email_pattern, soup.get_text())

        # Remove duplicate emails
        unique_emails = list(set(emails))

        # Check for a contact page link
        contact_page_link = find_contact_page_link(soup, url)

        # If a contact page link is found, follow the link and search for emails
        if contact_page_link:
            print(f"Contact page found: {contact_page_link}")
            contact_page_emails = scrape_and_search_emails(contact_page_link)
            unique_emails.extend(contact_page_emails)

        return unique_emails

    else:
        print(f"Failed to retrieve the webpage. Status Code: {response.status_code}")
        return []

def find_contact_page_link(soup, base_url):
    # Example: Check for a link with text "Contact" or a URL containing "contact"
    contact_link = soup.find('a', text=re.compile(r'Contact', re.IGNORECASE)) or \
                   soup.find('a', href=re.compile(r'contact', re.IGNORECASE))

    if contact_link:
        # Join the link with the base URL to get the absolute URL
        absolute_url = urljoin(base_url, contact_link.get('href'))
        return absolute_url
    else:
        return None

# Example URL: replace with the URL of the webpage you want to scrape
url_to_scrape = "https://example.com"
company_emails = scrape_and_search_emails(url_to_scrape)

print("Company Emails found on the webpage:")
for email in company_emails:
    print(email)
