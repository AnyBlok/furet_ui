# -*- coding: utf-8 -*-
from bottle import route, run, static_file, response, request
from simplejson import dumps, loads
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import (
    create_engine, Column, Integer, String, DateTime, Float, Text, Time,
    Boolean, or_, ForeignKey, Table
)
from sqlalchemy.orm import relationship, sessionmaker
from datetime import datetime, time


engine = create_engine('postgresql+psycopg2:///furetui', echo=True)
Base = declarative_base(bind=engine)


class Test(Base):
    __tablename__ = 'test'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    creation_date = Column(DateTime)
    state = Column(String)
    number = Column(Float)
    url = Column(String)
    uuid = Column(String)
    password = Column(String)
    color = Column(String)
    text = Column(Text)
    bool = Column(Boolean)
    time = Column(Time)
    json = Column(Text)

    def read(self, fields):
        return [{
            'type': 'UPDATE_DATA',
            'model': 'Test',
            'data': {self.id: {y: getattr(self, y) for y in fields}},
        }]


association_table = Table(
    'association', Base.metadata,
    Column('customer_id', Integer, ForeignKey('customer.id')),
    Column('category_id', Integer, ForeignKey('category.id'))
)


class Category(Base):
    __tablename__ = 'category'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    customers = relationship(
        "Customer", secondary=association_table, back_populates="categories")

    def read(self, fields):
        res = [{
            'type': 'UPDATE_DATA',
            'model': 'Category',
            'data': {self.id: {}},
        }]
        for field in fields:
            if isinstance(field, (list, tuple)):
                field, subfield = field
                for entry in getattr(self, field):
                    res.extend(entry.read([subfield]))

            res[0]['data'][self.id][field] = getattr(self, field)

        return res


class Customer(Base):
    __tablename__ = 'customer'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String)
    addresses = relationship("Address", back_populates='customer')
    categories = relationship(
        "Category", secondary=association_table, back_populates="customers")

    def read(self, fields):
        res = [{
            'type': 'UPDATE_DATA',
            'model': 'Customer',
            'data': {self.id: {}},
        }]
        for field in fields:
            if isinstance(field, (list, tuple)):
                field, subfield = field
                for entry in getattr(self, field):
                    res.extend(entry.read([subfield]))
            if field in ('categories', 'addresses'):
                res[0]['data'][self.id][field] = [x.id for x in getattr(self, field)]
            else:
                res[0]['data'][self.id][field] = getattr(self, field)

        return res


class Address(Base):
    __tablename__ = 'address'

    id = Column(Integer, primary_key=True)
    street = Column(String)
    zip = Column(String)
    city = Column(String)
    customer_id = Column(Integer, ForeignKey('customer.id'))
    customer = relationship("Customer", back_populates="addresses")

    def read(self, fields):
        res = [{
            'type': 'UPDATE_DATA',
            'model': 'Address',
            'data': {self.id: {}},
        }]
        for field in fields:
            if isinstance(field, (list, tuple)):
                field, subfield = field
                entry = getattr(self, field)
                res.extend(entry.read([subfield]))

            if field == 'customer':
                res[0]['data'][self.id][field] = self.customer.id
            else:
                res[0]['data'][self.id][field] = getattr(self, field)

        return res


Base.metadata.create_all()
Session = sessionmaker(bind=engine)
MODELS = {
    'Test': Test,
    'Customer': Customer,
    'Address': Address,
    'Category': Category,
}


def json_serial(obj):
    if isinstance(obj, (datetime, time)):
        serial = obj.isoformat()
        return serial

    raise TypeError(repr(obj) + " is not JSON serializable")


def superDumps(data):
    return dumps(data, default=json_serial)


def _getInitRequiredData():
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
    return superDumps(data)


