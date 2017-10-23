#! venv/bin/python
from flask import Flask, jsonify, abort, make_response, request

app = Flask(__name__)

wishes = [
    {
        'id': 1,
        'name': 'DuckDuckGo t-shirt',
        'link': 'https://duck-duck-go.myshopify.com/collections/frontpage/products/duckduckgo-t-shirt',
        'acquired': True,
        'deleted': False
    },
    {
        'id': 2,
        'name': 'EFF pin',
        'link': 'https://supporters.eff.org/shop/eff-lapel-pin',
        'acquired': False,
        'deleted': False
    }
]

max_id = 2


@app.route('/wishes', methods=['GET'])
def get_wishes():
    return jsonify([wish for wish in wishes if not wish['deleted']])

@app.route('/wishes/<int:wish_id>', methods=['GET'])
def get_wish(wish_id):
    if wish_id == 0:
        abort(404)
    try:
        return jsonify(wishes[wish_id - 1])
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
    if not isinstance(json, dict) or ('name' not in json and 'link' not in json):
        # TODO : Maybe add error details if Debug is enabled?
        abort(422)
    global max_id
    max_id += 1
    new_id = max_id
    new_wish = {
            'id': max_id,
            'name': json.get('name'),
            'link': json.get('link'),
            'acquired': False,
            'deleted': False
            }
    wishes.append(new_wish)
    return jsonify(new_wish), 201

@app.route('/wishes/<int:wish_id>', methods=['DELETE'])
def delete_wish(wish_id):
    if wish_id == 0:
        abort(404)
    try:
        wishes[wish_id - 1]['deleted'] = True
    except IndexError:
        abort(404)
    return jsonify(wishes[wish_id - 1])

@app.errorhandler(400)
def bad_request(error):
    return make_response(jsonify({'error': str(error)}), 400)

@app.errorhandler(422)
def unprocessable_entity(error):
    return make_response(jsonify({'error': str(error)}), 422)

#@app.errorhandler(500)
#def internal_server_error(error):
#    return make_response(jsonify({'error': str(error)}), 500)

@app.route('/')
def index():
    return "Hello, I'm the Willish API :)"

if __name__ == '__main__':
    app.run(debug=True)
