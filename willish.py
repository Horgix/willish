#! venv/bin/python
from flask import Flask

app = Flask(__name__)

wishes = [
        {
            'id': 1,
            'name': 'DuckDuckGo t-shirt',
            'link': 'https://duck-duck-go.myshopify.com/collections/frontpage/products/duckduckgo-t-shirt',
            'acquired': True
            },
        {
            'id': 2,
            'name': 'EFF pin',
            'link': 'https://supporters.eff.org/shop/eff-lapel-pin',
            'acquired': False
            }
        ]

@app.route('/')
def index():
    return "Hello, World!"

if __name__ == '__main__':
    app.run(debug=True)