def _getInitOptionnalData():
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
                            'time': {
                                'invalid': 'Heure invalide',
                            },
                            'datetime': {
                                'invalid': 'Date et heure invalide',
                                'format': 'DD/MM/YYYY HH:mm:ss Z',
                            },
                            'url': {
                                'invalid': 'URL invalide',
                            },
                            'json': {
                                'invalid': 'Format JSON invalide',
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
    return superDumps(data)


def getAction1():
    res = [
        {
            'type': 'UPDATE_ACTION_MANAGER_ADD_ACTION_DATA',
            'actionId': '1',
            'label': 'Action : 1',
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
            'model': 'Test',
        }
    ]
    res.append(getView1())
    return res


def getAction2():
    res = [
        {
            'type': 'UPDATE_ACTION_MANAGER_ADD_ACTION_DATA',
            'actionId': '2',
            'label': 'Customer',
            'viewId': '8',
            'views': [
                {
                    'viewId': '8',
                    'type': 'List',
                },
                {
                    'viewId': '9',
                    'type': 'Form',
                },
            ],
            'model': 'Customer',
        }
    ]
    res.append(getView8())
    return res


def getAction3():
    res = [
        {
            'type': 'UPDATE_ACTION_MANAGER_ADD_ACTION_DATA',
            'actionId': '3',
            'label': 'Category',
            'viewId': '10',
            'views': [
                {
                    'viewId': '10',
                    'type': 'List',
                },
                {
                    'viewId': '11',
                    'type': 'Form',
                },
            ],
            'model': 'Category',
        }
    ]
    res.append(getView10())
    return res


def getAction4():
    res = [
        {
            'type': 'UPDATE_ACTION_MANAGER_ADD_ACTION_DATA',
            'actionId': '4',
            'label': 'Address',
            'viewId': '12',
            'views': [
                {
                    'viewId': '12',
                    'type': 'List',
                },
                {
                    'viewId': '13',
                    'type': 'Form',
                },
            ],
            'model': 'Address',
        }
    ]
    res.append(getView12())
    return res


def getAction(actionId):
    if actionId == '1':
        return getAction1()
    elif actionId == '2':
        return getAction2()
    elif actionId == '3':
        return getAction3()
    elif actionId == '4':
        return getAction4()

    raise Exception('Unknown action %r' % actionId)


def getSpace1():
    space = [{
        'type': 'UPDATE_SPACE',
        'spaceId': '1',
        'left_menu': [],
        'menuId': None,
        'right_menu': [],
        'actionId': '1',
        'viewId': None,
        'custom_view': '',
    }]
    space.extend(getAction1())
    return space


def getSpace2():
    space = [{
        'type': 'UPDATE_SPACE',
        'spaceId': '2',
        'left_menu': [
            {
                'label': 'Customer',
                'image': {'type': 'font-icon', 'value': 'fa-user'},
                'actionId': '2',
                'id': '1',
                'submenus': [],
            },
            {
                'label': 'Setting',
                'image': {'type': 'font-icon', 'value': 'fa-user'},
                'actionId': '',
                'id': '2',
                'submenus': [
                    {
                        'label': 'Category',
                        'image': {'type': '', 'value': ''},
                        'actionId': '3',
                        'id': '3',
                        'submenus': [],
                    },
                    {
                        'label': 'Address',
                        'image': {'type': '', 'value': ''},
                        'actionId': '4',
                        'id': '4',
                        'submenus': [],
                    },
                ],
            },
        ],
        'menuId': '3',
        'right_menu': [],
        'actionId': '3',
        'viewId': None,
        'custom_view': '',
    }]
    space.extend(getAction3())
    return space


def getSpace(spaceId):
    if spaceId == '1':
        return getSpace1()
    elif spaceId == '2':
        return getSpace2()

    raise Exception('Unknown space %r' % spaceId)


def getView1():
    return {
        'type': 'UPDATE_VIEW',
        'viewId': '1',
        'label': 'View : 1',
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
                'name': 'time',
                'type': 'Time',
                'label': 'Time',
            },
            {
                'name': 'json',
                'type': 'Json',
                'label': 'Json',
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
        'fields': ["id", "name", "state", "creation_date", "number",
                   "color", "text", "time", "json"],
    }


def getView2():
    return {
        'type': 'UPDATE_VIEW',
        'viewId': '2',
        'label': 'View : 2',
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
                    <field
                        name="state"
                        widget="Selection"
                        selections='[["new", "New"], ["started", "Started"], ["done", "Done"]]'
                        label="State">
                    </field>
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
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <field name="time" widget="Time" label="Time"></field>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <field name="json" widget="Json" label="JSON" required="1"></field>
                </div>
            </div>
        ''',
        'buttons': [
            {
                'label': 'Make a call',
                'buttonId': '1',
            },
        ],
        'fields': [
            "id", "name", "state", "creation_date", "number", "url",
            "uuid", "password", "color", "text", "bool", "time", "json",
        ],
    }


def getView3():
    return {
        'type': 'UPDATE_VIEW',
        'viewId': 3,
        'label': 'View : 3',
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
                    <field name="json" widget="Json" label="JSON" required="1"></field>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <field
                        name="state"
                        widget="Selection"
                        selections='[["new", "New"], ["started", "Started"], ["done", "Done"]]'
                        label="State"
                        required="1">
                    </field>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <field
                        name="creation_date"
                        widget="DateTime"
                        label="Creation date"
                        required="1">
                    </field>
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
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <field name="time" widget="Time" label="Time"></field>
                </div>
            </div>
        ''',
        'buttons': [
            {
                'label': 'Make a call',
                'buttonId': '1',
            },
        ],
        'fields': [
            "id", "name", "json", "state", "creation_date", "number",
            "url", "uuid", "password", "color", "text", "bool", "time",
        ],
    }


def getView8():
    return {
        'type': 'UPDATE_VIEW',
        'viewId': '8',
        'label': 'Customers',
        'creatable': True,
        'deletable': True,
        'selectable': False,
        'onSelect': '9',
        'headers': [
            {
                'name': 'name',
                'type': 'String',
                'label': 'Name',
            },
            {
                'name': 'addresses',
                'type': 'One2Many',
                'label': 'Addresses',
            },
            {
                'name': 'categories',
                'type': 'Many2Many',
                'label': 'Categories',
                'field': 'name',
            },
        ],
        'search': [
        ],
        'buttons': [
        ],
        'onSelect_buttons': [
        ],
        'fields': ["name", "addresses", ["categories", "name"]],
    }


def getView9():
    return {
        'type': 'UPDATE_VIEW',
        'viewId': '9',
        'label': 'Customer',
        'creatable': True,
        'deletable': True,
        'editable': True,
        'onClose': '8',
        'template': '''
            <div className="row">
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <field name="name" widget="String" label="Name" required="1"></field>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <field name="email" widget="String" label="E-mail" required="1"></field>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <field
                        name="addresses"
                        widget="One2Many"
                        label="Addresses"
                    >
                    </field>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <field
                        name="categories"
                        widget="Many2ManyCheckBox"
                        label="Categories"
                        field="name"
                    >
                    </field>
                </div>
            </div>
        ''',
        'buttons': [],
        'fields': ["name", "email", "addresses", ["categories", "name"]],
    }


def getView10():
    return {
        'type': 'UPDATE_VIEW',
        'viewId': '10',
        'label': 'Categories',
        'creatable': True,
        'deletable': True,
        'selectable': False,
        'onSelect': '11',
        'headers': [
            {
                'name': 'name',
                'type': 'String',
                'label': 'Name',
            },
        ],
        'search': [
        ],
        'buttons': [
        ],
        'onSelect_buttons': [
        ],
        'fields': ["name"],
    }


def getView11():
    return {
        'type': 'UPDATE_VIEW',
        'viewId': '11',
        'label': 'Category',
        'creatable': True,
        'deletable': True,
        'editable': True,
        'onClose': '10',
        'template': '''
            <div className="row">
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <field name="name" widget="String" label="Name" required="1"></field>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <field
                        name="customers"
                        widget="Many2Many"
                        label="Customers"
                        field="name"
                    >
                    </field>
                </div>
            </div>
        ''',
        'buttons': [],
        'fields': ["name", ["customers", "name"]],
    }


def getView12():
    return {
        'type': 'UPDATE_VIEW',
        'viewId': '12',
        'label': 'Addresses',
        'creatable': True,
        'deletable': True,
        'selectable': False,
        'onSelect': '13',
        'headers': [
            {
                'name': 'customer',
                'type': 'Many2One',
                'label': 'Customer',
                'field': 'name',
            },
            {
                'name': 'street',
                'type': 'String',
                'label': 'Street',
            },
            {
                'name': 'zip',
                'type': 'String',
                'label': 'zip',
            },
            {
                'name': 'city',
                'type': 'String',
                'label': 'City',
            },
        ],
        'search': [
        ],
        'buttons': [
        ],
        'onSelect_buttons': [
        ],
        'fields': [["customer", 'name'], "street", "zip", "city"],
    }


def getView13():
    return {
        'type': 'UPDATE_VIEW',
        'viewId': '13',
        'label': 'Category',
        'creatable': True,
        'deletable': True,
        'editable': True,
        'onClose': '12',
        'template': '''
            <div className="row">
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <field
                        name="customer"
                        widget="Many2one"
                        label="Customer"
                        field="name'
                        required="1">
                    </field>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <field name="street" widget="String" label="Street" required="1"></field>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <field name="zip" widget="String" label="Zip" required="1"></field>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <field name="city" widget="String" label="City" required="1"></field>
                </div>
            </div>
        ''',
        'buttons': [],
        'fields': ["name", ["customers", "name"]],
    }


def getView(viewId):
    if viewId == '1':
        view = getView1()
    elif viewId == '2':
        view = getView2()
    elif viewId == '3':
        view = getView3()
    elif viewId == '8':
        view = getView8()
    elif viewId == '9':
        view = getView9()
    elif viewId == '10':
        view = getView10()
    elif viewId == '11':
        view = getView11()
    elif viewId == '12':
        view = getView12()
    elif viewId == '13':
        view = getView13()
    else:
        raise Exception("Unknown view %r" % viewId)

    return view


@route('/furetui/client/login', method='POST')
def getLoginData():
    response.set_header('Content-Type', 'application/json')
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
                            'label': 'Customer',
                            'description': 'Manager customer, address and category',
                            'image': {'type': 'font-icon', 'value': 'fa-user'},
                            'type': 'space',
                            'id': '2',
                        },
                    ],
                },
            ],
        },
    ]
    data.extend(getSpace1())
    return superDumps(data)


