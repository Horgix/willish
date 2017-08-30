Warning, this is being developed, not even alpha yet.

http://flask.pocoo.org/docs/0.12/patterns/errorpages/
http://flask.pocoo.org/docs/0.12/errorhandling/
http://flask.pocoo.org/snippets/83/

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

- `id`: Numeric. Unique identifier. Generated.
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

Fine ! (At least we believe it. I intentionally introduced a bug to be fixed
later and which will give us a reason for writing good tests)
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

# POST

This will be a long part, we're entering the really useful part!

First we need to ask ourselves this question : what is mandatory in order to
create a wish ? Reminder, we handle the following attributes right now :

- id : this will be generated automatically so we'll not take it from POST
  request data
- name : having no name a link probably makes sense
- link : having a link but no name probably makes sense too
- acquired : we'll set it to False at creation time, this will not be taken
  either from POST request data. Would be non sense to add an item we already
  acquired to an

Sooo, at the end, we require either name or link, and we should fail if none of
them is in the request. For the rest/REST (what a joke.), it's up to us to
decide what we do with parameter we don't need, i.e. if a client send us a
"cake_taste" field or the "id" or "acquired" field which we'll not take into
account anyway. Should we send an error, forcing the client to send perfectly
conform requests ? Should we just ignore it ? I'm going for the ignore thing,
it will be way easier, but we'll have to document it with our API so people can
expect it.

## Implem

- add request to from flask import ...

Request doc : http://flask.pocoo.org/docs/0.12/api/#incoming-request-data

### First

Let's implement something really dumb: we'll just check that provided JSON is
valid before trying to do anything with the json data.

Flask provides the `is_json` field with following description
<http://flask.pocoo.org/docs/0.12/api/#flask.Request.is_json> :

> Indicates if this request is JSON or not. By default a request is considered
> to include JSON data if the mimetype is `application/json` or
> `application/*+json`.

```
@app.route('/wishes', methods=['POST'])
def add_wish():
    print(request.is_json)
    return jsonify({})
```

Let's see how it behaves :

```
└> curl -i -H "Content-Type: application/json" -X POST -d '{"name":"New keyboard"}' http://localhost:5000/wishes
HTTP/1.0 200 OK
Content-Type: application/json
Content-Length: 3
Server: Werkzeug/0.12.1 Python/3.6.0
Date: Thu, 04 May 2017 16:56:17 GMT

{}
```


```
└#master> ./willish.py
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 191-272-850
True
127.0.0.1 - - [04/May/2017 18:56:17] "POST /wishes HTTP/1.1" 200 -
```

Yay, fine! `is_json` returns True.

However, I'm a bit worried about the "content-type" based check. What if
someone sends us a request with `application/json` `Content-Type` but without a
real JSON object in data ? Or an invalid one? Let's try!

```
└> curl -i -H "Content-Type: application/json" -X POST -d '{"name":"New keyboard' http://localhost:5000/wishes
HTTP/1.0 200 OK
Content-Type: application/json
Content-Length: 3
Server: Werkzeug/0.12.1 Python/3.6.0
Date: Thu, 04 May 2017 16:54:29 GMT

{}
```

```
└#master> ./willish.py
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 191-272-850
True
127.0.0.1 - - [04/May/2017 18:58:04] "POST /wishes HTTP/1.1" 200 -
```

Well, `True` too :(

But there is another field, `json`, that can saves us !
<http://flask.pocoo.org/docs/0.12/api/#flask.Request.json>


> If the mimetype is application/json this will contain the parsed JSON data. Otherwise this will be None.
>
> The get_json() method should be used instead.

Ok, we'll use `get_json()` to access fields, but  looks like we can use `json`
to assert for parseable json.

Let's verify that.

```
@app.route('/wishes', methods=['POST'])
def add_wish():
    print(request.json)
    return jsonify({})
```

```
└> curl -i -H "Content-Type: application/json" -X POST -d '{"name":"New keyboard"}' http://localhost:5000/wishes
HTTP/1.0 200 OK
Content-Type: application/json
Content-Length: 3
Server: Werkzeug/0.12.1 Python/3.6.0
Date: Thu, 04 May 2017 17:02:42 GMT

{}
```

```
└#master> ./willish.py
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 191-272-850
{'name': 'New keyboard'}
127.0.0.1 - - [04/May/2017 19:02:42] "POST /wishes HTTP/1.1" 200 -
```

Ok so valid JSON works as expected.
Let's try invalid JSON

```
└> curl -i -H "Content-Type: application/json" -X POST -d '{"name":"New keyboard' http://localhost:5000/wishes
HTTP/1.0 400 BAD REQUEST
Content-Type: text/html
Content-Length: 203
Server: Werkzeug/0.12.1 Python/3.6.0
Date: Thu, 04 May 2017 17:03:34 GMT

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
<title>400 Bad Request</title>
<h1>Bad Request</h1>
<p>Failed to decode JSON object: Unterminated string starting at: line 1 column 9 (char 8)</p>
```

```
└#master> ./willish.py
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 191-272-850
127.0.0.1 - - [04/May/2017 19:03:34] "POST /wishes HTTP/1.1" 400 -
```

Nice!
However, once more, we're getting HTML body, just like for the 404 stuff. You
know how this ends up; let's override the handler for the 400 error !

http://flask.pocoo.org/docs/0.12/errorhandling/#registering


```
@app.errorhandler(400)
def bad_request(error):
    return make_response(jsonify({'error': 'Bad Request'}), 400)
```

```
└> curl -i -H "Content-Type: application/json" -X POST -d '{"name":"New keyboard' http://localhost:5000/wishes
HTTP/1.0 400 BAD REQUEST
Content-Type: application/json
Content-Length: 29
Server: Werkzeug/0.12.1 Python/3.6.0
Date: Thu, 04 May 2017 17:11:09 GMT

{
  "error": "Bad Request"
}
```

```
└#master> ./willish.py
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 191-272-850
127.0.0.1 - - [04/May/2017 19:12:00] "POST /wishes HTTP/1.1" 400 -
```

It works... but we lost an information here. If you take a look at the HTML
precedently returned, you'll see `<p>Failed to decode JSON object: Unterminated
string starting at: line 1 column 9 (char 8)</p>`. This was returning us the
error details!

Wait. Maybe this is because we run the app with `app.run(debug=False)` ? Let's
try with `debug=True` and without our errorhandler.

```
└> curl -i -H "Content-Type: application/json" -X POST -d '{"name":"New keyboard' http://localhost:5000/wishes
HTTP/1.0 400 BAD REQUEST
Content-Type: text/html
Content-Length: 192
Server: Werkzeug/0.12.1 Python/3.6.0
Date: Thu, 04 May 2017 17:13:16 GMT

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
<title>400 Bad Request</title>
<h1>Bad Request</h1>
<p>The browser (or proxy) sent a request that this server could not understand.</p>
```

```
└#master> ./willish.py
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
127.0.0.1 - - [04/May/2017 19:14:28] "POST /wishes HTTP/1.1" 400 -

```

Ok so the error is handled diferently if the debug mode is enabled or not
(makes sense).

The difference can be found in the `flask/wrappers.py` file, line 167 :

```python
    def on_json_loading_failed(self, e):
        """Called if decoding of the JSON data failed.  The return value of
        this method is used by :meth:`get_json` when an error occurred.  The
        default implementation just raises a :class:`BadRequest` exception.

        .. versionchanged:: 0.10
           Removed buggy previous behavior of generating a random JSON
           response.  If you want that behavior back you can trivially
           add it by subclassing.

        .. versionadded:: 0.8
        """
        ctx = _request_ctx_stack.top
        if ctx is not None and ctx.app.config.get('DEBUG', False):
            raise BadRequest('Failed to decode JSON object: {0}'.format(e))
        raise BadRequest()
```

I actually have to thank JetBrain's PyCharm for finding this, the debugger with
step-by-step run was immensely useful

Sooo, the BadRequest returned is directly modified when raised according to the
debug mode. So we actually will not to have to handle that by ourselves, cool
:)
Let's see how it goes :

```python
@app.errorhandler(400)
def bad_request(error):
    return make_response(jsonify({'error': str(error)}), 400)
```

In `debug=False`:

```
└> curl -i -H "Content-Type: application/json" -X POST -d '{"name":"New keyboard' http://localhost:5000/wishes
HTTP/1.0 400 BAD REQUEST
Content-Type: application/json
Content-Length: 111
Server: Werkzeug/0.12.1 Python/3.6.0
Date: Thu, 04 May 2017 21:57:23 GMT

{
  "error": "400 Bad Request: The browser (or proxy) sent a request that this server could not understand."
}

```

In `debug=True`:

```
$ curl -i -H "Content-Type: application/json" -X POST -d '{"name":"New keyboard' http://localhost:5000/wishes
HTTP/1.0 400 BAD REQUEST
Content-Type: application/json
Content-Length: 122
Server: Werkzeug/0.12.1 Python/3.6.0
Date: Thu, 04 May 2017 21:57:32 GMT

{
  "error": "400 Bad Request: Failed to decode JSON object: Unterminated string starting at: line 1 column 9 (char 8)"
}
```

Exactly what we wanted!

- JSON `Content-Type`
- JSON body in answer
- Real error message, with details in debug mode

let's do the same for the 404 error and transform

```
@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)
```

in

```python
@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': str(error)}), 404)
```

So now insted of

```json
└> curl -i localhost:5000/wishes/4
HTTP/1.0 404 NOT FOUND
Content-Type: application/json
Content-Length: 27
Server: Werkzeug/0.12.1 Python/3.6.0
Date: Thu, 04 May 2017 22:02:00 GMT

