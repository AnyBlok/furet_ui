import os
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS


# configuration
DEBUG = True

# instantiate the app
main_path = os.path.dirname(os.path.abspath(__file__))
dist_path = os.path.join(main_path, 'client', 'dist')
app = Flask(__name__, static_url_path='')
app.config.from_object(__name__)

# enable CORS
CORS(app)


templates = {
    'MyTemplate': """
        <div>
            <h1>Plop from server.py file</h1>
            <router-link to="/">Go to the Homepage</router-link>
    </div>""",
}


# sanity check route
@app.route('/ping', methods=['GET'])
def ping_pong():
    return jsonify('pong!')


@app.route('/furet-ui/app/component/files', methods=['GET'])
def get_component_files():
    return jsonify({
        'templates': templates,
        'js': ['other/plop.js', 'other/plop.js'],
        'css': ['other/plop.css'],
        'menus': [],
        'lang': 'fr',
        'langs': {
            'fr': {},
            'en': {},
        },
    })


@app.route('/furet-ui/logo', methods=['GET'])
def get_logo():
    return send_from_directory(main_path, 'logo.png')


@app.route('/furet-ui/<path:path>', methods=['GET'])
def get_static(path):
    return send_from_directory(os.path.join(dist_path, 'furet-ui'), path)


@app.route('/other/<path:path>', methods=['GET'])
def get_other(path):
    return send_from_directory(os.path.join(main_path, 'other'), path)


@app.route('/', methods=['GET'])
def get_index_html():
    return send_from_directory(dist_path, 'index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0')