def getIdsFromFilter(model, filters):
    ids = []
    try:
        session = Session()
        Model = MODELS[model]
        query = session.query(Model)
        if filters:
            for k, v in filters.items():
                if isinstance(getattr(Model, k).property.columns[0].type, String):
                    query = query.filter(
                        or_(*[getattr(Model, k).ilike('%{}%'.format(x)) for x in v]))
                else:
                    query = query.filter(getattr(Model, k).in_(v))

        ids = [x.id for x in query.all()]
    except AttributeError:
        pass
    finally:
        session.rollback()
        session.close()

    return ids


def _getData(session, model, ids, fields):
    Model = MODELS[model]
    query = session.query(Model)
    query = query.filter(Model.id.in_(ids))
    res = []
    for entry in query.all():
        res.extend(entry.read(fields))

    # merge same model
    return res


def getData(model, ids, fields):
    if not ids:
        return []

    res = []
    try:
        session = Session()
        res.extend(_getData(session, model, ids, fields))
    except:
        session.rollback()
        raise
    finally:
        session.close()

    return res


@route('/furetui/space/<spaceId>', method='POST')
def getSpaceInformation(spaceId=None):
    response.set_header('Content-Type', 'application/json')
    if spaceId is None:
        return superDumps([])

    return superDumps(getSpace(spaceId))