{
  "error": "Not found"
}
```

we get :

```json
└> curl -i localhost:5000/wishes/4
HTTP/1.0 404 NOT FOUND
Content-Type: application/json
Content-Length: 154
Server: Werkzeug/0.12.1 Python/3.6.0
Date: Thu, 04 May 2017 22:03:43 GMT

{
  "error": "404 Not Found: The requested URL was not found on the server.  If you entered the URL manually please check your spelling and try again."
}
```

We'll take a look later at how we could generalize this error handling for JSON.

commit `2c588f1ce864e94ff393d9001d6808891f5f15f5` here

### Second

Well. At the beginning we wanted to implement the POST request and ended up
tuning errors. Let's get back to the POST itself.

After thinking about it, we'll need the JSON data anyway and we'll have to call
`get_json()` so let's subsitute `request.json` by `request.get_json()` right
away.
Reminder: we were just checking that JSON was parseable, but we also need to
assert that the `Content-Type` is `application/json`. If it's not, `get_json()`
will return None so let's check that:


With something like that:

```
@app.route('/wishes', methods=['POST'])
def add_wish():
    json = request.get_json()
    name = json['name']
    return jsonify({'name': name})
```

we end up with

```
└> curl -i -H "Content-Type: application/json" -X POST -d '{"name":"New keyboard"}' http://localhost:5000/wishes
HTTP/1.0 200 OK
Content-Type: application/json
Content-Length: 29
Server: Werkzeug/0.12.1 Python/3.6.0
Date: Fri, 05 May 2017 10:05:09 GMT

{
  "name": "New keyboard"
}
```

and in case of error in the JSON

```
└> curl -i -H "Content-Type: application/json" -X POST -d '{"name":"New keyboard' http://localhost:5000/wishes
HTTP/1.0 400 BAD REQUEST
Content-Type: application/json
Content-Length: 122
Server: Werkzeug/0.12.1 Python/3.6.0
Date: Fri, 05 May 2017 10:05:36 GMT

{
  "error": "400 Bad Request: Failed to decode JSON object: Unterminated string starting at: line 1 column 9 (char 8)"
}
```
Now let's check with a bad content-type:

```
└> curl -i -H "Content-Type: application/json2" -X POST -d '{"name":"New keyboard"}' http://localhost:5000/wishes
HTTP/1.0 500 INTERNAL SERVER ERROR
Content-Type: text/html; charset=utf-8
X-XSS-Protection: 0
Connection: close
Server: Werkzeug/0.12.1 Python/3.6.0
Date: Fri, 05 May 2017 10:06:17 GMT

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
[...]
```

```
/home/horgix/work/willish/venv/bin/python /home/horgix/work/willish/willish.py
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 191-272-850
127.0.0.1 - - [05/May/2017 12:06:17] "POST /wishes HTTP/1.1" 500 -
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
  File "/home/horgix/work/willish/willish.py", line 40, in add_wish
    name = json['name']
TypeError: 'NoneType' object is not subscriptable
```

Fail :( Let's handle when that `get_json()` returns `None`:

Add a check:

```
@app.route('/wishes', methods=['POST'])
def add_wish():
    json = request.get_json()
    name = json['name']
    if json is None:
        abort(400)
    return jsonify({'name': name})
```

```
└> curl -i -H "Content-Type: application/json2" -X POST -d '{"name":"New keyboard"}' http://localhost:5000/wishes
HTTP/1.0 400 BAD REQUEST
Content-Type: application/json
Content-Length: 111
Server: Werkzeug/0.12.1 Python/3.6.0
Date: Fri, 05 May 2017 10:07:57 GMT

{
  "error": "400 Bad Request: The browser (or proxy) sent a request that this server could not understand."
}
```

```
/home/horgix/work/willish/venv/bin/python /home/horgix/work/willish/willish.py
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 191-272-850
127.0.0.1 - - [05/May/2017 12:07:57] "POST /wishes HTTP/1.1" 400 -
```

Good !

Now we are properly handling:

- Invalid contenttype
- Invalid JSON
- Other benefits already listed above

### Third

Now let's ensure that the json contains either the name or the title
Now let's make sure we have `name` or `link` defined. Should be
straightforward. Before implementing it, I want to make a note in the HTTP code
that we have to return in case of error here. 

From <https://en.wikipedia.org/wiki/List_of_HTTP_status_codes> :
> 422 Unprocessable Entity (WebDAV; RFC 4918)
>     The request was well-formed but was unable to be followed due to semantic errors

Indeed, 400 Bad Request is fine for bad json, malformed stuff, etc. But for
well formatted requests but with bad data, the 422 fits better.

Let's implement the check.

```
@app.route('/wishes', methods=['POST'])
def add_wish():
    json = request.get_json()
    if json is None:
        abort(400)
    if 'name' not in json and 'link' not in json:
        abort(422)
    return jsonify({'name': 'placeholder'})
```

Of course, just like we did until now, we have to override the error handler
for 422 to make it send JSON :

```
@app.errorhandler(422)
def unprocessable_entity(error):
    return make_response(jsonify({'error': str(error)}), 422)
```

Let's test it:

```
└> curl -i -H "Content-Type: application/json" -X POST -d '{"name2":"New keyboard"}' http://localhost:5000/wishes
HTTP/1.0 422 UNPROCESSABLE ENTITY
Content-Type: application/json
Content-Length: 125
Server: Werkzeug/0.12.1 Python/3.6.0
Date: Fri, 05 May 2017 13:04:37 GMT

{
  "error": "422 Unprocessable Entity: The request was well-formed but was unable to be followed due to semantic errors."
}
```

```
127.0.0.1 - - [05/May/2017 15:04:37] "POST /wishes HTTP/1.1" 422 -
```

Nice!

Now we want to add the real wish in the list, and return it in the data and
with HTTP 201 that stands for "Resource created"

```
@app.route('/wishes', methods=['POST'])
def add_wish():
    json = request.get_json()
    if json is None:
        abort(400)
    if 'name' not in json and 'link' not in json:
        abort(422)
    new_wish = {
            'id': 42,
            'name': json.get('name'),
            'link': json.get('link'),
            'acquired': False
            }
    wishes.append(new_wish)
    return jsonify(new_wish), 201
```

Note a few things:

- We use '42' as a placeholder for the ID right now
- the `json.get('name')` and `json.get('link')` will return null if a the field
  is not present in the dict, which is fine
- We're setting acquired to False right away, as noted earlier
- We append it to the list of existing wishes before returning anything
- We are returning 201
- We are returning the object we just created

```
└> curl -i -H "Content-Type: application/json" -X POST -d '{"name":"New keyboard"}' http://localhost:5000/wishes
HTTP/1.0 201 CREATED
Content-Type: application/json
Content-Length: 81
Server: Werkzeug/0.12.1 Python/3.6.0
Date: Fri, 05 May 2017 13:24:14 GMT


{
  "acquired": false,
  "id": 42,
  "link": null,
  "name": "New keyboard"
}

```

Wow, it's working! And we should be able to get it by GETting /wishes :

```
└> curl -i http://localhost:5000/wishes
HTTP/1.0 200 OK
Content-Type: application/json
Content-Length: 464
Server: Werkzeug/0.12.1 Python/3.6.0
Date: Fri, 05 May 2017 13:24:27 GMT

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
    },
    {
      "acquired": false,
      "id": 42,
      "link": null,
      "name": "New keyboard"
    }
  ]
}
```

Yay, it works! However, note that there is absolutely no check Done on the ID
here and its just a placeholder, which allow stuff like that to happen (not
stopping  the server from the previous run):

```
└> curl -i -H "Content-Type: application/json" -X POST -d '{"link":"http://schwag.archlinux.ca/"}' http://localhost:5000/wishes
HTTP/1.0 201 CREATED
Content-Type: application/json
Content-Length: 96
Server: Werkzeug/0.12.1 Python/3.6.0
Date: Fri, 05 May 2017 13:30:52 GMT

{
  "acquired": false,
  "id": 42,
  "link": "http://schwag.archlinux.ca/",
  "name": null
}
```

```
└> curl -i http://localhost:5000/wishes
HTTP/1.0 200 OK
Content-Type: application/json
Content-Length: 586
Server: Werkzeug/0.12.1 Python/3.6.0
Date: Fri, 05 May 2017 13:30:54 GMT

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
    },
    {
      "acquired": false,
      "id": 42,
      "link": null,
      "name": "New keyboard"
    },
    {
      "acquired": false,
      "id": 42,
      "link": "http://schwag.archlinux.ca/",
      "name": null
    }
  ]
}
```

One good thing, one bad!

- Good : we just validated that we can also add tasks with only a link
- Bad : we just created two tasks with the same ID

Long story short, we'll have to handle the ID smartly. And this is not the kind
of things you want to do, we are here just because we're using a poor in memory
"database". In real world, the DB itself would handle that id generation and
uniqueness (and we'll come to this, don't worry).

We're going to do something dirty (sorryyy).

Add a global variable `max_id`:

```
max_id = 2
```

2 since we have 2 wishes in our base "database"

and then increment it and assign the new value to the new wish:

```
    max_id += 1
    new_id = max_id
    new_wish = {
            'id': max_id,
            'name': json.get('name'),
            'link': json.get('link'),
            'acquired': False
            }
