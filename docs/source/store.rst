.. This file is a part of the FuretUI project
..
..    Copyright (C) 2014 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>
..
.. This Source Code Form is subject to the terms of the Mozilla Public License,
.. v. 2.0. If a copy of the MPL was not distributed with this file,You can
.. obtain one at http://mozilla.org/MPL/2.0/.

.. contents::

Reducer
=======

client
------

Add any information about a custom client::

    store.state.client: {
        ``custom view name``: {
            ``params of the custum view``,
        },
        ...
    }

UPDATE_CLIENT
~~~~~~~~~~~~~

Add params for a custom view::

    {
        type: 'UPDATE_VIEW_CLIENT',
        viewName: ``custom view name``,
        ``params ...``,
    }

CLEAR_CLIENT
~~~~~~~~~~~~

Clear all the params::

    {
        type: 'CLEAR_CLIENT'
    }


leftmenu, rightmenu
-------------------

It is the same for the both. The define dialog menu::

    store.state.[ leftmenu | rightmenu ] = {
        value: {
            label: ``label of the selected menu``,
            image: {
                type: [ font-icon ],
                value: ``value in function of type to display the image``,
            },
        },
        values: [
            {
                label: ``label of the selected menu``,
                description: ``Description of the menu``,
                image: {
                    type: [ font-icon ],
                    value: ``value in function of type to display the image``,
                },
                type: [ SPACE | CLIENT ]
                id: ``space id or custom view name in function of type value``
            },
        ],
    }

UPDATE_LEFT_MENU, UPDATE_RIGHT_MENU
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Update the menu definition or selected menu::

    {
        type: [ UPDATE_LEFT_MENU | UPDATE_RIGHT_MENU ],
        value: {
            label: ``label of the selected menu``,
            image: {
                type: [ font-icon ],
                value: ``value in function of type to display the image``,
            },
        },
        values: [
            {
                label: ``label of the selected menu``,
                description: ``Description of the menu``,
                image: {
                    type: [ font-icon ],
                    value: ``value in function of type to display the image``,
                },
                type: [ SPACE | CLIENT ]
                id: ``space id or custom view name in function of type value``
            },
        ],
    }

.. note::

    value and values is not required



CLEAR_LEFT_MENU, CLEAR_RIGHT_MENU
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Clear the menu::

    {
        type: [ CLEAR_LEFT_MENU | CLEAR_RIGHT_MENU ]
    }


global
------

Define the context of the application::

    store.state.global = {
        title: ``title of the application``,
        modal_custom_view: ``the current modal custom view``,
        breadscrumbs: [
            {
                path: ``the path of the previous action``,
                label: ``label display in the breadcrumb``,
                changes: ``the changes did during the action``,
                position: ``to order the Array``,
            },
            ...
        ],
    }

UPDATE_GLOBAL
~~~~~~~~~~~~~

Update the global values::

    {
        type: 'UPDATE_GLOBAL', 
        ``params``,
    }

.. warning:: 

    Used for title or modal_custom_view.


CLEAR_GLOBAL
~~~~~~~~~~~~

Clear all the parameter in global::

    {
        type: 'CLEAR_GLOBAL',
    }


ADD_IN_BREADSCRUMB
~~~~~~~~~~~~~~~~~~

Add new entry at the end of the breadcrumb::

    {
        type: 'ADD_IN_BREADSCRUMB',
        path: ``the path to save``,
        label: ``the label to display``,
        changes: ``the state data changes to save``,
    }

REMOVE_FROM_BREADSCRUMB
~~~~~~~~~~~~~~~~~~~~~~~

Remove the breadcrumb entries if the position is higther than the wanted position::

    {
        type: 'REMOVE_FROM_BREADSCRUMB',
        position: ``the position to delete``
    }

CLEAR_BREADSCRUMB
~~~~~~~~~~~~~~~~~

Clear all the breadcrumb entries::

    {
        type: 'CLEAR_BREADSCRUMB',
    }

data
----

Save all the data for furet_ui::

    store.state.data = {
        actions: {
            ``action id``: {
                label: ``Label of the action``,
                views: [
                    {
                        viewId: ``view id``,
                        type: ``type of view``,
                    },
                    ...
                ],
            },
            ...
        },
        views: {
            ``view's id``: {
                model: ``model's name``,
                ``view params which depend of the type of the view``
            },
        },
        data: {
            ``Model name``: {
                ``data id``: {
                    ``data``,
                    ...
                },
                ...
            },
            ...
        },
        changes: {
            new: {
                ``Model name``: {
                    ``data id``: [ 'DELETED' || { ``data`` } ],
                    ...
                },
                ...
            },
            ``Model name``: {
                ``data id``: [ 'DELETED' || { ``data`` } ],
                ...
            },
            ...
        },
        spaces: {
            left_menu: [
                ``menu params``,
                ...
            ],
            right_menu: [
                ``menu params``,
                ...
            ],
        }
    }

