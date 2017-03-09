# -*- coding: utf-8 -*-
from wsgiref.simple_server import make_server
from pprint import pprint
from simplejson import dumps


def readFile(_file, environ):
    block_size = 500
    if _file[0] == '/':
        _file = _file[1:]
    fp = open(_file, 'r')
    if 'wsgi.file_wrapper' in environ:
        return environ['wsgi.file_wrapper'](fp, block_size)
    else:
        return iter(lambda: fp.read(block_size), '')


def getData(viewId):
    return [
        {
            'type': 'UPDATE_MULTI_DATA',
            'model': 'Todo',
            'data': [
                {
                    'id': '1',
                    'name': "todo 1",
                    'creation_date': '2017-02-20T01:02:04-00:00',
                    'state': 'new',
                    'number': 1.2345678,
                    'url': 'http://furet-ui.readthedocs.io',
                    'uuid': 'uuid---',
                    'password': 'password',
                    'color': '#36c',
                    'text': '<div><p><em>Plop</em></p></div>',
                    'bool': True,
                },
                {
                    'id': '2',
                    'name': "todo 2",
                    'creation_date': '2017-02-20T01:02:04-00:00',
                    'state': 'started',
                    'number': 1.2345678,
                    'url': 'http://furet-ui.readthedocs.io',
                    'uuid': 'uuid---',
                    'password': 'password',
                    'color': '#36c',
                    'text': '<div><p><em>Plop</em></p></div>',
                    'bool': True,
                },
                {
                    'id': '3',
                    'name': "todo 3",
                    'creation_date': '2017-02-20T01:02:04-00:00',
                    'state': 'done',
                    'number': 1.2345678,
                    'url': 'http://furet-ui.readthedocs.io',
                    'uuid': 'uuid---',
                    'password': 'password',
                    'color': '#36c',
                    'text': '<div><p><em>Plop</em></p></div>',
                    'bool': False,
                },
                {
                    'id': '4',
                    'name': "todo 4",
                    'creation_date': '2017-02-20T01:02:04-00:00',
                    'state': 'done',
                    'number': 1.2345678,
                    'url': 'http://furet-ui.readthedocs.io',
                    'uuid': 'uuid---',
                    'password': 'password',
                    'color': '#36c',
                    'text': '<div><p><em>Plop</em></p><p>Other line</p></div>',
                    'bool': False,
                },
            ],
        },
        {
            'type': 'UPDATE_VIEW',
            'viewId': viewId,
            'ids': ['1', '2', "4"],
            'id': viewId,
        },
    ]


def getInitRequiredData():
    data = [
        {
            'type': 'UPDATE_RIGHT_MENU',
            'value': {
                'label': 'Login',
                'image': {'type': 'font-icon', 'value': 'fa-user'},
            },
            'values': [
                {
                    'label': 'Login',
                    'image': {'type': 'svg-icon', 'value': 'ActionAndroid'},
                    'id': 'login',
                    'values': [
                        {
                            'label': 'Login',
                            'description': 'Log in to use the application',
                            'image': {'type': 'font-icon', 'value': 'fa-user'},
                            'type': 'client',
                            'id': 'Login',
                        },
                    ],
                },
            ],
        },
        {
            'type': 'CLEAR_LEFT_MENU',
        },
    ]
    return dumps(data)


def getInitOptionnalData():
    data = [
        {
            'type': 'UPDATE_LOCALES',
            'locales': [
                {
                    'locale': 'fr-FR',
                    'counterpart': {
                        'formats': {
                            'date': {
                                'default': '%d/%m/%Y',
                            },
                            'time': {
                                'default': '%H/%M/%S',
                            },
                            'datetime': {
                                'default': '%d/%m/%Y %H:%M:%S %z',
                            },
                        },
                        'menus': {
                            'close': 'Fermer',
                            'search': 'Filtrer par ...',
                        },
                        'space': {
                            'close': 'Fermer',
                        },
                        'views': {
                            'unknown': {
                                'title': 'Le vue "%(name)s" est inconnue',
                                'message': "Veuillez contacter l'administrateur",
                            },
                            'common': {
                                'create': 'Créer',
                                'save': 'Sauvegarder',
                                'edit': 'Modifier',
                                'cancel': 'Annuler',
                                'delete': 'Supprimer',
                                'close': 'Fermer',
                                'actions': 'Actions',
                                'more': 'Autre',
                            },
                            'clients': {
                                'login': {
                                    'button': 'Connexion',
                                },
                            },
                        },
                        'fields': {
                            'common': {
                                'required': 'Ce champs est requis',
                            },
                            'date': {
                                'invalid': 'Date invalide',
                                'format': 'DD/MM/YYYY',
                            },
                            'datetime': {
                                'invalid': 'Date et heure invalide',
                                'format': 'DD/MM/YYYY HH:mm:ss Z',
                            },
                            'url': {
                                'invalid': 'URL invalide',
                            },
                        },
                    },
                },
            ],
        },
        {
            'type': 'SET_LOCALE',
            'locale': 'fr-FR',
        },
    ]
    return dumps(data)


