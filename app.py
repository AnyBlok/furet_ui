import os
from flask import Flask, jsonify, send_from_directory
from flask import request
from flask_cors import CORS


# configuration
DEBUG = True

# instantiate the app
main_path = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__, static_url_path='')
app.config.from_object(__name__)

# enable CORS
CORS(app)


def getFuretUISpaces():
    return [
        {
            'type': 'UPDATE_ROOT_MENUS',
            'menus': [
                {
                    'code': 'menu%d' % i,
                    'label': 'Menu %d' % i,
                    'icon': {
                        'code': 'bars' if i % 3 else 'user',
                        'type': 'is-success' if i % 2 else '',
                    },
                    'description': 'One menu for Furet UI',
                    'path': '/spaces/menu%d/resource/%d' % (i, i),
                }
                for i in range(10)
            ],
        },
    ]


@app.route('/furet-ui/login', methods=['POST'])
def login():
    data = request.json
    redirect = data.get('redirect') or '/'
    return jsonify([
        {
            'type': 'UPDATE_USER_MENUS',
            'menus': [
                {
                    'label': 'One menu',
                    'path': '/login',
                },
                {
                    'label': 'Second menu',
                    'path': '/',
                },
            ],
        },
        {
            'type': 'LOGIN',
            'userName': data['login'],
        },
        {
            'type': 'UPDATE_ROUTE',
            'path': redirect,
        },
        *getFuretUISpaces(),
    ])


@app.route('/furet-ui/logout', methods=['POST'])
def logout():
    return jsonify([
        {'type': 'UPDATE_USER_MENUS', 'menus': []},
        {'type': 'UPDATE_ROOT_MENUS', 'menus': []},
        {'type': 'LOGOUT'},
        {'type': 'UPDATE_ROUTE', 'path': '/'},
    ])


@app.route('/furet-ui/initialize', methods=['GET'])
def get_initialize():
    return jsonify([
        {'type': 'SET_LOCALE', 'locale': 'fr'},
        {
            'type': 'UPDATE_LOCALES',
            'locales': [
                {
                    'locale': 'fr',
                    'messages': {},
                }
            ]
        }
    ])


@app.route('/furet-ui/logo', methods=['GET'])
@app.route('/furet-ui/favicon', methods=['GET'])
def get_favicon():
    return send_from_directory(main_path, 'logo.png')


if __name__ == '__main__':
    app.run(host='0.0.0.0')
