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
                    'creation_date': '2017-02-20',
                    'state': 'new',
                },
                {
                    'id': '2',
                    'name': "todo 2",
                    'creation_date': '2017-02-21',
                    'state': 'started',
                },
                {
                    'id': '3',
                    'name': "todo 3",
                    'creation_date': '2017-02-21',
                    'state': 'done',
                },
                {
                    'id': '4',
                    'name': "todo 4",
                    'creation_date': '2017-02-21',
                    'state': 'done',
                },
            ],
        },
        {
            'type': 'UPDATE_VIEW',
            'viewId': viewId,
            'ids': ['1', '2', "4"],
            'id': '1',
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
        'onSelect': '2',
        'headers': [
            {
                'name': 'name',
                'type': 'String',
                'label': 'Label',
            },
            {
                'name': 'state',
                'type': 'Selection',
                'label': 'State',
                'selections': [{'new': 'New', 'started': 'Started', 'done': 'Done'}],
            },
            {
                'name': 'creation_date',
                'type': 'DateTime',
                'label': 'Creation date',
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


def getView(viewId):
    res = {
        'type': 'UPDATE_VIEW',
        'viewId': viewId,
        'label': 'View : ' + viewId,
    }
    if viewId == '1':
        getViewList(res)

    return res


def getAction(actionId):
    return {
        'type': 'UPDATE_ACTION_MANAGER_ADD_ACTION_DATA',
        'actionId': actionId,
        'label': 'Action : ' + actionId,
        'viewId': '1',
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
