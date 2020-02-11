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

TEAMS = [
    {
        'firstname': 'Jean-Sébastien',
        'lastname': 'Suzanne',
        'roles': ['Anyblok -> 1er lien'],
    },
    {
        'firstname': 'Pierre',
        'lastname': 'Verkest',
        'roles': ['Anyblok -> 2nd lien', 'Cluster -> 1er lien'],
    },
    {
        'firstname': 'Fabien',
        'lastname': 'Castarède',
        'roles': ['Anyblok -> Facilitateur', 'Cluster -> 2nd lien'],
    },
    {
        'firstname': 'Renaud',
        'lastname': 'Boyer',
        'roles': ['Anyblok -> Secretaire', 'Achat.IO -> 1er lien'],
    },
    {
        'firstname': 'Audrey',
        'lastname': 'Braun',
        'roles': [],
    },
]


@app.route('/teams', methods=['GET'])
def get_teams():
    return jsonify(TEAMS)


@app.route('/furet-ui/app/component/files', methods=['GET'])
def get_component_files():
    return jsonify({
        'templates': templates,
        'js': ['other/plop.js', 'other/plop.js', 'other/teams.js'],
        'css': ['other/plop.css'],
        'global': {},
        'menus': {
            'user': [
                {
                    'name': 'login',
                    'component': 'furet-ui-appbar-head-router-link-button',
                    'props': {'to': '/login', 'label': 'Se connecter'},
                }
            ],
            'spaces': [
                {
                    'name': 'ping',
                    'props': {'to': '/ping', 'label': 'Allez à ping'},
                },
                {
                    'name': 'homepage',
                    'props': {'to': '/', 'label': 'Home page'},
                },
                {
                    'name': 'teams',
                    'props': {'to': '/teams', 'label': 'Teams'},
                },
            ],
            'spaceMenus': [
                {
                    'name': 'ping',
                    'props': {'to': '/ping', 'label': 'Allez à ping'},
                },
            ],
        },
        'lang': 'fr',
        'langs': [
            {
                'locale': 'fr',
                'translations': {
                    'components': {
                      'login': {
                        'appbar': 'Se connecter',
                        'button': 'Se connecter',
                      },
                      'logout': {
                        'appbar': {
                          'administrator': "Administrateur",
                          'logout': "Se déconnecter",
                          'about': "A propos de ...",
                        },
                        'button': "Se déconnecter",
                      },
                      'page': {
                          'list': {
                            'search': 'Rechercher',
                            'notFound': 'Aucun élément trouvé',
                          },
                      },
                    },
                },
            },
        ],
    })


@app.route('/furet-ui/logo', methods=['GET'])
@app.route('/furet-ui/favicon', methods=['GET'])
def get_favicon():
    return send_from_directory(main_path, 'logo.png')


@app.route('/furet-ui/<path:path>', methods=['GET'])
def get_static(path):
    return send_from_directory(os.path.join(dist_path, 'furet-ui'), path)


@app.route('/', methods=['GET'])
def get_index_html():
    return send_from_directory(dist_path, 'index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0')
