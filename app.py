import os
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS


# configuration
DEBUG = True

# instantiate the app
main_path = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    'client', 'dist')
app = Flask(__name__, static_url_path='')
app.config.from_object(__name__)

# enable CORS
CORS(app)


# sanity check route
@app.route('/ping', methods=['GET'])
def ping_pong():
    return jsonify('pong!')


@app.route('/static/<path:path>', methods=['GET'])
def get_static(path):
    return send_from_directory(os.path.join(main_path, 'static'), path)


@app.route('/', methods=['GET'])
def get_index_html():
    return send_from_directory(main_path, 'index.html')


if __name__ == '__main__':
    app.run()
