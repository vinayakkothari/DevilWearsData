# from flask import Flask, render_template
# import requests
# from bs4 import BeautifulSoup

# app = Flask(__name__)

# # Function to scrape the title of a webpage
# def get_title(url):
#     try:
#         response = requests.get(url)
#         soup = BeautifulSoup(response.content, 'html.parser')
#         return soup.title.string.strip() if soup.title else "No Title Found"
#     except Exception as e:
#         return f"Error: {str(e)}"

# @app.route('/')
# def index():
#     urls = [
#         'https://www.vogue.in/',
#         'https://www.refinery29.com/en-us/fashion-blogs',
#         # Add more URLs here
#     ]
#     titles = {url: get_title(url) for url in urls}
#     return render_template('index.html', titles=titles)

# if __name__ == "__main__":
#     app.run(debug=True)

# from flask import Flask, render_template
# from apscheduler.schedulers.background import BackgroundScheduler
# import requests
# from bs4 import BeautifulSoup

# app = Flask(__name__)

# # Store the articles in a global variable
# vogue_articles = []
# refinery29_articles = []

# # Function to scrape and update articles
# def update_articles():
#     global vogue_articles, refinery29_articles
#     vogue_articles = get_vogue_articles()
#     refinery29_articles = get_refinery29_articles()

# # Web scraping functions (from earlier)
# def get_vogue_articles():
#     url = 'https://www.vogue.com'
#     response = requests.get(url)
#     soup = BeautifulSoup(response.content, 'html.parser')
#     articles = soup.find_all('a', class_='article__content', limit=3)  # Adjust based on Vogue's structure
#     top_articles = []
#     for article in articles:
#         title = article.get_text(strip=True)
#         link = article['href']
#         if not link.startswith('http'):
#             link = url + link  # Ensure URL is absolute
#         top_articles.append((title, link))
#     return top_articles

# def get_refinery29_articles():
#     url = 'https://www.refinery29.com/en-us/fashion-blogs'
#     response = requests.get(url)
#     soup = BeautifulSoup(response.content, 'html.parser')
#     articles = soup.find_all('a', class_='top-story', limit=3)  # Adjust based on Refinery29's structure
#     top_articles = []
#     for article in articles:
#         title = article.get_text(strip=True)
#         link = article['href']
#         if not link.startswith('http'):
#             link = url + link  # Ensure URL is absolute
#         top_articles.append((title, link))
#     return top_articles

# # Set up Flask route to display the articles
# @app.route('/')
# def index():
#     return render_template('index.html', vogue_articles=vogue_articles, refinery29_articles=refinery29_articles)

# # Set up the scheduler to update articles daily
# scheduler = BackgroundScheduler()
# scheduler.add_job(func=update_articles, trigger="interval", days=1)
# scheduler.start()

# # Update the articles at startup
# update_articles()

# if __name__ == "__main__":
#     app.run(debug=True)

from flask import Flask, render_template
from apscheduler.schedulers.background import BackgroundScheduler
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

# Store the articles in global variables
vogue_articles = []
refinery29_articles = []

# Function to scrape and update articles
def update_articles():
    global vogue_articles, refinery29_articles
    vogue_articles = get_vogue_articles()
    #refinery29_articles = get_refinery29_articles()

# Web scraping functions
def get_vogue_articles():
    url = 'https://www.vogue.com'
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    articles = soup.find_all('a', class_='SummaryItemHedLink-civMjp dVrbhU summary-item-tracking_hed-link summary-item_hed-link', limit=3)  # Adjust the class as needed
    top_articles = []
    for article in articles:
        title = article.get_text(strip=True)
        link = article['href']
        if not link.startswith('http'):
            link = url + link  # Ensure URL is absolute
        top_articles.append((title, link))
    return top_articles

'''
def get_refinery29_articles():
    url = 'https://www.refinery29.com/en-us/fashion-blogs'
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    articles = soup.find_all('a', class_='top-story', limit=3)  # Adjust the class as needed
    top_articles = []
    for article in articles:
        title = article.get_text(strip=True)
        link = article['href']
        if not link.startswith('http'):
            link = url + link  # Ensure URL is absolute
        top_articles.append((title, link))
    return top_articles
'''

# Set up Flask route to display the articles
@app.route('/')
def index():
    print("Vogue Articles (in index):", vogue_articles)  # Debugging line
    #print("Refinery29 Articles (in index):", refinery29_articles)  # Debugging line
    return render_template('index.html', 
                           vogue_articles=vogue_articles, 
                           refinery29_articles=refinery29_articles)

# Set up the scheduler to update articles daily
scheduler = BackgroundScheduler()
scheduler.add_job(func=update_articles, trigger="interval", days=1)
scheduler.start()

# Update the articles at startup
update_articles()

if __name__ == "__main__":
    app.run(debug=True)
