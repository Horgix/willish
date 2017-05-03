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

http://flask.pocoo.org/docs/0.12/quickstart/#http-methods
and it's already handling HEAD for us :D

# GET /wishes

Add details about `curl -i`

```
└> curl -i localhost:5000/wishes                                                               [148]~15:37 Wed,May 03┘
HTTP/1.0 200 OK
Content-Type: application/json
Content-Length: 357
Server: Werkzeug/0.12.1 Python/3.6.0
Date: Wed, 03 May 2017 13:37:17 GMT

{
  "wishes": [
    {
      "acquired": true, 
      "id": 1, 
      "link": "https://duck-duck-go.myshopify.com/collections/frontpage/products/duckduckgo-t-shirt", 
      "name": "DuckDuckGo t-shirt"
    }, 
    {
      "acquired": false, 
      "id": 2, 
      "link": "https://supporters.eff.org/shop/eff-lapel-pin", 
      "name": "EFF pin"
    }
  ]
}
```

```
└#master> ./willish.py
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 191-272-850
127.0.0.1 - - [03/May/2017 15:37:03] "GET /wishes/1 HTTP/1.1" 404 -
127.0.0.1 - - [03/May/2017 15:37:17] "GET /wishes HTTP/1.1" 200 -
```


btw 404

```
└> curl -i localhost:5000/wishes/1                                                               [7]~15:36 Wed,May 03┘
HTTP/1.0 404 NOT FOUND
Content-Type: text/html
Content-Length: 233
Server: Werkzeug/0.12.1 Python/3.6.0
Date: Wed, 03 May 2017 13:37:03 GMT

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
<title>404 Not Found</title>
<h1>Not Found</h1>
<p>The requested URL was not found on the server.  If you entered the URL manually please check your spelling and try again.</p>
```

# Add GET /wishes/<wish_id>


http://flask.pocoo.org/docs/0.12/quickstart/#variable-rules

```
@app.route('/wishes/<int:wish_id>', methods=['GET'])
def get_wish(wish_id):
    return jsonify({'wish': wishes[wish_id]})
```

```
└> curl -i localhost:5000/wishes/1
HTTP/1.0 200 OK
Content-Type: application/json
Content-Length: 142
Server: Werkzeug/0.12.1 Python/3.6.0
Date: Wed, 03 May 2017 13:57:24 GMT

{
  "wish": {
    "acquired": false,
    "id": 2,
    "link": "https://supporters.eff.org/shop/eff-lapel-pin",
    "name": "EFF pin"
  }
}
```

Fine !
Now an unknown id...