def getMenu(label, spaceId):
    return [
        {
            'label': 'Menu ' + label + ' 1 : ' + spaceId,
            'image': {'type': 'font-icon', 'value': 'fa-user'},
            'actionId': '1',
            'custom_view': '',
            'id': label + '1',
            'submenus': [],
        },
        {
            'label': 'Menu ' + label + ' 2 : ' + spaceId,
            'image': {'type': '', 'value': ''},
            'actionId': '',
            'custom_view': 'Login',
            'id': label + '3',
            'submenus': [],
        },
        {
            'label': 'Menu ' + label + ' 2 : ' + spaceId,
            'image': {'type': '', 'value': ''},
            'actionId': '',
            'custom_view': '',
            'id': label + '4',
            'submenus': [
                {
                    'label': 'Menu ' + label + ' 1 : ' + spaceId,
                    'image': {'type': 'font-icon', 'value': 'fa-user'},
                    'actionId': '2',
                    'custom_view': '',
                    'id': label + '41',
                    'submenus': [],
                },
                {
                    'label': 'Menu ' + label + ' 2 : ' + spaceId,
                    'image': {'type': '', 'value': ''},
                    'actionId': '',
                    'custom_view': 'Login',
                    'id': label + '43',
                    'submenus': [
                        {
                            'label': 'Menu ' + label + ' 1 : ' + spaceId,
                            'image': {'type': 'font-icon', 'value': 'fa-user'},
                            'actionId': '3',
                            'custom_view': '',
                            'id': label + '431',
                            'submenus': [],
                        },
                        {
                            'label': 'Menu ' + label + ' 2 : ' + spaceId,
                            'image': {'type': '', 'value': ''},
                            'actionId': '',
                            'custom_view': 'Login',
                            'id': label + '433',
                            'submenus': [],
                        },
                    ],
                },
            ],
        },
    ]


def getSpace(spaceId):
    left_menu = getMenu('left', spaceId) if spaceId not in ('1', '2') else []
    right_menu = getMenu('right', spaceId) if spaceId not in ('1', '3') else []
    menuId = 'left431' if left_menu else ''
    actionId = '1' if spaceId != '4' else ''
    viewId = ''
    custom_view = 'Login' if spaceId == '4' else ''
    return {
        'type': 'UPDATE_SPACE',
        'spaceId': spaceId,
        'left_menu': left_menu,
        'menuId': menuId,
        'right_menu': right_menu,
        'actionId': actionId,
        'viewId': viewId,
        'custom_view': custom_view,
    }


def getViewList(state):
    state.update({
        'creatable': True,
        'deletable': True,
        'selectable': True,
        'onSelect': '3',
        'headers': [
            {
                'name': 'id',
                'type': 'Integer',
                'label': 'ID',
            },
            {
                'name': 'name',
                'type': 'String',
                'label': 'Label',
            },
            {
                'name': 'state',
                'type': 'Selection',
                'label': 'State',
                'selections': {'new': 'New', 'started': 'Started', 'done': 'Done'},
            },
            {
                'name': 'creation_date',
                'type': 'DateTime',
                'label': 'Creation date',
            },
            {
                'name': 'number',
                'type': 'Float',
                'label': 'Number',
            },
            {
                'name': 'color',
                'type': 'Color',
                'label': 'Color',
            },
            {
                'name': 'text',
                'type': 'Text',
                'label': 'Text',
            },
            {
                'name': 'bool',
                'type': 'Boolean',
                'label': 'Boolean',
            },
        ],
        'search': [
            {
                'key': 'name',
                'label': 'Label',
                "default": 'test',
            },
            {
                'key': 'creation_date',
                'label': 'Creation date',
            },
        ],
        'buttons': [
            {
                'label': 'Make a call',
                'buttonId': '1',
            },
        ],
        'onSelect_buttons': [
            {
                'label': 'Make a call 2',
                'buttonId': '2',
            },
        ],
    })