the left and right menu definition is the same::

    [
        {
            label: ``displayed label``,
            image: {
                type: [ 'font-icon' ],
                value: ``value of the icon``,             
            actionId: ``action id``,
            id: ``id of the menu``,                                                      
            submenus: [
                ``Same menu definition, to use the submenus don't put actionId``,
                ...
            ],                                                 
        },                                                                  


UPDATE_ACTION
~~~~~~~~~~~~~

Add action definition::

    {
        type: 'UPDATE_ACTION_MANAGER_ADD_ACTION_DATA',
        actionId: ``action id``
        label: ``Label of the action``,
        views: [
            {
                viewId: ``view id``,
                type: ``type of view``,
            },
            ...
        ],
    }


UPDATE_VIEW
~~~~~~~~~~~

Update the data of one view::

    {
        type: 'UPDATE_VIEW',
        viewId: ``view id``,
        model: ``model name``,
        ``params of the view``,
    }

UPDATE_DATA
~~~~~~~~~~~

Update the data::

    {
        type: 'UPDATE_DATA',
        model: ``Model name``,
        data: {
            ``data id``: {
                ``params``,
            },
            ...
        },
    }

DELETE_DATA
~~~~~~~~~~~

Delete some data::

    {
        type: 'DELETE_DATA',
        data: {
            ``Model name``: [
                ``data id``,
            ],
        },
    }

UPDATE_CHANGE
~~~~~~~~~~~~~

Modify current change::

    {
        type: 'UPDATE_CHANGE',
        model: ``Model name``,
        dataId: ``data id``,
        fieldname: ``name of the field``,
        value: ``new value to save``,
    }

REPLACE_CHANGE
~~~~~~~~~~~~~~

replace the change by another::

    {
        type: 'REPLACE_CHANGE',
        changes: ``object``,
    }

CLEAR_CHANGE
~~~~~~~~~~~~

replace the change by another::

    {
        type: 'CLEAR_CHANGE',
    }

CREATE_CHANGE_X2M
~~~~~~~~~~~~~~~~~

Add new change in the new entry, use by One2Many and Many2Many::

    {
        type: 'CREATE_CHANGE_X2M',
        model: ``model name``,
        dataId: ``id of the data to create``
    }

UPDATE_CHANGE_X2M
~~~~~~~~~~~~~~~~~

Modify current change in new if exist or in the normal place::

    {
        type: 'UPDATE_CHANGE_X2M',
        model: ``Model name``,
        dataId: ``data id``,
        fieldname: ``name of the field``,
        value: ``new value to save``,
    }

UPDATE_CHANGE_X2M_DELETE
~~~~~~~~~~~~~~~~~~~~~~~~

Remove the change in the new entry if exist else add the 'DELETED' in the nomal place for the model and the dataIds::

    {
        type: 'UPDATE_CHANGE_X2M_DELETE',
        model: ``Model name``,
        dataIds: [
            ``data id``,
            ...
        ],
    }

UPDATE_SPACE
~~~~~~~~~~~~

Update the space data::

    {
        type: 'UPDATE_SPACE',
        spaceId: ``
        left_menu: [
            ``menu params``,
            ...
        ],
        right_menu: [
            ``menu params``,
            ...
        ],
    }

CLEAR_DATA
~~~~~~~~~~

Clear all the data::

    {
        type: 'CLEAR_DATA'
    }

View definition for store
-------------------------

.. note::

    the params are different for each view type

List
~~~~

::

    label: ``label of the view``,
    model: ``model name``,
    creatable: ``true display the create button``,
    deletable: ``true display the delete button``,
    selectable: ``true display the check box``,
    onSelect: ``view id to use if the line is clicked``,
    headers: [
        {
            name: ``column name``,
            label: ``Label of the column``,
            component: ``the vue component name``
            sortable: ``true: the column is sortable``
            numeric: ``true the value is a numeric``
            invisible: ``condition to determinate if the field is displayed or not``
        },
        ...
    ],
    search: [
        {
            key: ``key used by the server to filter the data``,
            label: ``Label display of the key``,
            type: ``what ever if you need to split the filter``,
            operator: ``what ever if you want define this``,
            value: ``the value``,
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
        ...
    ],

Thumbnail
~~~~~~~~~

::

    label: ``label of the view``,
    model: ``model name``,
    creatable: ``true display the create button``,
    deletable: ``true display the delete button``,
    onSelect: ``view id to use if the line is clicked``,
    search: [
        {
            key: ``key used by the server to filter the data``,
            label: ``Label display of the key``,
            type: ``what ever if you need to split the filter``,
            operator: ``what ever if you want define this``,
            value: ``the value``,
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
        ...
    ],


.. note::

    For the template see the template page :ref:`template`


Form
~~~~

::

    label: ``label of the view``,
    model: ``model name``,
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
        ...
    ],


.. note::

    For the template see the template page :ref:`template`
