Warning, this is being developed, not even alpha yet.

# Methods

GET   http://example.com/wishes
Obtain information about a resource
Retrieve wishes list

GET   http://example.com/wishes/123
Obtain information about a resource
Retrieve wish #123

POST  http://example.com/wishes
Create a new resource
Create a new wish, from data provided with the request

PUT   http://example.com/wishes/123
Update a resource
Update wish #123, from data provided with the request

DELETE http://example.com/wishes/123
Delete a resource
Delete wish #123

# API versioning

This will be taken care of in a later release, with proper version in
accepted-content, etc., not in URL

# Methods

- GET     `http://[hostname]/wishes`            Retrieve list of wishes
- GET     `http://[hostname]/wishes/[wish_id]`  Retrieve a wish based on its ID
- POST    `http://[hostname]/wishes`            Create a new wish, from data
  provided with the request
- PUT     `http://[hostname]/wishes/[wish_id]`  Update an existing wish based
  on its ID, from data provided with the request
- DELETE  `http://[hostname]/wishes/[wish_id]`  Delete a wish based on its ID

# What's a wish?

- `id`: Numeric. Unique identifier.
- `name`: String. Wish item name.
- `link`: String. Link to somewhere the wish can be found.
- `acquired`: Bool. wish obtention status.

# Virtualenv

    make venv

# Dependencies

`requirements.txt` contains a pip freeze



# What I did

- `pip install flask`