```

This doesn't work :

```
127.0.0.1 - - [05/May/2017 15:37:53] "POST /wishes HTTP/1.1" 500 -
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
  File "/home/horgix/work/willish/willish.py", line 48, in add_wish
    max_id += 1
UnboundLocalError: local variable 'max_id' referenced before assignment
```

Here, it's more global python knowledge than anything else. Long story short
(agian), it's due to python scoping and to the fact that we're trying to
reassign a global variable so we need to specify it explicitely by flagging it
as `global`:

```
    global max_id
    max_id += 1
    new_id = max_id
    new_wish = {
            'id': max_id,
            'name': json.get('name'),
            'link': json.get('link'),
            'acquired': False
            }
```

Let's try this :

```
└> curl -i -H "Content-Type: application/json" -X POST -d '{"name":"New keyboard"}' http://localhost:5000/wishes
HTTP/1.0 201 CREATED
Content-Type: application/json
Content-Length: 80
Server: Werkzeug/0.12.1 Python/3.6.0
Date: Fri, 05 May 2017 13:41:52 GMT

{
  "acquired": false,
  "id": 3,
  "link": null,
  "name": "New keyboard"
}

└> curl -i -H "Content-Type: application/json" -X POST -d '{"link":"http://schwag.archlinux.ca/"}' http://localhost:5000/wishes
HTTP/1.0 201 CREATED
Content-Type: application/json
Content-Length: 95
Server: Werkzeug/0.12.1 Python/3.6.0
Date: Fri, 05 May 2017 13:41:55 GMT

{
  "acquired": false,
  "id": 4,
  "link": "http://schwag.archlinux.ca/",
  "name": null
}

└> curl -i http://localhost:5000/wishes
HTTP/1.0 200 OK
Content-Type: application/json
Content-Length: 584
Server: Werkzeug/0.12.1 Python/3.6.0
Date: Fri, 05 May 2017 13:41:59 GMT

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
    },
    {
      "acquired": false,
      "id": 3,
      "link": null,
      "name": "New keyboard"
    },
    {
      "acquired": false,
      "id": 4,
      "link": "http://schwag.archlinux.ca/",
      "name": null
    }
  ]
}
```

Yay,it works :)
We can't just take the greater ID and increment it, else in case of POST, then
DELETE, then POST, we could re-attribute  the same ID but to a different wish,
which wwould be a non-sense.

commit 32f988d16d0533f17149b1efb86742360ab75e33



We'll let the PUT for modification and DELETE for deletion on the side for now.
We already have some stuff to test, so let's go for testing !

Below are a few notes on ideas for later :

## Misc

- What about using/defining some `status.HTTP_NOT_FOUND` to 404 to ensure we
  get type right ?
- Initiated after this post : https://blog.miguelgrinberg.com/post/designing-a-restful-api-with-python-and-flask
- Add something about trailing slashes
- Flask capitalizes http status :(
- http://flask.pocoo.org/snippets/83/
- Should we send details of failure reason with error 400 ?
- 422 in case of unsupported contenttype ?
- Old ids reusability

## Tests ideas

- without trailing slash = trailing slash or redirect
- uneeded post params
- id and acquired params
- Add item with name only
- Add item with link only
- Add item with link and name
- Add, Remove, Add, check ID
- Content type
- JSON badly formatted


# Tests

Let's test!

After searching for a while, I found Chakram <http://dareid.github.io/chakram/>
:

From http://dareid.github.io/chakram/  :
> Chakram allows you to write clear and comprehensive tests,
> ensuring JSON REST endpoints work correctly as you develop and in the future

From https://github.com/dareid/chakram  :
> Chakram is an API testing framework designed to perform end to end tests on JSON REST endpoints.

This is exactly what we want!

yeah, JSON, I know, but I want to learn more about it, and it looks like this
does the job.

it's based on :

- http://mochajs.org/ , a test runner (it will run the tests and report them,
  and allow multiple test "executors" to be managed)
- http://chaijs.com/ , an assertien library which is the "executor" managed by
  mocha in context of chakram

## Beginning

let's create a directory "tests"

    npm install --save-dev chakram mocha  

```
└#master> npm list                                                                             [130]~16:28 Fri,May 05┘
/home/horgix/work/willish/tests
├─┬ chakram@1.5.0
│ ├─┬ chai@3.5.0
│ │ ├── assertion-error@1.0.2
│ │ ├─┬ deep-eql@0.1.3
│ │ │ └── type-detect@0.1.1
│ │ └── type-detect@1.0.0
│ ├── chai-as-promised@5.3.0
│ ├── chai-subset@1.5.0
│ ├── extend-object@1.0.0
│ ├── q@1.5.0
│ ├─┬ request@2.81.0
│ │ ├── aws-sign2@0.6.0
│ │ ├── aws4@1.6.0
│ │ ├── caseless@0.12.0
│ │ ├─┬ combined-stream@1.0.5
│ │ │ └── delayed-stream@1.0.0
│ │ ├── extend@3.0.1
│ │ ├── forever-agent@0.6.1
│ │ ├─┬ form-data@2.1.4
│ │ │ ├── asynckit@0.4.0
│ │ │ ├── combined-stream@1.0.5 deduped
│ │ │ └── mime-types@2.1.15 deduped
│ │ ├─┬ har-validator@4.2.1
│ │ │ ├─┬ ajv@4.11.8
│ │ │ │ ├── co@4.6.0
│ │ │ │ └─┬ json-stable-stringify@1.0.1
│ │ │ │   └── jsonify@0.0.0
│ │ │ └── har-schema@1.0.5
│ │ ├─┬ hawk@3.1.3
│ │ │ ├─┬ boom@2.10.1
│ │ │ │ └── hoek@2.16.3 deduped
│ │ │ ├─┬ cryptiles@2.0.5
│ │ │ │ └── boom@2.10.1 deduped
│ │ │ ├── hoek@2.16.3
│ │ │ └─┬ sntp@1.0.9
│ │ │   └── hoek@2.16.3 deduped
│ │ ├─┬ http-signature@1.1.1
│ │ │ ├── assert-plus@0.2.0
│ │ │ ├─┬ jsprim@1.4.0
│ │ │ │ ├── assert-plus@1.0.0
│ │ │ │ ├── extsprintf@1.0.2
│ │ │ │ ├── json-schema@0.2.3
│ │ │ │ └─┬ verror@1.3.6
│ │ │ │   └── extsprintf@1.0.2 deduped
│ │ │ └─┬ sshpk@1.13.0
│ │ │   ├── asn1@0.2.3
│ │ │   ├── assert-plus@1.0.0
│ │ │   ├─┬ bcrypt-pbkdf@1.0.1
│ │ │   │ └── tweetnacl@0.14.5 deduped
│ │ │   ├─┬ dashdash@1.14.1
│ │ │   │ └── assert-plus@1.0.0
│ │ │   ├─┬ ecc-jsbn@0.1.1
│ │ │   │ └── jsbn@0.1.1 deduped
│ │ │   ├─┬ getpass@0.1.7
│ │ │   │ └── assert-plus@1.0.0
│ │ │   ├─┬ jodid25519@1.0.2
│ │ │   │ └── jsbn@0.1.1 deduped
│ │ │   ├── jsbn@0.1.1
│ │ │   └── tweetnacl@0.14.5
│ │ ├── is-typedarray@1.0.0
│ │ ├── isstream@0.1.2
│ │ ├── json-stringify-safe@5.0.1
│ │ ├─┬ mime-types@2.1.15
│ │ │ └── mime-db@1.27.0
│ │ ├── oauth-sign@0.8.2
│ │ ├── performance-now@0.2.0
│ │ ├── qs@6.4.0
│ │ ├── safe-buffer@5.0.1
│ │ ├── stringstream@0.0.5
│ │ ├─┬ tough-cookie@2.3.2
│ │ │ └── punycode@1.4.1
│ │ ├─┬ tunnel-agent@0.6.0
│ │ │ └── safe-buffer@5.0.1 deduped
│ │ └── uuid@3.0.1
│ ├─┬ request-debug@0.2.0
│ │ └── stringify-clone@1.1.1
│ └── tv4@1.3.0
└─┬ mocha@3.3.0
  ├── browser-stdout@1.3.0
  ├─┬ commander@2.9.0
  │ └── graceful-readlink@1.0.1
  ├─┬ debug@2.6.0
  │ └── ms@0.7.2
  ├── diff@3.2.0
  ├── escape-string-regexp@1.0.5
  ├─┬ glob@7.1.1
  │ ├── fs.realpath@1.0.0
  │ ├─┬ inflight@1.0.6
  │ │ ├── once@1.4.0 deduped
  │ │ └── wrappy@1.0.2
  │ ├── inherits@2.0.3
  │ ├─┬ minimatch@3.0.3
  │ │ └─┬ brace-expansion@1.1.7
  │ │   ├── balanced-match@0.4.2
  │ │   └── concat-map@0.0.1
  │ ├─┬ once@1.4.0
  │ │ └── wrappy@1.0.2 deduped
  │ └── path-is-absolute@1.0.1
  ├── growl@1.9.2
  ├── json3@3.3.2
  ├─┬ lodash.create@3.1.1
  │ ├─┬ lodash._baseassign@3.2.0
  │ │ ├── lodash._basecopy@3.0.1
  │ │ └─┬ lodash.keys@3.1.2
  │ │   ├── lodash._getnative@3.9.1
  │ │   ├── lodash.isarguments@3.1.0
  │ │   └── lodash.isarray@3.0.4
  │ ├── lodash._basecreate@3.0.3
  │ └── lodash._isiterateecall@3.0.9
  ├─┬ mkdirp@0.5.1
  │ └── minimist@0.0.8
  └─┬ supports-color@3.1.2
    └── has-flag@1.0.0