@route('/furetui/action/<actionId>', method='POST')
def getActionInformation(actionId=None):
    response.set_header('Content-Type', 'application/json')
    if actionId is None:
        return superDumps([])

    return superDumps(getAction(actionId))


@route('/furetui/view/<viewId>', method='POST')
def getViewInformation(viewId=None):
    response.set_header('Content-Type', 'application/json')
    if viewId is None:
        return superDumps([])

    return superDumps([getView(viewId)])


def getMultiView():
    data = loads(request.body.read())
    ids = getIdsFromFilter(data['model'], data['filter'])
    fields = data.get('fields')
    if fields is None:
        view = getView(data['viewId'])
        fields = view['fields']

    _data = getData(data['model'], ids, fields)
    _data.append({
        'type': 'UPDATE_VIEW',
        'viewId': data['viewId'],
        'ids': ids,
    })
    return superDumps(_data)


@route('/furetui/list/get', method='POST')
def getListView():
    response.set_header('Content-Type', 'application/json')
    return getMultiView()


@route('/furetui/thumbnail/get', method='POST')
def getThumbnailView():
    response.set_header('Content-Type', 'application/json')
    return getMultiView()


@route('/furetui/form/get', method='POST')
def getFormView():
    response.set_header('Content-Type', 'application/json')
    data = loads(request.body.read())
    fields = data.get('fields')
    if fields is None:
        view = getView(data['viewId'])
        fields = view['fields']

    if data['new']:
        return superDumps([])

    return superDumps(getData(data['model'], [data['id']], fields))


@route('/furetui/init/required/data', method='POST')
def getInitRequiredData():
    response.set_header('Content-Type', 'application/json')
    return _getInitRequiredData()


@route('/furetui/client/logout', method='POST')
def getLogout():
    response.set_header('Content-Type', 'application/json')
    return _getInitRequiredData()


@route('/furetui/init/optionnal/data', method='POST')
def getInitOptionnalData():
    response.set_header('Content-Type', 'application/json')
    return _getInitOptionnalData()