```
└> curl -i localhost:5000/wishes/2                                                             [148]~15:57 Wed,May 03┘
HTTP/1.0 500 INTERNAL SERVER ERROR
Content-Type: text/html; charset=utf-8
X-XSS-Protection: 0
Connection: close
Server: Werkzeug/0.12.1 Python/3.6.0
Date: Wed, 03 May 2017 13:57:44 GMT

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
  "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <title>IndexError: list index out of range // Werkzeug Debugger</title>
    <link rel="stylesheet" href="?__debugger__=yes&amp;cmd=resource&amp;f=style.css"
        type="text/css">
    <!-- We need to make sure this has a favicon so that the debugger does
         not by accident trigger a request to /favicon.ico which might
         change the application state. -->
    <link rel="shortcut icon"
        href="?__debugger__=yes&amp;cmd=resource&amp;f=console.png">
    <script src="?__debugger__=yes&amp;cmd=resource&amp;f=jquery.js"></script>
    <script src="?__debugger__=yes&amp;cmd=resource&amp;f=debugger.js"></script>
    <script type="text/javascript">
      var TRACEBACK = 140000030783080,
          CONSOLE_MODE = false,
          EVALEX = true,
          EVALEX_TRUSTED = false,
          SECRET = "GeFqnZX5UMpgchZHapHh";
    </script>
  </head>
  <body style="background-color: #fff">
    <div class="debugger">
<h1>builtins.IndexError</h1>
<div class="detail">
  <p class="errormsg">IndexError: list index out of range</p>
</div>
<h2 class="traceback">Traceback <em>(most recent call last)</em></h2>
<div class="traceback">
  
  <ul><li><div class="frame" id="frame-140000030783416">
  <h4>File <cite class="filename">"/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/app.py"</cite>,
      line <em class="line">1997</em>,
      in <code class="function">__call__</code></h4>
  <div class="source"><pre class="line before"><span class="ws">                </span>error = None</pre>
<pre class="line before"><span class="ws">            </span>ctx.auto_pop(error)</pre>
<pre class="line before"><span class="ws"></span> </pre>
<pre class="line before"><span class="ws">    </span>def __call__(self, environ, start_response):</pre>
<pre class="line before"><span class="ws">        </span>&quot;&quot;&quot;Shortcut for :attr:`wsgi_app`.&quot;&quot;&quot;</pre>
<pre class="line current"><span class="ws">        </span>return self.wsgi_app(environ, start_response)</pre>
<pre class="line after"><span class="ws"></span> </pre>
<pre class="line after"><span class="ws">    </span>def __repr__(self):</pre>
<pre class="line after"><span class="ws">        </span>return '&lt;%s %r&gt;' % (</pre>
<pre class="line after"><span class="ws">            </span>self.__class__.__name__,</pre>
<pre class="line after"><span class="ws">            </span>self.name,</pre></div>
</div>

<li><div class="frame" id="frame-140000030783864">
  <h4>File <cite class="filename">"/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/app.py"</cite>,
      line <em class="line">1985</em>,
      in <code class="function">wsgi_app</code></h4>
  <div class="source"><pre class="line before"><span class="ws">        </span>try:</pre>
<pre class="line before"><span class="ws">            </span>try:</pre>
<pre class="line before"><span class="ws">                </span>response = self.full_dispatch_request()</pre>
<pre class="line before"><span class="ws">            </span>except Exception as e:</pre>
<pre class="line before"><span class="ws">                </span>error = e</pre>
<pre class="line current"><span class="ws">                </span>response = self.handle_exception(e)</pre>
<pre class="line after"><span class="ws">            </span>except:</pre>
<pre class="line after"><span class="ws">                </span>error = sys.exc_info()[1]</pre>
<pre class="line after"><span class="ws">                </span>raise</pre>
<pre class="line after"><span class="ws">            </span>return response(environ, start_response)</pre>
<pre class="line after"><span class="ws">        </span>finally:</pre></div>
</div>

<li><div class="frame" id="frame-140000030783920">
  <h4>File <cite class="filename">"/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/app.py"</cite>,
      line <em class="line">1540</em>,
      in <code class="function">handle_exception</code></h4>
  <div class="source"><pre class="line before"><span class="ws">            </span># if we want to repropagate the exception, we can attempt to</pre>
<pre class="line before"><span class="ws">            </span># raise it with the whole traceback in case we can do that</pre>
<pre class="line before"><span class="ws">            </span># (the function was actually called from the except part)</pre>
<pre class="line before"><span class="ws">            </span># otherwise, we just raise the error again</pre>
<pre class="line before"><span class="ws">            </span>if exc_value is e:</pre>
<pre class="line current"><span class="ws">                </span>reraise(exc_type, exc_value, tb)</pre>
<pre class="line after"><span class="ws">            </span>else:</pre>
<pre class="line after"><span class="ws">                </span>raise e</pre>
<pre class="line after"><span class="ws"></span> </pre>
<pre class="line after"><span class="ws">        </span>self.log_exception((exc_type, exc_value, tb))</pre>
<pre class="line after"><span class="ws">        </span>if handler is None:</pre></div>
</div>

<li><div class="frame" id="frame-140000030783976">
  <h4>File <cite class="filename">"/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/_compat.py"</cite>,
      line <em class="line">33</em>,
      in <code class="function">reraise</code></h4>
  <div class="source"><pre class="line before"><span class="ws">    </span>from io import StringIO</pre>
<pre class="line before"><span class="ws"></span> </pre>
<pre class="line before"><span class="ws">    </span>def reraise(tp, value, tb=None):</pre>
<pre class="line before"><span class="ws">        </span>if value.__traceback__ is not tb:</pre>
<pre class="line before"><span class="ws">            </span>raise value.with_traceback(tb)</pre>
<pre class="line current"><span class="ws">        </span>raise value</pre>
<pre class="line after"><span class="ws"></span> </pre>
<pre class="line after"><span class="ws">    </span>implements_to_string = _identity</pre>
<pre class="line after"><span class="ws"></span> </pre>
<pre class="line after"><span class="ws"></span>else:</pre>
<pre class="line after"><span class="ws">    </span>text_type = unicode</pre></div>
</div>

<li><div class="frame" id="frame-140000030783640">
  <h4>File <cite class="filename">"/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/app.py"</cite>,
      line <em class="line">1982</em>,
      in <code class="function">wsgi_app</code></h4>
  <div class="source"><pre class="line before"><span class="ws">        </span>ctx = self.request_context(environ)</pre>
<pre class="line before"><span class="ws">        </span>ctx.push()</pre>
<pre class="line before"><span class="ws">        </span>error = None</pre>
<pre class="line before"><span class="ws">        </span>try:</pre>
<pre class="line before"><span class="ws">            </span>try:</pre>
<pre class="line current"><span class="ws">                </span>response = self.full_dispatch_request()</pre>
<pre class="line after"><span class="ws">            </span>except Exception as e:</pre>
<pre class="line after"><span class="ws">                </span>error = e</pre>
<pre class="line after"><span class="ws">                </span>response = self.handle_exception(e)</pre>
<pre class="line after"><span class="ws">            </span>except:</pre>
<pre class="line after"><span class="ws">                </span>error = sys.exc_info()[1]</pre></div>
</div>

<li><div class="frame" id="frame-140000030784088">
  <h4>File <cite class="filename">"/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/app.py"</cite>,
      line <em class="line">1614</em>,
      in <code class="function">full_dispatch_request</code></h4>
  <div class="source"><pre class="line before"><span class="ws">            </span>request_started.send(self)</pre>
<pre class="line before"><span class="ws">            </span>rv = self.preprocess_request()</pre>
<pre class="line before"><span class="ws">            </span>if rv is None:</pre>
<pre class="line before"><span class="ws">                </span>rv = self.dispatch_request()</pre>
<pre class="line before"><span class="ws">        </span>except Exception as e:</pre>
<pre class="line current"><span class="ws">            </span>rv = self.handle_user_exception(e)</pre>
<pre class="line after"><span class="ws">        </span>return self.finalize_request(rv)</pre>
<pre class="line after"><span class="ws"></span> </pre>
<pre class="line after"><span class="ws">    </span>def finalize_request(self, rv, from_error_handler=False):</pre>
<pre class="line after"><span class="ws">        </span>&quot;&quot;&quot;Given the return value from a view function this finalizes</pre>
<pre class="line after"><span class="ws">        </span>the request by converting it into a response and invoking the</pre></div>
</div>

<li><div class="frame" id="frame-140000030784144">
  <h4>File <cite class="filename">"/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/app.py"</cite>,
      line <em class="line">1517</em>,
      in <code class="function">handle_user_exception</code></h4>
  <div class="source"><pre class="line before"><span class="ws">            </span>return self.handle_http_exception(e)</pre>
<pre class="line before"><span class="ws"></span> </pre>
<pre class="line before"><span class="ws">        </span>handler = self._find_error_handler(e)</pre>
<pre class="line before"><span class="ws"></span> </pre>
<pre class="line before"><span class="ws">        </span>if handler is None:</pre>
<pre class="line current"><span class="ws">            </span>reraise(exc_type, exc_value, tb)</pre>
<pre class="line after"><span class="ws">        </span>return handler(e)</pre>
<pre class="line after"><span class="ws"></span> </pre>
<pre class="line after"><span class="ws">    </span>def handle_exception(self, e):</pre>
<pre class="line after"><span class="ws">        </span>&quot;&quot;&quot;Default exception handling that kicks in when an exception</pre>
<pre class="line after"><span class="ws">        </span>occurs that is not caught.  In debug mode the exception will</pre></div>
</div>

<li><div class="frame" id="frame-140000030784200">
  <h4>File <cite class="filename">"/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/_compat.py"</cite>,
      line <em class="line">33</em>,
      in <code class="function">reraise</code></h4>
  <div class="source"><pre class="line before"><span class="ws">    </span>from io import StringIO</pre>
<pre class="line before"><span class="ws"></span> </pre>
<pre class="line before"><span class="ws">    </span>def reraise(tp, value, tb=None):</pre>
<pre class="line before"><span class="ws">        </span>if value.__traceback__ is not tb:</pre>
<pre class="line before"><span class="ws">            </span>raise value.with_traceback(tb)</pre>
<pre class="line current"><span class="ws">        </span>raise value</pre>
<pre class="line after"><span class="ws"></span> </pre>
<pre class="line after"><span class="ws">    </span>implements_to_string = _identity</pre>
<pre class="line after"><span class="ws"></span> </pre>
<pre class="line after"><span class="ws"></span>else:</pre>
<pre class="line after"><span class="ws">    </span>text_type = unicode</pre></div>
</div>

<li><div class="frame" id="frame-140000030783696">
  <h4>File <cite class="filename">"/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/app.py"</cite>,
      line <em class="line">1612</em>,
      in <code class="function">full_dispatch_request</code></h4>
  <div class="source"><pre class="line before"><span class="ws">        </span>self.try_trigger_before_first_request_functions()</pre>
<pre class="line before"><span class="ws">        </span>try:</pre>
<pre class="line before"><span class="ws">            </span>request_started.send(self)</pre>
<pre class="line before"><span class="ws">            </span>rv = self.preprocess_request()</pre>
<pre class="line before"><span class="ws">            </span>if rv is None:</pre>
<pre class="line current"><span class="ws">                </span>rv = self.dispatch_request()</pre>
<pre class="line after"><span class="ws">        </span>except Exception as e:</pre>
<pre class="line after"><span class="ws">            </span>rv = self.handle_user_exception(e)</pre>
<pre class="line after"><span class="ws">        </span>return self.finalize_request(rv)</pre>
<pre class="line after"><span class="ws"></span> </pre>
<pre class="line after"><span class="ws">    </span>def finalize_request(self, rv, from_error_handler=False):</pre></div>
</div>

<li><div class="frame" id="frame-140000030784312">
  <h4>File <cite class="filename">"/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/app.py"</cite>,
      line <em class="line">1598</em>,
      in <code class="function">dispatch_request</code></h4>
  <div class="source"><pre class="line before"><span class="ws">        </span># request came with the OPTIONS method, reply automatically</pre>
<pre class="line before"><span class="ws">        </span>if getattr(rule, 'provide_automatic_options', False) \</pre>
<pre class="line before"><span class="ws">           </span>and req.method == 'OPTIONS':</pre>
<pre class="line before"><span class="ws">            </span>return self.make_default_options_response()</pre>
<pre class="line before"><span class="ws">        </span># otherwise dispatch to the handler for that endpoint</pre>
<pre class="line current"><span class="ws">        </span>return self.view_functions[rule.endpoint](**req.view_args)</pre>
<pre class="line after"><span class="ws"></span> </pre>
<pre class="line after"><span class="ws">    </span>def full_dispatch_request(self):</pre>
<pre class="line after"><span class="ws">        </span>&quot;&quot;&quot;Dispatches the request and on top of that performs request</pre>
<pre class="line after"><span class="ws">        </span>pre and postprocessing as well as HTTP exception catching and</pre>
<pre class="line after"><span class="ws">        </span>error handling.</pre></div>
</div>

<li><div class="frame" id="frame-140000030784368">
  <h4>File <cite class="filename">"/home/horgix/work/willish/willish.py"</cite>,
      line <em class="line">28</em>,
      in <code class="function">get_wish</code></h4>
  <div class="source"><pre class="line before"><span class="ws"></span>def get_wishes():</pre>
<pre class="line before"><span class="ws">    </span>return jsonify({'wishes': wishes})</pre>
<pre class="line before"><span class="ws"></span> </pre>
<pre class="line before"><span class="ws"></span>@app.route('/wishes/&lt;int:wish_id&gt;', methods=['GET'])</pre>
<pre class="line before"><span class="ws"></span>def get_wish(wish_id):</pre>
<pre class="line current"><span class="ws">    </span>return jsonify({'wish': wishes[wish_id]})</pre>
<pre class="line after"><span class="ws"></span> </pre>
<pre class="line after"><span class="ws"></span>@app.route('/')</pre>
<pre class="line after"><span class="ws"></span>def index():</pre>
<pre class="line after"><span class="ws">    </span>return &quot;Hello, World!&quot;</pre>
<pre class="line after"><span class="ws"></span> </pre></div>
</div>
</ul>
  <blockquote>IndexError: list index out of range</blockquote>
</div>

<div class="plain">
  <form action="/?__debugger__=yes&amp;cmd=paste" method="post">
    <p>
      <input type="hidden" name="language" value="pytb">
      This is the Copy/Paste friendly version of the traceback.  <span
      class="pastemessage">You can also paste this traceback into
      a <a href="https://gist.github.com/">gist</a>:
      <input type="submit" value="create paste"></span>
    </p>
    <textarea cols="50" rows="10" name="code" readonly>Traceback (most recent call last):
  File &quot;/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/app.py&quot;, line 1997, in __call__
    return self.wsgi_app(environ, start_response)
  File &quot;/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/app.py&quot;, line 1985, in wsgi_app
    response = self.handle_exception(e)
  File &quot;/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/app.py&quot;, line 1540, in handle_exception
    reraise(exc_type, exc_value, tb)
  File &quot;/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/_compat.py&quot;, line 33, in reraise
    raise value
  File &quot;/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/app.py&quot;, line 1982, in wsgi_app
    response = self.full_dispatch_request()
  File &quot;/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/app.py&quot;, line 1614, in full_dispatch_request
    rv = self.handle_user_exception(e)
  File &quot;/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/app.py&quot;, line 1517, in handle_user_exception
    reraise(exc_type, exc_value, tb)
  File &quot;/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/_compat.py&quot;, line 33, in reraise
    raise value
  File &quot;/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/app.py&quot;, line 1612, in full_dispatch_request
    rv = self.dispatch_request()
  File &quot;/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/app.py&quot;, line 1598, in dispatch_request
    return self.view_functions[rule.endpoint](**req.view_args)
  File &quot;/home/horgix/work/willish/willish.py&quot;, line 28, in get_wish
    return jsonify({'wish': wishes[wish_id]})
IndexError: list index out of range</textarea>
  </form>
</div>
<div class="explanation">
  The debugger caught an exception in your WSGI application.  You can now
  look at the traceback which led to the error.  <span class="nojavascript">
  If you enable JavaScript you can also use additional features such as code
  execution (if the evalex feature is enabled), automatic pasting of the
  exceptions and much more.</span>
</div>
      <div class="footer">
        Brought to you by <strong class="arthur">DON'T PANIC</strong>, your
        friendly Werkzeug powered traceback interpreter.
      </div>
    </div>

    <div class="pin-prompt">
      <div class="inner">
        <h3>Console Locked</h3>
        <p>
          The console is locked and needs to be unlocked by entering the PIN.
          You can find the PIN printed out on the standard output of your
          shell that runs the server.
        <form>
          <p>PIN:
            <input type=text name=pin size=14>
            <input type=submit name=btn value="Confirm Pin">
        </form>
      </div>
    </div>
  </body>
</html>

<!--

Traceback (most recent call last):
  File "/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/app.py", line 1997, in __call__
    return self.wsgi_app(environ, start_response)
  File "/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/app.py", line 1985, in wsgi_app
    response = self.handle_exception(e)
  File "/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/app.py", line 1540, in handle_exception
    reraise(exc_type, exc_value, tb)
  File "/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/_compat.py", line 33, in reraise
    raise value
  File "/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/app.py", line 1982, in wsgi_app
    response = self.full_dispatch_request()
  File "/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/app.py", line 1614, in full_dispatch_request
    rv = self.handle_user_exception(e)
  File "/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/app.py", line 1517, in handle_user_exception
    reraise(exc_type, exc_value, tb)
  File "/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/_compat.py", line 33, in reraise
    raise value
  File "/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/app.py", line 1612, in full_dispatch_request
    rv = self.dispatch_request()
  File "/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/app.py", line 1598, in dispatch_request
    return self.view_functions[rule.endpoint](**req.view_args)
  File "/home/horgix/work/willish/willish.py", line 28, in get_wish
    return jsonify({'wish': wishes[wish_id]})
IndexError: list index out of range

-->
```

