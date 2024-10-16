# import requests
# from bs4 import BeautifulSoup

# url = "https://www.vogue.in/"

# html = requests.get(url)

# soup = BeautifulSoup(html.content, 'html.parser')

# links = soup.find_all('a')

# for link in links:
#     print(link.get('href'))

from flask import Flask, render_template
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

def get_top_fashion_articles():
    base_url = "https://www.vogue.in"
    fashion_url = base_url + "/fashion"

    response = requests.get(fashion_url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        articles = soup.find_all('a', href=True)

        top_articles = []
        for article in articles:
            if '/fashion/' in article['href']:
                title = article.get_text(strip=True)
                link = article['href']
                if link and not link.startswith('http'):
                    link = base_url + link  # Make it absolute
                
                top_articles.append((title, link))
                
                if len(top_articles) >= 3:
                    break

        return top_articles
    else:
        print(f"Failed to retrieve content. Status code: {response.status_code}")
        return []

@app.route('/')
def index():
    top_fashion_articles = get_top_fashion_articles()
    return render_template('index.html', articles=top_fashion_articles)

if __name__ == "__main__":
    app.run(debug=True)