@route('/furetui/data/update', method='POST')
def updateData():
    response.set_header('Content-Type', 'application/json')
    _data = []
    toUpdate = []
    toDelete = {}

    try:
        session = Session()
        for data in loads(request.body.read()):
            Model = MODELS[data['model']]
            if data['type'] == 'CREATE':
                obj = Model(**data['data'])
                session.add(obj)
                toUpdate.append((data['model'], data['fields'], obj))
            elif data['type'] == 'UPDATE':
                query = session.query(Model).filter(Model.id == data['dataId'])
                toUpdate.append((data['model'], data['fields'], query.one()))
                query.update(data['data'])
            elif data['type'] == 'DELETE':
                query = session.query(Model).filter(Model.id.in_(data['dataIds']))
                query.delete(synchronize_session='fetch')
                if data['model'] not in toDelete:
                    toDelete[data['model']] = data['dataIds']
                else:
                    toDelete[data['model']].extend(data['dataIds'])
            else:
                raise Exception('Unknown data update type %r' % data)

        session.commit()
        for model, fields, obj in toUpdate:
            _data.extend(_getData(session, model, [obj.id], fields))

        if toDelete:
            _data.append({
                'type': 'DELETE_DATA',
                'data': toDelete,
            })

    except:
        _data = []
        session.rollback()
        raise
    finally:
        session.close()

    return superDumps(_data)


@route('/')
def index():
    return static_file('index.html', root='./')


@route('/<filepath:path>')
def server_static(filepath):
    return static_file(filepath, root='./')


session = Session()
if session.query(Test).count() == 0:
    session.add(
        Test(**dict({
            'name': "todo 1",
            'creation_date': datetime.now(),
            'state': 'new',
            'number': 1.2345678,
            'url': 'http://furet-ui.readthedocs.io',
            'uuid': 'uuid---',
            'password': 'password',
            'color': '#36c',
            'text': '<div><p><em>Plop</em></p></div>',
            'bool': True,
            'time': time(1, 2, 3),
            'json': '{"a": {"b": [{"c": "d"}, {"e": "f"}]}}'
        }))
    )
    session.add(
        Test(**dict({
            'name': "todo 2",
            'creation_date': datetime.now(),
            'state': 'started',
            'number': 1.2345678,
            'url': 'http://furet-ui.readthedocs.io',
            'uuid': 'uuid---',
            'password': 'password',
            'color': '#36c',
            'text': '<div><p><em>Plop</em></p></div>',
            'bool': True,
            'time': time(1, 2, 3),
            'json': '{"a": {"b": [{"c": "d"}, {"e": "f"}]}}'
        }))
    )
    session.add(
        Test(**dict({
            'name': "todo 3",
            'creation_date': datetime.now(),
            'state': 'done',
            'number': 1.2345678,
            'url': 'http://furet-ui.readthedocs.io',
            'uuid': 'uuid---',
            'password': 'password',
            'color': '#36c',
            'text': '<div><p><em>Plop</em></p></div>',
            'bool': False,
            'time': time(1, 2, 3),
            'json': '{"a": {"b": [{"c": "d"}, {"e": "f"}]}}'
        }))
    )
    session.add(
        Test(**dict({
            'name': "todo 4",
            'creation_date': datetime.now(),
            'state': 'done',
            'number': 1.2345678,
            'url': 'http://furet-ui.readthedocs.io',
            'uuid': 'uuid---',
            'password': 'password',
            'color': '#36c',
            'text': '<div><p><em>Plop</em></p><p>Other line</p></div>',
            'bool': False,
            'time': time(1, 2, 3),
            'json': '{"a": {"b": [{"c": "d"}, {"e": "f"}]}}'
        }))
    )
    session.commit()

if session.query(Category).count() == 0:
    session.add(Category(name="Categ 1"))
    session.add(Category(name="Categ 2"))
    session.add(Category(name="Categ 3"))
    session.add(Category(name="Categ 4"))
    session.add(Category(name="Categ 4"))
    session.add(Category(name="Categ 6"))
    session.add(Category(name="Categ 7"))
    session.commit()

if session.query(Customer).count() == 0:
    customer = Customer(name="JS Suzanne", email="jssuzanne@anybox.fr")
    categories = session.query(Category).all()
    customer.categories = categories
    session.add(customer)
    session.add(Address(street="Anybox", zip="75007", city="Paris", customer=customer))
    session.add(Address(street="Some where", zip="76000", city="Rouen", customer=customer))
    session.commit()

session.close()
run(host='localhost', port=8080, debug=True)