def getViewThumbnail(state):
    state.update({
        'creatable': True,
        'deletable': True,
        'onSelect': '3',
        'search': [
            {
                'key': 'name',
                'label': 'Label',
                "default": 'test',
            },
            {
                'key': 'creation_date',
                'label': 'Creation date',
            },
        ],
        'template': '''
            <div className="row">
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <field name="id" widget="Integer" label="ID"></field>
                </div>
                <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <field name="name" widget="String" label="Label"></field>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <field name="state" widget="Selection" selections='[["new", "New"], ["started", "Started"], ["done", "Done"]]' label="State"></field>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <field name="creation_date" widget="DateTime" label="Creation date"></field>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <field name="number" widget="Float" label="Number"></field>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <field name="url" widget="URL" label="URL" required="1"></field>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <field name="uuid" widget="UUID" label="UUID"></field>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <field name="password" widget="Password" label="Password"></field>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <field name="color" widget="Color" label="Color"></field>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <field name="text" widget="Text" label="Text"></field>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <field name="bool" widget="Boolean" label="Boolean"></field>
                </div>
            </div>
        ''',
        'buttons': [
            {
                'label': 'Make a call',
                'buttonId': '1',
            },
        ],
    })


def getViewForm(state):
    state.update({
        'creatable': True,
        'deletable': True,
        'editable': True,
        'onClose': '1',
        'template': '''
            <div className="row">
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <field name="id" widget="Integer" label="ID" required="1"></field>
                </div>
                <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <field name="name" widget="String" label="Label" required="1"></field>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <field name="state" widget="Selection" selections='[["new", "New"], ["started", "Started"], ["done", "Done"]]' label="State" required="1"></field>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <field name="creation_date" widget="DateTime" label="Creation date" required="1"></field>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <field name="number" widget="Float" label="Number" required="1"></field>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <field name="url" widget="URL" label="URL" required="1"></field>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <field name="uuid" widget="UUID" label="UUID"></field>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <field name="password" widget="Password" label="Password" required="1"></field>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <field name="color" widget="Color" label="Color" required="1"></field>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <field name="text" widget="Text" label="Text" required="1"></field>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <field name="bool" widget="Boolean" label="Boolean"></field>
                </div>
            </div>
        ''',
        'buttons': [
            {
                'label': 'Make a call',
                'buttonId': '1',
            },
        ],
    })


def getView(viewId):
    res = {
        'type': 'UPDATE_VIEW',
        'viewId': viewId,
        'label': 'View : ' + viewId,
    }
    if viewId == '1':
        getViewList(res)
    if viewId == '2':
        getViewThumbnail(res)
    if viewId == '3':
        getViewForm(res)

    return res


def getAction(actionId):
    return {
        'type': 'UPDATE_ACTION_MANAGER_ADD_ACTION_DATA',
        'actionId': actionId,
        'label': 'Action : ' + actionId,
        'viewId': '2',
        'views': [
            {
                'viewId': '1',
                'type': 'List',
            },
            {
                'viewId': '2',
                'type': 'Thumbnail',
            },
            {
                'viewId': '3',
                'type': 'Form',
            },
            {
                'viewId': '4',
                'type': 'Calendar',
            },
            {
                'viewId': '5',
                'type': 'Kanban',
            },
            {
                'viewId': '6',
                'type': 'Graph',
            },
            {
                'viewId': '7',
                'type': 'Gantt',
            },
        ],
        'model': 'Todo',
    }


def getLoginData():
    data = [
        {
            'type': 'UPDATE_GLOBAL',
            'spaceId': '1',
        },
        {
            'type': 'UPDATE_RIGHT_MENU',
            'value': {
                'label': 'Hello Jean-Sebastien',
                'image': {'type': 'font-icon', 'value': 'fa-user'},
            },
            'values': [
                {
                    'label': 'Login',
                    'image': {'type': 'font-icon', 'value': 'fa-user'},
                    'id': 'login',
                    'values': [
                        {
                            'label': 'Logout',
                            'description': 'Disconnect of the application',
                            'image': {'type': 'font-icon', 'value': 'fa-user'},
                            'type': 'client',
                            'id': 'Logout',
                        },
                    ],
                },
            ],
        },
        {
            'type': 'UPDATE_LEFT_MENU',
            'value': {
                'label': 'Space 1',
                'image': {'type': '', 'value': ''},
            },
            'values': [
                {
                    'label': 'Space groupe 1',
                    'image': {'type': '', 'value': ''},
                    'id': 1,
                    'values': [
                        {
                            'label': 'Space 1',
                            'description': '',
                            'image': {'type': '', 'value': ''},
                            'type': 'space',
                            'id': '1',
                        },
                        {
                            'label': 'Space 2',
                            'description': '',
                            'image': {'type': '', 'value': ''},
                            'type': 'space',
                            'id': '2',
                        },
                        {
                            'label': 'Space 3',
                            'description': '',
                            'image': {'type': '', 'value': ''},
                            'type': 'space',
                            'id': '3',
                        },
                        {
                            'label': 'Space 4',
                            'description': '',
                            'image': {'type': '', 'value': ''},
                            'type': 'space',
                            'id': '4',
                        },
                        {
                            'label': 'Space 5',
                            'description': '',
                            'image': {'type': '', 'value': ''},
                            'type': 'space',
                            'id': '5',
                        },
                        {
                            'label': 'Space 6',
                            'description': '',
                            'image': {'type': '', 'value': ''},
                            'type': 'space',
                            'id': '6',
                        },
                    ],
                },
                {
                    'label': 'Space groupe 2',
                    'image': {'type': '', 'value': ''},
                    'id': 2,
                    'values': [
                        {
                            'label': 'Space 7',
                            'description': '',
                            'image': {'type': '', 'value': ''},
                            'type': 'space',
                            'id': '7',
                        },
                        {
                            'label': 'Space 8',
                            'description': '',
                            'image': {'type': '', 'value': ''},
                            'type': 'space',
                            'id': '8',
                        },
                    ],
                },
            ],
        },
    ]
    data.append(getSpace('1'))
    data.append(getAction('1'))
    return dumps(data)