IMAGE1

and on server side :

```
└#master> ./willish.py                                                                         [148]~15:57 Wed,May 03┘
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 191-272-850
127.0.0.1 - - [03/May/2017 15:57:24] "GET /wishes/1 HTTP/1.1" 200 -
127.0.0.1 - - [03/May/2017 15:57:44] "GET /wishes/2 HTTP/1.1" 500 -
Traceback (most recent call last):
  File "/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/app.py", line 1997, in __call__
    return self.wsgi_app(environ, start_response)
  File "/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/app.py", line 1985, in wsgi_app
    response = self.handle_exception(e)
  File "/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/app.py", line 1540, in handle_exception
    reraise(exc_type, exc_value, tb)
  File "/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/_compat.py", line 33, in reraise
    raise value
  File "/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/app.py", line 1982, in wsgi_app
    response = self.full_dispatch_request()
  File "/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/app.py", line 1614, in full_dispatch_request
    rv = self.handle_user_exception(e)
  File "/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/app.py", line 1517, in handle_user_exception
    reraise(exc_type, exc_value, tb)
  File "/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/_compat.py", line 33, in reraise
    raise value
  File "/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/app.py", line 1612, in full_dispatch_request
    rv = self.dispatch_request()
  File "/home/horgix/work/willish/venv/lib/python3.6/site-packages/flask/app.py", line 1598, in dispatch_request
    return self.view_functions[rule.endpoint](**req.view_args)
  File "/home/horgix/work/willish/willish.py", line 28, in get_wish
    return jsonify({'wish': wishes[wish_id]})
IndexError: list index out of range
```

