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

Ideas :

- price
- multiple links

# Virtualenv

    make venv

# Dependencies

`requirements.txt` contains a pip freeze



# What I did

`pip install flask`

```
└> pip install flask
Collecting flask
  Downloading Flask-0.12.1-py2.py3-none-any.whl (82kB)
    100% |████████████████████████████████| 92kB 4.6MB/s
Collecting click>=2.0 (from flask)
  Downloading click-6.7-py2.py3-none-any.whl (71kB)
    100% |████████████████████████████████| 71kB 7.2MB/s
Collecting itsdangerous>=0.21 (from flask)
  Downloading itsdangerous-0.24.tar.gz (46kB)
    100% |████████████████████████████████| 51kB 9.2MB/s
Collecting Werkzeug>=0.7 (from flask)
  Downloading Werkzeug-0.12.1-py2.py3-none-any.whl (312kB)
    100% |████████████████████████████████| 317kB 1.5MB/s
Collecting Jinja2>=2.4 (from flask)
  Using cached Jinja2-2.9.6-py2.py3-none-any.whl
Collecting MarkupSafe>=0.23 (from Jinja2>=2.4->flask)
Building wheels for collected packages: itsdangerous
  Running setup.py bdist_wheel for itsdangerous ... done
  Stored in directory: /home/horgix/.cache/pip/wheels/fc/a8/66/24d655233c757e178d45dea2de22a04c6d92766abfb741129a
Successfully built itsdangerous
Installing collected packages: click, itsdangerous, Werkzeug, MarkupSafe, Jinja2, flask
Successfully installed Jinja2-2.9.6 MarkupSafe-1.0 Werkzeug-0.12.1 click-6.7 flask-0.12.1 itsdangerous-0.24
```

afdd9879e7dc104ab6fa707103e957c553624467

chmod +x willish.py

```
└> ./willish.py
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 191-272-850
127.0.0.1 - - [03/May/2017 13:31:17] "GET / HTTP/1.1" 200 -
```

```
└> curl localhost:5000
Hello, World!%
```