```

Wow, that's a lot.
But the npm install fails at the end with:

```
npm WARN enoent ENOENT: no such file or directory, open '/home/horgix/work/willish/tests/package.json'
npm WARN tests No description
npm WARN tests No repository field.
npm WARN tests No README data
npm WARN tests No license field.
```

Ok, looks like the package.json is quite similar to the requirements.txt for
python and that npm can directly append to it, but it doesn't exist yet

turns out you have to `npm init` it before, kind of like `virtualenv` creation;
makes sense.

```
└#master> npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
name: (tests) willish-test
version: (1.0.0)
description: Tests for Willish API
entry point: (test.js)
test command: (mocha)
git repository:
keywords:
author: Alexis "Horgix" Chotard
license: (ISC) Beerware
About to write to /home/horgix/work/willish/tests/package.json:

{
  "name": "willish-test",
  "version": "1.0.0",
  "description": "Tests for Willish API",
  "main": "test.js",
  "dependencies": {
    "chakram": "^1.5.0"
  },
  "devDependencies": {
    "mocha": "^3.3.0"
  },
  "scripts": {
    "test": "mocha"
  },
  "author": "Alexis \"Horgix\" Chotard",
  "license": "Beerware"
}


Is this ok? (yes) yes
```

Now if we reinstall chakram and mocha, it only warn like this :

```
npm WARN willish-test@1.0.0 No repository field.
npm WARN The package chakram is included as both a dev and production dependency.
```

which is fine for now.
The `package.json` now automatically contains this:

```
{
  "name": "willish-test",
  "version": "1.0.0",
  "description": "Tests for Willish API",
  "main": "test.js",
  "dependencies": {
    "chakram": "^1.5.0"
  },
  "devDependencies": {
    "chakram": "^1.5.0",
    "mocha": "^3.3.0"
  },
  "scripts": {
    "test": "mocha"
  },
  "author": "Alexis \"Horgix\" Chotard",
  "license": "Beerware"
}
```

d81c0233a97a365872942b18988e8def1053e383

Let's try the chakram example:

```
└#master> cat test.js
var chakram = require('chakram');

describe("Chakram", function() {
    it("should offer simple HTTP request capabilities", function () {
        return chakram.get("http://httpbin.org/get");
    });
});
```

```
└#master> mocha .
zsh: command not found: mocha
```

Well, contrary to virtualenv, nothing has been set in my PATH so of course it's
not going to find a new command. Thanks StackOverflow here ! 
http://stackoverflow.com/a/24497202/2781800

And you know what ? When we answered "mocha" to the "test command" in "npm
init", it already put it in the package.json for us! Let's call it

```
└#master> npm test

> willish-test@1.0.0 test /home/horgix/work/willish/tests
> mocha



  Chakram
    ✓ should offer simple HTTP request capabilities (322ms)


  1 passing (332ms)
```

nice.
Let's write out first test!

Chai offers 3 assertions type : expect, should, and assert
They cover the differences really well here : ADD LINK

tl;d
  - assert should be avoided if possible
  - should is just like expect but with a bit more restrictions

so, as in the example, we'll just use expect for now.

```
var chakram = require('chakram'),
    expect = chakram.expect;

describe("Chakram", function() {
    it("should answer with success to a basic GET on /wishes", function () {
      var response = chakram.get("http://127.0.0.1:5000/wishes");
      expect(response).to.have.status(200);
      return chakram.wait();
    });
});
```

- Do not forget to declare `expect`
- We are just querying our test application directly on `127.0.0.1`, port
  `5000`
- We are asserting that the status code is 200, which is OK

```
> npm test

> willish-test@1.0.0 test /home/horgix/work/willish/tests
> mocha



  Chakram
    ✓ should answer with success to a basic GET on /wishes


  1 passing (46ms)
```

So it's succeeding!

Let's add a check to ensure the header Content-Type is here

```
var chakram = require("chakram"),
    expect = chakram.expect;

describe("Chakram", function() {
    it("should answer with success to a basic GET on /wishes", function () {
      var response = chakram.get("http://127.0.0.1:5000/wishes");
      expect(response).to.have.status(200);
      expect(response).to.have.header("Content-Type")
      return chakram.wait();
    });
});
```

```
> npm test

 willish-test@1.0.0 test /home/horgix/work/willish/tests
 mocha



 Chakram
   ✓ should answer with success to a basic GET on /wishes (40ms)


 1 passing (49ms)
```

Nice. However, something bothers me: if something is going to fail, I'll know
it one fail after the other

for example, let's update the test to this:

```
var chakram = require("chakram"),
    expect = chakram.expect;

describe("Chakram", function() {
    it("should answer with success to a basic GET on /wishes", function () {
      var response = chakram.get("http://127.0.0.1:5000/wishes");
      expect(response).to.have.status(500);
      expect(response).to.have.header("Content-Type-Wrong-Header")
      return chakram.wait();
    });
});
```

notice the 500 and Content-Type-Wrong-Header. Both checks will fail

```
└#master> npm test

> willish-test@1.0.0 test /home/horgix/work/willish/tests
> mocha



  Chakram
    1) should answer with success to a basic GET on /wishes


  0 passing (48ms)
  1 failing

  1) Chakram should answer with success to a basic GET on /wishes:
     AssertionError: expected status code 200 to equal 500




npm ERR! Test failed.  See above for more details.
```

and yet we are only getting the information that the status code is wrong, not
the header. It's really oriented business tests more than sort of unit tests.
But I want precise tests! let's try something.

```
var chakram = require("chakram"),
    expect = chakram.expect;

describe("GET /wishes", function() {
    var apiResponse = chakram.get("http://127.0.0.1:5000/wishes");
    it("should return success status code", function () {
      return expect(apiResponse).to.have.status(200);
    });
    it("should have correct 'Content-Type' header", function () {
      return expect(apiResponse).to.have.header("Content-Type")
    });
});
```

```
> npm test

> willish-test@1.0.0 test /home/horgix/work/willish/tests
> mocha



  GET /wishes
    ✓ should return success status code
    ✓ should have correct 'Content-Type' header


  2 passing (44ms)
```

Nice. We do the request only once, but check the result in separate assertions,
giving us clear logs


However, the following style can be found on Chakram official example
(randomuser):


```
var chakram = require("chakram"),
    expect = chakram.expect;

describe("GET /wishes", function() {
    var apiResponse;

    before(function (){
      apiResponse = chakram.get("http://127.0.0.1:5000/wishes");
      return apiResponse;
    });

    it("should return success status code", function () {
      return expect(apiResponse).to.have.status(200);
    });
    it("should have correct 'Content-Type' header", function () {
      return expect(apiResponse).to.have.header("Content-Type")
    });
});
```

This "before" function is called once before the tests, not before each, so it
behaves exactly as what I did befre without this function. What's the
difference ? No idea right now. TODO : check

Here is were we are :

```
var chakram = require("chakram"),
    expect = chakram.expect;

describe("GET /wishes", function() {
    var apiResponse;

    before(function (){
      apiResponse = chakram.get("http://127.0.0.1:5000/wishes");
      return apiResponse;
    });

    it("should have success status code", function () {
      return expect(apiResponse).to.have.status(200);
    });
    it("should have correct 'Content-Type' header", function () {
      return expect(apiResponse).to.have.header("Content-Type",
        "application/json")
    });
    it("should have 'Server' header", function () {
      return expect(apiResponse).to.have.header("Server");
    });
    it("should have 'Date' header", function () {
      return expect(apiResponse).to.have.header("Date");
    });
    it("should have 'Content-Length' header", function () {
      return expect(apiResponse).to.have.header("Content-Length");
    });
    // TODO : shouldn't leak too much server info
});
```


```
└#master> npm test

> willish-test@1.0.0 test /home/horgix/work/willish/tests
> mocha



  GET /wishes
    ✓ should have success status code
    ✓ should have correct 'Content-Type' header
    ✓ should have 'Server' header
    ✓ should have 'Date' header
    ✓ should have 'Content-Length' header


  5 passing (47ms)
```

note the 'before' part btw
Ok so we're checking header presence, and that the content-type is
application/json

commit 9b02264160426e13d1c9b713fd455e321b4e9bd5
Now let's check the JSON itself.
Take a look at JSON schema, link doc; etc

JSON schema:


https://spacetelescope.github.io/understanding-json-schema/reference/object.html#required
http://json-schema.org/examples.html

```
    it("should have valid JSON as answer", function () {
    return expect(apiResponse).to.have.schema({
      "type": "object",
      "required": ["wishes"],
      "properties": {
        "wishes": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "acquired": { "type": "boolean" },
              "id": { "type": "integer" },
              "link": { "type": "string" },
              "name": { "type": "string" }
            }
          }
        }
      }
    });
  });
});
```

Here we go. This should do the job. Note the "required" part!
TODO: we need to extend it later, after adding some wishes, to make sure they
appear in the list by imposing the wishes array length on the test.

We'll now add tests for the POST function.
The http://dareid.github.io/chakram/example/dweet/ example provides some POST
example.


Now we're onto something really intesting.
I added the following test:

```
describe("POST /wishes", function() {
  var apiResponse;

  before(function (){
    newWish = {
      name: "New Keyboard"
    };
    apiResponse = chakram.post("http://127.0.0.1:5000/wishes", newWish);
    return apiResponse;
  });

  it("should have 'Created' status code", function () {
    console.log(apiResponse)
    return expect(apiResponse).to.have.status(201);
  });
});
```

Simple enough uh?
Well... remember that we can omit name or link?
That's what we just did. And it works!

```
└#master> npm test

