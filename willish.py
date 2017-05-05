#! venv/bin/python
from flask import Flask, jsonify, abort, make_response, request

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

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': str(error)}), 404)

@app.route('/wishes', methods=['POST'])
def add_wish():
    json = request.get_json()
    if json is None:
        abort(400)
    }
    return jsonify({'name': name})

@app.errorhandler(400)
def bad_request(error):
    return make_response(jsonify({'error': str(error)}), 400)


@app.route('/')
def index():
    return "Hello, World!"

if __name__ == '__main__':
    app.run(debug=True)
