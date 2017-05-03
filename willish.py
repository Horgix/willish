#! venv/bin/python
from flask import Flask, jsonify, abort

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


@app.route('/wishes', methods=['GET'])
def get_wishes():
    return jsonify({'wishes': wishes})

@app.route('/wishes/<int:wish_id>', methods=['GET'])
def get_wish(wish_id):
    try:
        return jsonify({'wish': wishes[wish_id]})
    except IndexError:
        abort(404)


@app.route('/')
def index():
    return "Hello, World!"

if __name__ == '__main__':
    app.run(debug=True)