> willish-test@1.0.0 test /home/horgix/work/willish/tests
> mocha



  GET /wishes
    ✓ should have success status code
    ✓ should have correct 'Content-Type' header
    ✓ should have 'Server' header
    ✓ should have 'Date' header
    ✓ should have 'Content-Length' header
    ✓ should have valid JSON as answer

  POST /wishes
{ state: 'fulfilled',
  value:
   { error: null,
     response:
      IncomingMessage {
        _readableState: [Object],
        readable: false,
        domain: null,
        _events: [Object],
        _eventsCount: 4,
        _maxListeners: undefined,
        socket: [Object],
        connection: [Object],
        httpVersionMajor: 1,
        httpVersionMinor: 0,
        httpVersion: '1.0',
        complete: true,
        headers: [Object],
        rawHeaders: [Object],
        trailers: {},
        rawTrailers: [],
        upgrade: false,
        url: '',
        method: null,
        statusCode: 201,
        statusMessage: 'CREATED',
        client: [Object],
        _consuming: true,
        _dumped: false,
        req: [Object],
        request: [Object],
        toJSON: [Function: responseToJSON],
        caseless: [Object],
        read: [Function],
        body: [Object] },
     body: { acquired: false, id: 3, link: null, name: 'New Keyboard' },
     jar: RequestJar { _jar: [Object] },
     url: 'http://127.0.0.1:5000/wishes',
     responseTime: 4.134612 } }
    ✓ should have 'Created' status code


  7 passing (61ms)
```

So, where's the problem?
if we re-run exactly the same tests (the whole tests, GET /wishes + POST)... it
fails!

```
└#master> npm test                                                                                   19:53 Sat,May 13┘

> willish-test@1.0.0 test /home/horgix/work/willish/tests
> mocha



  GET /wishes
    ✓ should have success status code
    ✓ should have correct 'Content-Type' header
    ✓ should have 'Server' header
    ✓ should have 'Date' header
    ✓ should have 'Content-Length' header
    1) should have valid JSON as answer

  POST /wishes
{ state: 'fulfilled',
  value:
   { error: null,
     response:
      IncomingMessage {
        _readableState: [Object],
        readable: false,
        domain: null,
        _events: [Object],
        _eventsCount: 4,
        _maxListeners: undefined,
        socket: [Object],
        connection: [Object],
        httpVersionMajor: 1,
        httpVersionMinor: 0,
        httpVersion: '1.0',
        complete: true,
        headers: [Object],
        rawHeaders: [Object],
        trailers: {},
        rawTrailers: [],
        upgrade: false,
        url: '',
        method: null,
        statusCode: 201,
        statusMessage: 'CREATED',
        client: [Object],
        _consuming: true,
        _dumped: false,
        req: [Object],
        request: [Object],
        toJSON: [Function: responseToJSON],
        caseless: [Object],
        read: [Function],
        body: [Object] },
     body: { acquired: false, id: 4, link: null, name: 'New Keyboard' },
     jar: RequestJar { _jar: [Object] },
     url: 'http://127.0.0.1:5000/wishes',
     responseTime: 4.086063 } }
    ✓ should have 'Created' status code


  6 passing (60ms)
  1 failing

  1) GET /wishes should have valid JSON as answer:
     AssertionError: expected body to match JSON schema {
  "type": "object",
  "required": [
    "wishes"
  ],
  "properties": {
    "wishes": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "acquired": {
            "type": "boolean"
          },
          "id": {
            "type": "integer"
          },
          "link": {
            "type": "string"
          },
          "name": {
            "type": "string"
          }
        }
      }
    }
  }
}.
-----
 error: Invalid type: null (expected string).
 data path: /wishes/2/link.
 schema path: /properties/wishes/items/properties/link/type.




npm ERR! Test failed.  See above for more details.
```

The interesting part is this:

> 1) GET /wishes should have valid JSON as answer:
> data path: /wishes/2/link.
> error: Invalid type: null (expected string).

So the test on JSON schema is failing because `link` is null (we didn't specify
any in our POST, remember!), and we told the schema it need to be a string.
Wow, honnestly, tests are really powerful even when we're simply writing them!

Thanks StackOverflow again: <http://stackoverflow.com/questions/16241333/specify-a-value-can-be-a-string-or-null-with-json-schema#16241482>

If we change the previous test to:

```
  it("should have valid JSON as answer", function () {
    return expect(apiResponse).to.have.schema({
      "type": "object",
      "required": ["wishes"],
      "properties": {
        "wishes": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "acquired": { "type": "boolean" },
              "id": { "type": "integer" },
              "link": { "type": ["string","null"] },
              "name": { "type": ["string","null"] }
            }
          }
        }
      }
    });
  });
```

The test passes again, because we specified that link and name can be a string
OR null. Yet it doesn't ensure that we have one or the other; both shouldn't be
able to be null, and that makes up for another test that we'll see later.

Just to make sure, we're going to add "name" to the main test case and test
edge cases later. Add to this Header and JSON checking to check the "correct"
case fully.

let's also add strict checks on fields that we can predict

```
describe("Basic POST on /wishes", function() {
  var apiResponse;

  before(function (){
    newWish = {
      name: "New Keyboard",
      link: "http://www.thekeyboardwaffleiron.com/"
    };
    apiResponse = chakram.post("http://127.0.0.1:5000/wishes", newWish);
    return apiResponse;
  });

  it("should have status code 201", function () {
    return expect(apiResponse).to.have.status(201);
  });
  it("should have 'application/json' as Content-Type", function () {
    return expect(apiResponse).to.have.header("Content-Type",
      "application/json")
  });
  it("should have a 'Server' header", function () {
    return expect(apiResponse).to.have.header("Server");
  });
  it("should have a 'Date' header", function () {
    return expect(apiResponse).to.have.header("Date");
  });
  it("should have a 'Content-Length' header", function () {
    return expect(apiResponse).to.have.header("Content-Length");
  });
  it("should have valid JSON in body", function () {
    return expect(apiResponse).to.have.schema({
      "type": "object",
      "required": ["acquired", "id", "link", "name"],
      "properties": {
        "acquired": { "type": "boolean" },
        "id":       { "type": "integer" },
        "link":     { "type": ["string"] },
        "name":     { "type": ["string"] }
      }
    });
  });
  it("should have correct name", function () {
    return expect(apiResponse).to.have.json("name", "New Keyboard");
  });
  it("should have correct link", function () {
    return expect(apiResponse).to.have.json("link", "http://www.thekeyboardwaffleiron.com/");
  });
  it("should have a non-acquired status", function () {
    return expect(apiResponse).to.have.json("acquired", false);
  });
});
```

We're starting to have a really nice test suite (I renamed a few):

```
└#master> npm test

> willish-test@1.0.0 test /home/horgix/work/willish/tests
> mocha



  GET on /wishes
    ✓ should have status code 200
    ✓ should have 'application/json' as Content-Type
    ✓ should have 'Server' header
    ✓ should have 'Date' header
    ✓ should have 'Content-Length' header
    ✓ should have valid JSON in body

  Basic POST on /wishes
    ✓ should have status code 201
    ✓ should have 'application/json' as Content-Type
    ✓ should have a 'Server' header
    ✓ should have a 'Date' header
    ✓ should have a 'Content-Length' header
    ✓ should have valid JSON in body
    ✓ should have correct name
    ✓ should have correct link
    ✓ should have a non-acquired status


  15 passing (71ms)
```

let's now check for bad cases.
Let's start with the case were we provide neither name or link, which should
error with 422

```
describe(" POST on /wishes without name or link", function() {
  var apiResponse;

  before(function (){
    newWish = {};
    apiResponse = chakram.post("http://127.0.0.1:5000/wishes", newWish);
    return apiResponse;
  });

  it("should have status code 422", function () {
    return expect(apiResponse).to.have.status(422);
  });
  it("should have 'application/json' as Content-Type", function () {
    return expect(apiResponse).to.have.header("Content-Type",
      "application/json")
  });
  it("should have error declaration as JSON in body", function () {
    return expect(apiResponse).to.have.schema({
      "type": "object",
      "required": ["error"],
      "properties": {
        "error": { "type": "string" }
      }
    });
  });
});
```

And with the case were we do not send "application/json" as Content-Type, which
sould result in a 400 error

```
describe("POST on /wishes without 'application/json' Content-Type", function() {
  var apiResponse;

  before(function (){
    newWish = {
      name: "New Keyboard",
      link: "http://www.thekeyboardwaffleiron.com/"
    };
    apiResponse = chakram.post(
      "http://127.0.0.1:5000/wishes",
      newWish,
      { headers: {"Content-Type": "invalid/contenttype"}}
    );
    return apiResponse;
  });

  it("should have status code 400", function () {
    return expect(apiResponse).to.have.status(400);
  });
  it("should have 'application/json' as Content-Type", function () {
    return expect(apiResponse).to.have.header("Content-Type",
      "application/json")
  });
  it("should have error declaration as JSON in body", function () {
    return expect(apiResponse).to.have.schema({
      "type": "object",
      "required": ["error"],
      "properties": {
        "error": { "type": "string" }
      }
    });
  });
});
```

Nice! Our tests are starting to look good:

```
└#master> npm test

