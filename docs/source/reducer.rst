.. This file is a part of the FuretUI project
..
..    Copyright (C) 2014 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>
..
.. This Source Code Form is subject to the terms of the Mozilla Public License,
.. v. 2.0. If a copy of the MPL was not distributed with this file,You can
.. obtain one at http://mozilla.org/MPL/2.0/.

Reducer
=======

Middleware
----------

The middle allows to send the data to sync to the server.

::

    dispatch({type: 'TO_SEND'})


Used as a reducer, this command loop on each element to sync and send it to the server
if the server is not available, the middleware retry after a minute. When the data is
synced. The middleware remove the entry of the current state.

.. note::

    If the server is not available, FuretUI use the data in the state.change.toSync
    as the real data. It is a degradate mode.


action_manager
--------------

Display the current action of the space and other action come from the breadcrumb::

    {
        actions: [
            ``action id``,
            ...
        ],
        action_data: {
            ``action id``: {
                label: ``Label of the action``,
                viewId: ``current view id``,
                views: [
                    {
                        viewId: ``view id``,
                        type: ``type of view``,
                    },
                    ...
                ],
            },
            ...
        }

UPDATE_ACTION_MANAGER_ADD_ACTION
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Add new action in the breadcrumb::

    dispatch({
        type: 'UPDATE_ACTION_MANAGER_ADD_ACTION',
        actionId: ``action id``,
    });

UPDATE_ACTION_MANAGER_REMOVE_FROM_ACTION
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Remove action ids since the given action id::

    dispatch({
        type: 'UPDATE_ACTION_MANAGER_REMOVE_FROM_ACTION',
        action: ``action id``
    });

RESET_ACTION_MANAGER
~~~~~~~~~~~~~~~~~~~~

Clear the actions entry::

    dispatch({type: 'RESET_ACTION_MANAGER'});

UPDATE_ACTION_MANAGER_ADD_ACTION_DATA
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Add action definition::

    dispatch({
        type: 'UPDATE_ACTION_MANAGER_ADD_ACTION_DATA',
        actionId: ``action id``
        label: ``Label of the action``,
        viewId: ``current view id``,
        views: [
            {
                viewId: ``view id``,
                type: ``type of view``,
            },
            ...
        ],
    });

CLEAR_ACTION_MANAGER
~~~~~~~~~~~~~~~~~~~~

Clear the entries actions and action_data::

    dispatch({type: 'CLEAR_ACTION_MANAGER'});


action
------

The action represent the current state of the display for each action as:

* view
* data id
* readonly
* ...

the data is save in dict::

    actions = {
        ``action id``: {
            ``params``
        }
    }


UPDATE_ACTION_SELECT_VIEW
~~~~~~~~~~~~~~~~~~~~~~~~~

Update the dict, called by::

    dispatch({
        type: 'UPDATE_ACTION_SELECT_VIEW',
        actionId: ``action id``,
        ``params``
    });


UPDATE_NEW_ID
~~~~~~~~~~~~~

Replace the **id** entry in params. Use in the case of create, the tempory id must
be replaced by the real id::

    dispatch({
        type: 'UPDATE_NEW_ID',
        data: [
            {
                oldId: ``id to replace``,
                newId: ``new id``,
            },
            ...
        ]
    });

CLEAR_ACTION
~~~~~~~~~~~~

Clear all the action in the dict::

    dispatch({type: 'CLEAR_ACTION'})

change
------

Record all the change in the data::

    change: {
        current: {
            ``Model name``: {
                ``data id``: [ 'DELETED' || { ``data`` } ],
                ...
            },
            ....
        },
        toSync: [
            {
                uuid: ``an uuid``,
                state: [ toSend | Sent ],
                data: [
                    {
                        model: ``Model name``,
                        type: [ CREATE | UPDATE | DELETE ],
                        dataId: ``data id only if type in CREATE or UPDATE``,
                        dataIds: [
                            ``data id only if type is DELETE``,
                            ...
                        ],
                        fields: [
                            ``Field name only if type in CREATE or UPDATE``,
                            ...
                        ],
                        data: {
                            ``params``
                        },
                    },
                ],
            },
            ...
        ],
        computed: {
            ``Model name``: {
                ``data id``: [ {``data``} | 'DELETED' ],
                ...
            },
            ....
        },
        currents: {
            ``action id``: {
                ``Model name``: {
                    ``data id``: [ 'DELETED' || { ``data`` } ],
                    ...
                },
                ....
            },
            ....
        },
    }


* **current**: is the current unsaved change
* **toSync**: The saved change to sync
* **computed**: The saved change merged, waiting the sync and used by Furet UI, offline mode
* **currents**: unsaveed change for another action

ON_CHANGE
~~~~~~~~~

Modify current unsaved change::

    dispatch({
        type: 'ON_CHANGE',
        model: ``Model name``,
        dataId: ``data id``,
        fieldname: ``name of the field``,
        newValue: ``new value to save``,
        fields: ``field to read by the server, only for one2many fields``,
    });


ON_CHANGE_DELETE
~~~~~~~~~~~~~~~~

Mark an id for a model as 'DELETED'::

    dispatch({
        type:'ON_CHANGE_DELETE',
        model: ``model's name``,
        dataIds: [
            ``data id to mark as DELETED``
            ...
        ],
    });


CLEAR_CHANGE
~~~~~~~~~~~~

Reset the current unsaved change::

    dispatch({type: 'CLEAR_CHANGE'})


CLEAR_ALL_CHANGES
~~~~~~~~~~~~~~~~~

Clear all current and currents::

    dispatch({type: 'CLEAR_ALL_CHANGES'})


ON_SAVE
~~~~~~~

Put the current unsaved change in the toSync entry and computed entry to simulate the save::

    dispatch({
        type: 'ON_SAVE',
        uuid: ``uuid ``,
        model: ``Model name in the main model``,
        dataId: ``data id of the main model``,
        newData: ``true is new entry, false is an update``,
        fields: [
            ``field name``,
            ...
        ],
    })

ON_DELETE
~~~~~~~~~

Add in the toSync and computed::

    dispatch({
        type: 'ON_DELETE',
        uuid: ``uuid ``,
        model: ``Model name in the main model``,
        dataIds: [
            ``data id of the main model``,
            ...
        ],
    })

SYNC
~~~~

Change the state (toSend => Sent) of one entry in toSync::

    dispatch({
        type: 'SYNC',
        uuid: ``uuid``,
    })


.. note::

    call by the middleware before sync the data

UNSYNC
~~~~~~

Change the state (Sent => toSend) of one entry in toSync::

    dispatch({
        type: 'UNSYNC',
        uuid: ``uuid``,
    })


.. note::

    call by the middleware after sync the data, if the server is not available

SYNCED
~~~~~~

Remove the entry from toSync and recompute the computed entry::

    dispatch({
        type: 'SYNCED',
        uuid: ``uuid``,
    })


.. note::

    call by the middleware after sync the data, if the server is available

ADD_CURRENTS
~~~~~~~~~~~~

Save the current unsaved in the currents data, use for breadcrumb::

    dispatch({
        type: 'ADD_CURRENTS',
        actionId: ``id of the action which has the current unsaved``
    });

.. note::

    after this command the current unsaved will be empty

REVERT_CHANGE
~~~~~~~~~~~~~

Revert the current unsaved by the value in currents in function of actionId. The 
currents will be clean in function of actionId and actionIds::

    dispatch({
        type: 'REVERT_CHANGE',
        actionId: ``id of action to get``,
        actionIds: [
            ``id of action to clean``,
        ]
    });


UPDATE_NEW_ID
~~~~~~~~~~~~~

Replace the **id** entry in:

* current: ``data id`` or value for a fieldname,
* currents: ``data id`` or value for a fieldname,
* toSync: **dataId**, **dataIds** or value for a fieldname,

The goal is to replace a created object tempory id by the real id::

    dispatch({
        type: 'UPDATE_NEW_ID',
        data: [
            {
                oldId: ``id to replace``,
                newId: ``new id``,
            },
            ...
        ]
    });


.. warning::

    the key 'UPDATE_NEW_ID' is use in to reducer action and change.


client
------

Add any information about a custom client::

    client: {
        ``custom view name``: {
            ``params of the custum view``,
        },
        ...
    }

UPDATE_VIEW_CLIENT
~~~~~~~~~~~~~~~~~~

Add params for a custom view::

    dispatch({
        type: 'UPDATE_VIEW_CLIENT',
        viewName: ``custom view name``,
        ``params ...``,
    });

CLEAR_CLIENT
~~~~~~~~~~~~

Clear all the params::

    dispatch({type: 'CLEAR_CLIENT'});

data
----

Save the data from the server to use it in FuretUI::

    data: {
        ``Model name``: {
            ``data id``: {
                ``data``,
                ...
            },
            ...
        },
        ...
    }

UPDATE_DATA
~~~~~~~~~~~

Update the data::

    dispatch({
        type: 'UPDATE_DATA',
        model: ``Model name``,
        data: {
            ``data id``: {
                ``params``,
            },
            ...
        },
    });

DELETE_DATA
~~~~~~~~~~~

Delete some data::

    dispatch({
        type: 'DELETE_DATA',
        data: {
            ``Model name``: [
                ``data id``,
            ],
        },
    });

CLEAR_DATA
~~~~~~~~~~

Delete all the data::

    dispatch({type: 'CLEAR_DATA'})

global
------

Define the context of the application::

    global = {
        title: ``title of the application``,
        custom_view: ``the current custom view``,
        modal_custom_view: ``the current modal custom view``,
        spaceId: ``the current space id``,
    }

.. warning::

    custom_view and spaceId can not be filled together

UPDATE_GLOBAL
~~~~~~~~~~~~~

Update the global values::

    dispatch({type: 'UPDATE_GLOBAL', ``params``});

CLEAR_GLOBAL
~~~~~~~~~~~~

Clear all the parameter in global::

    dispatch({type: 'CLEAR_GLOBAL'});

leftmenu, rightmenu
-------------------

It is the same for the both. The define dialog menu::

    [ leftmenu | rightmenu ] = {
        value: {
            label: ``label of the selected menu``,
            image: {
                type: [ font-icon | svg-icon ],
                value: ``value in function of type to display the image``,
            },
        },
        values: [
            {
                label: ``label of the selected menu``,
                description: ``Description of the menu``,
                image: {
                    type: [ font-icon | svg-icon ],
                    value: ``value in function of type to display the image``,
                },
                type: [ space | CLIENT ]
                id: ``space if or custom view name in function of type value``
            },
        ],
    }

UPDATE_LEFT_MENU, UPDATE_RIGHT_MENU
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Update the menu definition or selected menu::

    dispatch({
        type: [ UPDATE_LEFT_MENU | UPDATE_RIGHT_MENU ],
        value: {
            label: ``label of the selected menu``,
            image: {
                type: [ font-icon | svg-icon ],
                value: ``value in function of type to display the image``,
            },
        },
        values: [
            {
                label: ``label of the selected menu``,
                description: ``Description of the menu``,
                image: {
                    type: [ font-icon | svg-icon ],
                    value: ``value in function of type to display the image``,
                },
                type: [ space | CLIENT ]
                id: ``space if or custom view name in function of type value``
            },
        ],
    });

.. note::

    value and values is not required



CLEAR_LEFT_MENU, CLEAR_RIGHT_MENU
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Clear the menu::

    dispatch({type: [ CLEAR_LEFT_MENU | CLEAR_RIGHT_MENU ]});

spaces
------

Information for the current space::

    space = {
        left_menu: [
            ``menu params``,
            ...
        ],
        right_menu: [
            ``menu params``,
            ...
        ],
        spaceId: ``id of the space``
        menuId: ``id of the menu``,
        actionId: ``id of the action``,
        viewId: ``id of the view``,
        custom_view: ``name of the custom view``,
    }

.. note::

    all the menu have the same definition::

        {
        },



UPDATE_SPACE
~~~~~~~~~~~~

Update the space data::

    dispatch({
        type: 'UPDATE_SPACE',
        left_menu: [
            ``menu params``,
            ...
        ],
        right_menu: [
            ``menu params``,
            ...
        ],
        spaceId: ``id of the space``
        menuId: ``id of the menu``,
        actionId: ``id of the action``,
        viewId: ``id of the view``,
        custom_view: ``name of the custom view``,
    });

CLEAR_SPACE
~~~~~~~~~~~

Clear the space and put the default value::

    dispatch({type: 'CLEAR_SPACE'});

view
----

Give the information of the view::

    view = {
        ``view id``: {
            ``params``,
            ...
        },
        ...
    }

.. note::

    the params are different for each view type

List
~~~~

::

    label: ``label of the view``,
    creatable: ``true display the create button``,
    deletable: ``true display the delete button``,
    selectable: ``true display the check box``,
    onSelect: ``view id to use if the line is clicked``,
    headers: [
        {
            name: ``column name``,
            type: ``column type [ Integer | String | ... ]``,
            label: ``Label of the column``,
        },
        ...
    ],
    search: [
        {
            key: ``key used by the server to filter the data``,
            label: ``Label display of the key``,
            default: ``if field it will be a default value``,
        },
        ...
    ],
    buttons: [
        {
            label: ``Label of the button``,
            buttonId: ``id of the button``,
        },
        ...
    ],
    onSelect_buttons: [
        {
            label: ``Label of the button``,
            buttonId: ``id of the button``,
        },
        ...
    ],
    fields: [
        ``column name``,
    ],

Thumbnail
~~~~~~~~~

::

    label: ``label of the view``,
    creatable: ``true display the create button``,
    deletable: ``true display the delete button``,
    onSelect: ``view id to use if the line is clicked``,
    search: [
        {
            key: ``key used by the server to filter the data``,
            label: ``Label display of the key``,
            default: ``if field it will be a default value``,
        },
        ...
    ],
    template: ``template definition``,
    buttons: [
        {
            label: ``Label of the button``,
            buttonId: ``id of the button``,
        },
        ...
    ],
    fields: [
        ``column name``,
    ],


.. note::

    For the template see the template page


Form
~~~~

::

    label: ``label of the view``,
    creatable: ``true display the create button``,
    deletable: ``true display the delete button``,
    editable: ``true display the edit button``,
    onClose: ``view id to use if the close button is clicked``,
    template: ``template definition``,
    buttons: [
        {
            label: ``Label of the button``,
            buttonId: ``id of the button``,
        },
        ...
    ],
    fields: [
        ``column name``,
    ],


.. note::

    For the template see the template page


UPDATE_VIEW
~~~~~~~~~~~

Update the data of one view::

    dispatch({
        type: 'UPDATE_VIEW',
        viewId: ``view id``,
        ``params of the view``
    });


CLEAR_VIEW
~~~~~~~~~~

Clear all the views data::

    dispatch({type: 'CLEAR_VIEW'});