But if we change 

```
if __name__ == '__main__':
    app.run(debug=True)
```

to

```
if __name__ == '__main__':
    app.run(debug=False)
```

We just get the bare Error :

```
└> curl -i localhost:5000/wishes/2                                                             [148]~15:59 Wed,May 03┘
HTTP/1.0 500 INTERNAL SERVER ERROR
Content-Type: text/html
Content-Length: 291
Server: Werkzeug/0.12.1 Python/3.6.0
Date: Wed, 03 May 2017 13:59:28 GMT

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
<title>500 Internal Server Error</title>
<h1>Internal Server Error</h1>
<p>The server encountered an internal error and was unable to complete your request.  Either the server is overloaded or there is an error in the application.</p>
```

One more reason to tune errors sent by Flask when working on an API!



Why did it fail?
Well, we aren't checking that the ID is valid.


# Adding error handling on this

```
@app.route('/wishes/<int:wish_id>', methods=['GET'])
def get_wish(wish_id):
    try:
        return jsonify({'wish': wishes[wish_id]})
    except IndexError:
        return jsonify({'error': 'index not found'})
```

```
└#master> ./willish.py

 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 191-272-850
127.0.0.1 - - [03/May/2017 16:03:13] "GET /wishes/2 HTTP/1.1" 200 -
```