> willish-test@1.0.0 test /home/horgix/work/willish/tests
> mocha



  GET on /wishes
    ✓ should have status code 200
    ✓ should have 'application/json' as Content-Type
    ✓ should have 'Server' header
    ✓ should have 'Date' header
    ✓ should have 'Content-Length' header
    ✓ should have valid JSON in body

  Basic POST on /wishes
    ✓ should have status code 201
    ✓ should have 'application/json' as Content-Type
    ✓ should have a 'Server' header
    ✓ should have a 'Date' header
    ✓ should have a 'Content-Length' header
    ✓ should have valid JSON in body
    ✓ should have correct name
    ✓ should have correct link
    ✓ should have a non-acquired status

  POST on /wishes without name or link
    ✓ should have status code 422
    ✓ should have 'application/json' as Content-Type
    ✓ should have error declaration as JSON in body

  POST on /wishes without 'application/json' Content-Type
    ✓ should have status code 400
    ✓ should have 'application/json' as Content-Type
    ✓ should have error declaration as JSON in body


  21 passing (73ms)
```

commit 47a24a4c147abf9e3ca5efa3f82b510161badca7

As I went to implement the test of unparseable JSON, something interesting
happened:

```
describe("POST on /wishes with unparseable JSON", function() {
  var apiResponse;

  before(function (){
    // Note the missing closing curly bracket and the fact that it's a string
    newWish = '{ name: "New Keyboard", link: "http://www.thekeyboardwaffleiron.com/"';
    apiResponse = chakram.post(
      "http://127.0.0.1:5000/wishes",
      newWish
    );
    return apiResponse;
  });

  it("should have status code 400", function () {
    return expect(apiResponse).to.have.status(400);
  });
  it("should have 'application/json' as Content-Type", function () {
    return expect(apiResponse).to.have.header("Content-Type",
      "application/json")
  });
  it("should have error declaration as JSON in body", function () {
    return expect(apiResponse).to.have.schema({
      "type": "object",
      "required": ["error"],
      "properties": {
        "error": { "type": "string" }
      }
    });
  });
});
```

Make sure to note the "newWish" content : it's a string that is a JSON without
a closing curly bracket. Invalid and unparseable JSON!
Let's run it

```
  POST on /wishes with unparseable JSON
    1) should have status code 400
    2) should have 'application/json' as Content-Type
    3) should have error declaration as JSON in body

[...]

  1) POST on /wishes with unparseable JSON should have status code 400:
     AssertionError: expected status code 500 to equal 400


  2) POST on /wishes with unparseable JSON should have 'application/json' as Content-Type:
     AssertionError: expected header Content-Type with value text/html; charset=utf-8 to match application/json


  3) POST on /wishes with unparseable JSON should have error declaration as JSON in body:
     AssertionError: expected body to match JSON schema {
  "type": "object",
  "required": [
    "error"
  ],
  "properties": {
    "error": {
      "type": "string"
    }
  }
}.
-----
 error: Invalid type: string (expected object).
 data path: .
 schema path: /type.
```

Wow, 3 fails on 3 tests, that hurts!

1. We got a 500 error back instead of the expected 400
2. We got some content in text/html instead of application/json
3. We didn't get a JSON that matched what we wanted as a schema since, well,
   it's html.

If you analyze it a bit... we have a 500 error (1), which we didn't rewrite the
handler for yet, which generates the default error message in html (2) which
fails to match the JSON schema (3).

Why the hell do we have a 500 error?

The logs for the server are the following ones:

```
127.0.0.1 - - [16/May/2017 19:06:28] "POST /wishes HTTP/1.1" 500 -
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
  File "/home/horgix/work/willish/willish.py", line 54, in add_wish
    'name': json.get('name'),
AttributeError: 'str' object has no attribute 'get'
```

why the hell is it calling the json.get('name')? As a reminder, here's the code
atm:

```
@app.route('/wishes', methods=['POST'])
def add_wish():
    json = request.get_json()
    if json is None:
        abort(400)
    if 'name' not in json and 'link' not in json:
        abort(422)
    global max_id
    max_id += 1
    new_id = max_id
    new_wish = {
            'id': max_id,
            'name': json.get('name'),
            'link': json.get('link'),
            'acquired': False
            }
    wishes.append(new_wish)
    return jsonify(new_wish), 201
```

We should never reach the part where json.get('name') gets called, it should
exit straight away on this:

```
    json = request.get_json()
    if json is None:
        abort(400)
```

But it doesn't. if we add a `print(json)` just before the condition it shows...

```
{ name: "New Keyboard", link: "http://www.thekeyboardwaffleiron.com/"```
```

The `get_json()` didn't fail, and sent us a plain string!

just to be sure...

```
@app.route('/wishes', methods=['POST'])
def add_wish():
    json = request.get_json()
    print("Failed wih type: " + str(type(json)))
```

```
Failed wih type: <class 'str'>
```

Wait. We checked that kind of stuff when we were still testing the API with
curl, so what changed?

let's print a bit more.


```
@app.route('/wishes', methods=['POST'])
def add_wish():
    print("Full request: " + str(request))
    print("Request data: " + str(request.data))
    print("Request data type: " + str(type(request.data)))
    json = request.get_json()
    print("Parsed json data type: " + str(type(json)))
    if json is None:
        abort(400)
[...]
```

And test with curl and chakram:

```
└#master> curl -i -H "Content-Type: application/json" -X POST -d '{"name":"New keyboard' http://localhost:5000/wishes
HTTP/1.0 400 BAD REQUEST
Content-Type: application/json
Content-Length: 122
Server: Werkzeug/0.12.1 Python/3.6.1
Date: Sun, 28 May 2017 19:10:04 GMT

{
  "error": "400 Bad Request: Failed to decode JSON object: Unterminated string starting at: line 1 column 9 (char 8)"
}
```

and server side:

```
Full request: <Request 'http://localhost:5000/wishes' [POST]>
Request data: b'{"name":"New keyboard'
Request data type: <class 'bytes'>
127.0.0.1 - - [28/May/2017 21:10:38] "POST /wishes HTTP/1.1" 400 -
```

Note that the json parsed stuff never got printed since it failed correctly and
stopped there

```npm test
  POST on /wishes with unparseable JSON
    1) should have status code 400
    2) should have 'application/json' as Content-Type
    3) should have error declaration as JSON in body


  0 passing (56ms)
  3 failing

  1) POST on /wishes with unparseable JSON should have status code 400:
     AssertionError: expected status code 500 to equal 400
  

  2) POST on /wishes with unparseable JSON should have 'application/json' as Content-Type:
     AssertionError: expected header Content-Type with value text/html; charset=utf-8 to match application/json
  

  3) POST on /wishes with unparseable JSON should have error declaration as JSON in body:
     AssertionError: expected body to match JSON schema {
  "type": "object",
  "required": [
    "error"
  ],
  "properties": {
    "error": {
      "type": "string"
    }
  }
}.
-----
 error: Invalid type: string (expected object).
 data path: .
 schema path: /type.
```


```
Full request: <Request 'http://127.0.0.1:5000/wishes' [POST]>
Request data: b'"{\\"name\\": \\"New Keyboard\\", \\"link\\": \\"http://www.thekeyboardwaffleiron.com/\\""'
Request data type: <class 'bytes'>
Parsed json data type: <class 'str'>
127.0.0.1 - - [28/May/2017 21:11:18] "POST /wishes HTTP/1.1" 500 -
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
  File "/home/horgix/work/willish/willish.py", line 57, in add_wish
    'name': json.get('name'),
AttributeError: 'str' object has no attribute 'get'
```

The difference is quite interesting: chakram (requests actually) chose to make
the string a valid JSON type by enclosing my invalid json in double quotes.
And actually, since it's valid JSON, `get_json()` from flask it totally able to
parse it; hey, it's just a string which is a valid JSON object!

So. 2 things to learn here:

1. We need to adress this unpredicted case in our code and throw a proper error
  (422) when we get **valid JSON** but which **cannot be parsed as a dict** and
  thus cannot be checked against `'name' not in json` and `'link' not in json`
  since the parsed object resulting of the `get_json()` operation is just a
  string that doesn't implement the `get()` operator. So we need to check if
  `json` is actually an instance of a dict, since it can also be a plain bool
  (valid json type too)
2. We need to split our test case in 2:
    - One that will send only a plain string or bool or whatever, which is
      valid json but unexpected parsed type (that will result in a 422)
    - One that will send unparseable, invalid JSON (that will result in a 400
      and that we were looking to test in the first place)

Let's adress 1:

```
@app.route('/wishes', methods=['POST'])
def add_wish():
    json = request.get_json()
    if json is None:
        abort(400)
    if not isinstance(json, dict) or ('name' not in json and 'link' not in json):
        # TODO : Maybe add error details if Debug is enabled?
        abort(422)
```

I actually thing that json-schema (as used in chakram to check JSON format in
request) may be of use here in the app to check if the JSON received has
requested fields, since this condition is becoming quite long. However I'm not
sure it's able to define stuff like "ensure there is either this field or this
one" like we do with name and link.

Now adress 2:

First, the test with a plain string, valid JSON

```
describe("POST on /wishes with only a string in JSON", function() {
  var apiResponse;

  before(function (){
    // Note the missing closing curly bracket and the fact that it's a string
    newWish = 'This is valid JSON since it is only a string, but is not a valid data format for this POST';
    apiResponse = chakram.post(
      "http://127.0.0.1:5000/wishes",
      newWish
    );
    return apiResponse;
  });

  it("should have status code 422", function () {
    return expect(apiResponse).to.have.status(422);
  });
  it("should have 'application/json' as Content-Type", function () {
    return expect(apiResponse).to.have.header("Content-Type",
      "application/json")
  });
  it("should have error declaration as JSON in body", function () {
    return expect(apiResponse).to.have.schema({
      "type": "object",
      "required": ["error"],
      "properties": {
        "error": { "type": "string" }
      }
    });
  });
});
```

```
  POST on /wishes with only a string in JSON
    ✓ should have status code 422
    ✓ should have 'application/json' as Content-Type
    ✓ should have error declaration as JSON in body
```

Yay. Now the second test, with a totally unparseable JSON object.

How can we build it? Or more precisely, why in the first place this request:


```
    newWish = '{"name": "New Keyboard", "link": "http://www.thekeyboardwaffleiron.com/"';
    apiResponse = chakram.post(
      "http://127.0.0.1:5000/wishes",
      newWish
    );
```

was transformed in:

```
Full request: <Request 'http://127.0.0.1:5000/wishes' [POST]>
Request data: b'"{\\"name\\": \\"New Keyboard\\", \\"link\\": \\"http://www.thekeyboardwaffleiron.com/\\""'
```

Let's take a look at the chakram documentation:

http://dareid.github.io/chakram/jsdoc/module-chakram.html#.post
```

staticmodule:chakram.post(url, data, params){Promise}
methods.js, line 116
    Perform HTTP POST request
    Name 	Type 	Description
    url 	string 	fully qualified url
    data 	Object 	a JSON serializable object (unless json is set to false in params, in which case this should be a buffer or string)
    params 	Object 	optional additional request options, see the popular request library for options
```

Hmm, I guess that "JSON serializable" means it will serialize it into valid
json, hence the addition of double quotes and escaping of my original string?
But it doesn't tell it. It says methods.js, line 116... let's take a look

https://github.com/dareid/chakram/blob/03486e90ca22ce0791b8fb03d1266942b328ff80/lib/methods.js#L116
```
exports.post = function (url, data, params) {
    return exports.request('POST', url, extendWithData(data, params));
};
```

Okay it doesn't do anything special and resort on request. Let's take a look at
request doc then :D

https://github.com/request/request#requestoptions-callback

> `body` - entity body for PATCH, POST and PUT requests. Must be a `Buffer`,
> `String` or `ReadStream`. If `json` is `true`, then `body` must be a
> JSON-serializable object.

> `json` - sets `body` to JSON representation of value and adds `Content-type:
> application/json` header. Additionally, parses the response body as JSON.

Okay so it looks like this "json" parameter is set, so `request` parses the
string and make a JSON object out of it, in addition to setting the
content-type automatically. We don't want this JSON parameter (but will have to
set the Content-Type ourselves). But.... wait... I didn't set this json param
anywhere and it doesn't looks like a default.