def application(environ, start_response):
    if environ['PATH_INFO'] == '/':
        response_body = readFile('index.html', environ)
        status = '200 OK'
        response_headers = [
            ('Content-Type', 'text/html'),
        ]
    elif environ['PATH_INFO'].endswith('.js'):
        response_body = readFile(environ['PATH_INFO'], environ)
        status = '200 OK'
        response_headers = [
            ('Content-Type', 'text/javascript'),
        ]
    elif environ['PATH_INFO'] == '/furetui/init/required/data':
        response_body = getInitRequiredData()
        status = '200 OK'
        response_headers = [
            ('Content-Type', 'text/json'),
            ('Content-Length', str(len(response_body)))
        ]
    elif environ['PATH_INFO'] == '/furetui/init/optionnal/data':
        response_body = getInitOptionnalData()
        status = '200 OK'
        response_headers = [
            ('Content-Type', 'text/json'),
            ('Content-Length', str(len(response_body)))
        ]
    elif environ['PATH_INFO'] == '/furetui/client/login':
        response_body = getLoginData()
        status = '200 OK'
        response_headers = [
            ('Content-Type', 'text/json'),
            ('Content-Length', str(len(response_body)))
        ]
    elif environ['PATH_INFO'] == '/furetui/client/logout':
        response_body = getInitRequiredData()
        status = '200 OK'
        response_headers = [
            ('Content-Type', 'text/json'),
            ('Content-Length', str(len(response_body)))
        ]
    elif environ['PATH_INFO'].split('/')[2] == 'space':
        response_body = dumps([getSpace(environ['PATH_INFO'].split('/')[3])])
        status = '200 OK'
        response_headers = [
            ('Content-Type', 'text/json'),
            ('Content-Length', str(len(response_body)))
        ]
    elif environ['PATH_INFO'].split('/')[2] == 'action':
        response_body = dumps([getAction(environ['PATH_INFO'].split('/')[3])])
        status = '200 OK'
        response_headers = [
            ('Content-Type', 'text/json'),
            ('Content-Length', str(len(response_body)))
        ]
    elif environ['PATH_INFO'] == '/furetui/list/get':
        data = []
        data.append(getView('1'))
        data.extend(getData('1'))
        response_body = dumps(data)
        status = '200 OK'
        response_headers = [
            ('Content-Type', 'text/json'),
            ('Content-Length', str(len(response_body)))
        ]
    elif environ['PATH_INFO'] == '/furetui/thumbnail/get':
        data = []
        data.append(getView('2'))
        data.extend(getData('2'))
        response_body = dumps(data)
        status = '200 OK'
        response_headers = [
            ('Content-Type', 'text/json'),
            ('Content-Length', str(len(response_body)))
        ]
    elif environ['PATH_INFO'] == '/furetui/form/get':
        data = []
        data.append(getView('3'))
        data.extend(getData('3'))
        response_body = dumps(data)
        status = '200 OK'
        response_headers = [
            ('Content-Type', 'text/json'),
            ('Content-Length', str(len(response_body)))
        ]
    else:
        pprint(environ)
        response_body = 'Request method: %s' % environ['REQUEST_METHOD']
        status = '200 OK'
        response_headers = [
            ('Content-Type', 'text/plain'),
            ('Content-Length', str(len(response_body)))
        ]

    start_response(status, response_headers)
    return response_body


httpd = make_server('localhost', 8080, application)
httpd.serve_forever()