And it's working :

```
└> curl -i localhost:5000/wishes/2
HTTP/1.0 200 OK
Content-Type: application/json
Content-Length: 33
Server: Werkzeug/0.12.1 Python/3.6.0
Date: Wed, 03 May 2017 14:03:13 GMT

{
  "error": "index not found"
}
```

But it's not really HTTP compliant... 200 code for an error...

# Handling error better

Flask to the rescue! `from flask import abort`

Change

```
return jsonify({'error': 'index not found'})
```

into

```
abort(404)
```

and you're done :)

```
└#master> ./willish.py

 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 191-272-850
127.0.0.1 - - [03/May/2017 16:16:51] "GET /wishes/2 HTTP/1.1" 404 -
```

```
└> curl -i localhost:5000/wishes/2                                                                   16:03 Wed,May 03┘
HTTP/1.0 404 NOT FOUND
Content-Type: text/html
Content-Length: 233
Server: Werkzeug/0.12.1 Python/3.6.0
Date: Wed, 03 May 2017 14:16:51 GMT

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
<title>404 Not Found</title>
<h1>Not Found</h1>
<p>The requested URL was not found on the server.  If you entered the URL manually please check your spelling and try again.</p>
```

Yay, 404

But sadly, it's still returning HTML, which is bad for a REST API.