Remember the "Okay it doesn't do anything special" about chakram.post a few
lines ago? Let's take a look again.

```
exports.post = function (url, data, params) {
    return exports.request('POST', url, extendWithData(data, params));
};
```

Did you see it? This nasty `exports.request` . What's exports?

https://github.com/dareid/chakram/blob/03486e90ca22ce0791b8fb03d1266942b328ff80/lib/methods.js#L5
```
var exports = module.exports = {};
```

and a few lines later...

```
exports.request = function (method, url, params) {
    var options = extend({
        url: url,
        method: method,
        json: true
    }, params || {} );
```

This is where the "json" param is set to true.

So, set it to false!

```
before(function (){
  // Note the missing closing curly bracket and the fact that it's a string
  newWish = '{"name": "New Keyboard", "link": "http://www.thekeyboardwaffleiron.com/"';
  apiResponse = chakram.post(
    "http://127.0.0.1:5000/wishes",
    newWish,
    params={"json": false}
  );
  return apiResponse;
});
```

However this will make the request *without* the "Content-Type" header since
that was the "json" param that made it being set automatically. The "no
content-type header" is already check by the "invalid content-type" actually.
Maybe we'll test it explicitely but that's not the point here. Just a quick
note, I discovered while doing this that by default curl set a
application/x-www-form-urlencoded Content-Type header by default,m and that you
can **remove** a header sent by curl with this :

```
curl -i -H "Content-Type:" -X POST -d '{"name":"New keyboard' http://localhost:5000/wishes
```

Back to our business, we need to set Content-Type header explicitely. When
done, the full test looks like this:

```
describe("POST on /wishes with invalid JSON", function() {
  var apiResponse;

  before(function (){
    // Note the missing closing curly bracket and the fact that it's a string
    newWish = '{"name": "New Keyboard", "link": "http://www.thekeyboardwaffleiron.com/"';
    apiResponse = chakram.post(
      "http://127.0.0.1:5000/wishes",
      newWish,
      param = {
        "json": false,
        "headers": {"Content-Type": "application/json"}
      }
    );
    return apiResponse;
  });

  it("should have status code 400", function () {
    return expect(apiResponse).to.have.status(400);
  });
  it("should have 'application/json' as Content-Type", function () {
    return expect(apiResponse).to.have.header("Content-Type",
      "application/json")
  });
  it("should have error declaration as JSON in body", function () {
    return expect(apiResponse).to.have.schema({
      "type": "object",
      "required": ["error"],
      "properties": {
        "error": { "type": "string" }
      }
    });
  });
});
```

Let's see how it goes.


```
  POST on /wishes with invalid JSON
    ✓ should have status code 400
    ✓ should have 'application/json' as Content-Type
    1) should have error declaration as JSON in body


  26 passing (73ms)
  1 failing

  1) POST on /wishes with invalid JSON should have error declaration as JSON in body:
     AssertionError: expected body to match JSON schema {
  "type": "object",
  "required": [
    "error"
  ],
  "properties": {
    "error": {
      "type": "string"
    }
  }
}.
-----
 error: Invalid type: string (expected object).
 data path: .
 schema path: /type.
```

Ok so it fails with a 400 as expected (we sent an invalid json). But why the
fuck does it fail on the json schema?

Oh yeah, request again.
> `json` - sets `body` to JSON representation of value and adds `Content-type:
> application/json` header. **Additionally, parses the response body as JSON.**

And indeed:

https://github.com/request/request/blob/master/request.js#L1152
```
    if (self._json) {
      try {
response.body = JSON.parse(response.body, self._jsonReviver)
```

it will only try to parse the response body as JSON if we said that it was a
JSON request in the first place...

And you know what? Let's open a feature request for that.

<https://github.com/request/request/issues/2692>

However, it looks like the lib `request` is no longer maintained (latest coming
was on Apreil 19th, it was a README fix, and we are on June 21st...), which
imho is really wtf and sad and one of the reason I dislike Javascript.
Whatever, since I'll not get any fix merged upstream (no response to date to my
Issue, even if I suggested to PR the solution), we'll just get a quickfix in
our test for now.

So. `expect(apiResponse).to.have.schema` is actually using the `body` field of
the `apiResponse` promise response value :
<https://github.com/dareid/chakram/blob/master/lib/assertions/schema.js>

We actually need to modify this body. However, since it's a promise, we can't
just do something like `apiResponse.body = JSON.parse(apiResponse.body)` since,
well, it's the promise, not its value.

To parse the JSON body, we'll directly chain another promise to the original
POST which is assigned to `apiResponse` :

```
    apiResponse = chakram.post(
      "http://127.0.0.1:5000/wishes",
      newWish,
      param = {
        "json": false,
        "json_response": true,
        "headers": {"Content-Type": "application/json"}
      }
    ).then(function(value) {
      value.body = JSON.parse(value.body);
      return value;
    }, function(reason) {
      return reason;
    });
```

We can actually check by a simple log in our test function that is parses the
body:

```
  it("should have error declaration as JSON in body", function () {
    apiResponse.then(function(result) {
      console.log(result.body instanceof Object);
    });
    //apiResponse.value.body = JSON.parse(apiResponse.value.body);
    return expect(apiResponse).to.have.schema({
      "type": "object",
      "required": ["error"],
      "properties": {
        "error": { "type": "string" }
      }
    });
  });
```

Note the `console.log(result.body instanceof Object);`. Without our promise
parsing the JSON, this logs `false` since it's a plain string, but with our
promise, it logs `true` :)


# If we add something, can we get it as expected ?

Let's check that.

```
describe("Full wish addition", function() {
  var apiResponse;

  before(function (){
    newWish = {
      name: "19959ca5-ad72-487a-9e6a-f4ac8cf06a9b"
    };
    // Add a new wish
    apiResponse = chakram.post("http://127.0.0.1:5000/wishes", newWish).
      then(function(value) {
        // ... get its ID from POST response
        new_id = value.body['id'];
        // ... then try to GET it by its ID
        new_get = chakram.get("http://127.0.0.1:5000/wishes/" + new_id)
        return new_get;
    }, function(reason) {
      return reason;
    });
    return apiResponse;
  });

  it("should have status code 200", function () {
    return expect(apiResponse).to.have.status(200);
  });
  it("should have 'application/json' as Content-Type", function () {
    return expect(apiResponse).to.have.header("Content-Type",
      "application/json")
  });
  it("should have a 'Server' header", function () {
    return expect(apiResponse).to.have.header("Server");
  });
  it("should have a 'Date' header", function () {
    return expect(apiResponse).to.have.header("Date");
  });
  it("should have a 'Content-Length' header", function () {
    return expect(apiResponse).to.have.header("Content-Length");
  });
  it("should have valid JSON in body", function () {
    return expect(apiResponse).to.have.schema({
      "type": "object",
      "required": ["acquired", "id", "link", "name"],
      "properties": {
        "acquired": { "type": "boolean" },
        "id":       { "type": "integer" },
        "link":     { "type": ["string"] },
        "name":     { "type": ["string"] }
      }
    });
  });
  it("should have correct name", function () {
    return expect(apiResponse).to.have.json("name", "19959ca5-ad72-487a-9e6a-f4ac8cf06a9b");
  });
});
```