# JSON 404

Thanks to flask, we can override the error handler that gets called by
`abort()` :)

```
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'})
```

which seems to be sending json:

```
└> curl -i localhost:5000/wishes/2
HTTP/1.0 200 OK
Content-Type: application/json
Content-Length: 27
Server: Werkzeug/0.12.1 Python/3.6.0
Date: Wed, 03 May 2017 14:39:25 GMT

{
  "error": "Not found"
}
```

But we lost the 404 status again :(
How can we send it?

We'll be using `make_response` in our error handler as suggested in
<http://flask.pocoo.org/docs/0.12/quickstart/#about-responses>

Documentation:
<http://flask.pocoo.org/docs/0.12/api/#flask.Flask.make_response>



```
@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)
```

and adding the `make_response` to the `from flask import ...` stuff


and it's working fine :

```
└> curl -i localhost:5000/wishes/2
HTTP/1.0 404 NOT FOUND
Content-Type: application/json
Content-Length: 27
Server: Werkzeug/0.12.1 Python/3.6.0
Date: Wed, 03 May 2017 15:42:33 GMT

{
  "error": "Not found"
}
```

Note the HTTP status code, the content type and the body. No longer 200, no
longer HTML, win !

For more informations on error handling and JSON outputs:

- <http://flask.pocoo.org/docs/0.12/patterns/apierrors/>
- <http://flask.pocoo.org/snippets/83/>

We'll come back on that later I guess.





# Misc

What about defining some `status.HTTP_NOT_FOUND` to 404 to ensure we get type
right ?