So we are adding a wish, then chaining it with the getting of the ID in the
POST response, and then a get of this ID to the API. We should get a 200, and
the same wish, right ? To ensure it's the same, i'm assigning an uuid to id and
checking it.

Aaaand... FAIl

```
  Full wish addition
    1) should have status code 200
    ✓ should have 'application/json' as Content-Type
    ✓ should have a 'Server' header
    ✓ should have a 'Date' header
    ✓ should have a 'Content-Length' header
    2) should have valid JSON in body
    3) should have correct name


  31 passing (81ms)
  3 failing

  1) Full wish addition should have status code 200:
     AssertionError: expected status code 404 to equal 200
  

  2) Full wish addition should have valid JSON in body:
     AssertionError: expected body to match JSON schema {
  "type": "object",
  "required": [
    "acquired",
    "id",
    "link",
    "name"
  ],
  "properties": {
    "acquired": {
      "type": "boolean"
    },
    "id": {
      "type": "integer"
    },
    "link": {
      "type": [
        "string"
      ]
    },
    "name": {
      "type": [
        "string"
      ]
    }
  }
}.
-----
 error: Missing required property: acquired.
 data path: .
 schema path: /required/0.
-----
 error: Missing required property: id.
 data path: .
 schema path: /required/1.
-----
 error: Missing required property: link.
 data path: .
 schema path: /required/2.
-----
 error: Missing required property: name.
 data path: .
 schema path: /required/3.
  

  3) Full wish addition should have correct name:
     Error: could not find path 'name' in object {"error":"404 Not Found: The requested URL was not found on the server.  If you entered the URL manually please check your spelling and try again."}
      at Object.get (node_modules/chakram/lib/utils/objectPath.js:5:19)
      at Assertion.<anonymous> (node_modules/chakram/lib/assertions/json.js:33:27)
      at Assertion.ctx.(anonymous function) (node_modules/chai/lib/chai/utils/addMethod.js:41:25)
      at node_modules/chai-as-promised/lib/chai-as-promised.js:308:26
      at _fulfilled (node_modules/q/q.js:854:54)
      at self.promiseDispatch.done (node_modules/q/q.js:883:30)
      at Promise.promise.promiseDispatch (node_modules/q/q.js:816:13)
      at node_modules/q/q.js:624:44
      at runSingle (node_modules/q/q.js:137:13)
      at flush (node_modules/q/q.js:125:13)
      at _combinedTickCallback (internal/process/next_tick.js:95:7)
      at process._tickCallback (internal/process/next_tick.js:161:9)
```

This is actually the bug I left intentionally :

> Fine ! (At least we believe it. I intentionally introduced a bug to be fixed
> later and which will give us a reason for writing good tests)

We are getting a 404 here. Look at the `get_wish`:

```
@app.route('/wishes/<int:wish_id>', methods=['GET'])
def get_wish(wish_id):
    try:
        return jsonify({'wish': wishes[wish_id]})
    except IndexError:
        abort(404)
```

And the examples we are storing start to ID 1. But Python array indexes start
at 0. So here, we store a new wish, let's say it gets ID 3, is pushed to the
list (to the position `2` since it starts indexing at 0), and then we try to
get ID 3 which... doesn't exist.

This is a trivial bug, and I wanted to let it there from the beginning to show
you that tests **are** important and can help detect bugs easily.

We're almost on the TDD road here :)

Let's fix it quickly and... in a dirty way, since anyway ou data storage is
shit. We have 3 choices:

- Start our indexes at 0
- Do a real search in the list to find the right ID instead of accessing it
  directly
- Add a dirty `- 1` to the ID that is asked before retrieving it from the list


... I'm not proud of this, but anyway this will be reworked as soon as we
change storage to a real database. Let's go for the "-1 solution". Just make
sure someone is not asking for id 0, or this will access the last element and
the list and success (hello python)

```
@app.route('/wishes/<int:wish_id>', methods=['GET'])
def get_wish(wish_id):
    if wish_id == 0:
        abort(404)
    try:
        return jsonify({'wish': wishes[wish_id - 1]})
    except IndexError:
        abort(404)
```

And while we're at it... This is not really RESTful to specify `{'wish':
<object>}`; we should directly return the object. Let's do that!

get_wish is now:

```
@app.route('/wishes/<int:wish_id>', methods=['GET'])
def get_wish(wish_id):
    if wish_id == 0:
        abort(404)
    try:
        return jsonify(wishes[wish_id - 1])
    except IndexError:
        abort(404)
 ```

also, our test is now :

```
describe("GET of newly added wish", function() {
  var apiResponse;

  before(function (){
    newWish = {
      name: "19959ca5-ad72-487a-9e6a-f4ac8cf06a9b"
    };
    // Add a new wish
    apiResponse = chakram.post("http://127.0.0.1:5000/wishes", newWish).
      then(function(value) {
        // ... get its ID from POST response
        new_id = value.body['id'];
        // ... then try to GET it by its ID
        new_get = chakram.get("http://127.0.0.1:5000/wishes/" + new_id)
        return new_get;
    }, function(reason) {
      return reason;
    });
    return apiResponse;
  });

  it("should have status code 200", function () {
    return expect(apiResponse).to.have.status(200);
  });
  it("should have 'application/json' as Content-Type", function () {
    return expect(apiResponse).to.have.header("Content-Type",
      "application/json")
  });
  it("should have a 'Server' header", function () {
    return expect(apiResponse).to.have.header("Server");
  });
  it("should have a 'Date' header", function () {
    return expect(apiResponse).to.have.header("Date");
  });
  it("should have a 'Content-Length' header", function () {
    return expect(apiResponse).to.have.header("Content-Length");
  });
  it("should have valid JSON in body", function () {
    console.log(apiResponse)
    return expect(apiResponse).to.have.schema({
      "type": "object",
      "required": ["acquired", "id", "link", "name"],
      "properties": {
        "acquired": { "type": "boolean" },
        "id":       { "type": "integer" },
        "link":     { "type": ["string", "null"] },
        "name":     { "type": ["string", "null"] }
      }
    });
  });
  it("should have correct name", function () {
    return expect(apiResponse).to.have.json("name", "19959ca5-ad72-487a-9e6a-f4ac8cf06a9b");
  });
});
```

fae559d8e9e5aaa5f402265f8b8d02479a01bf75 

note the "null" possibility for link and name, just like for the
get_wishes (the list). Talking about that, we have the weird `{'wishes':
<real_response>}` in get_wishes to. let's fix that

```
@app.route('/wishes', methods=['GET'])
def get_wishes():
    return jsonify(wishes)
```

And the test too obviously

From:

 it("should have valid JSON in body", function () {
    return expect(apiResponse).to.have.schema({
      "type": "object",
      "required": ["wishes"],
      "properties": {
        "wishes": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "acquired": { "type": "boolean" },
              "id": { "type": "integer" },
              "link": { "type": ["string", "null"] },
              "name": { "type": ["string", "null"] }
            }
          }
        }
      }
    });
  });
```

To
```
  it("should have valid JSON in body", function () {
    return expect(apiResponse).to.have.schema({
      "wishes": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "acquired": { "type": "boolean" },
            "id": { "type": "integer" },
            "link": { "type": ["string", "null"] },
            "name": { "type": ["string", "null"] }
          }
        }
      }
    });
  });
```
`
Goood, that's a lot of change but they were needed !





# Delete

So, let's go back to our code.
We have implemented get list, get wish by id, and post. Let's add delete which
should be straightforward


Actually, we have a choice to do there. Do we really want the item deleted, or
do we want to just mark it as "deleted" to retrieve it later on?

Eh, let's just mark it as deleted. Anyway we are already making sure that it's
not reassigning wishes ID with the "max_id" here

```
@app.route('/wishes/<int:wish_id>', methods=['DELETE'])
def delete_wish(wish_id):
    try:
        wishes[wish_id]['deleted'] = True
    except IndexError:
        abort(404)
    return jsonify({'result': True})
```

We are setting the "deleted" field of the wish to "True". This suppose that we
also update our existing test data to add this field and set it to False at
creation !

so add_wish now add the new wish like this :

```
    new_wish = {
            'id': max_id,
            'name': json.get('name'),
            'link': json.get('link'),
            'acquired': False,
            'deleted': False
            }
```

Note the `deleted` here.

And we also want to make sure that the `get_wishes` list doesn't comprise
deleted elements.

```
@app.route('/wishes', methods=['GET'])
def get_wishes():
    return jsonify([wish for wish in wishes if not wish['deleted']])

```

I'm using Python's TODO ADD LINK list comprehension here to build a list
comprised of wishes that are not deleted. I really like Python :D









- Name in before function
- no need to return
- no link AND name null

- test: add item, remove on, add again, make sure we don't get the same id


add check on raw `/`
TODO2 npm venv
