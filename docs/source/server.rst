.. This file is a part of the FuretUI project                                   
..
..    Copyright (C) 2014 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>
..
.. This Source Code Form is subject to the terms of the Mozilla Public License,
.. v. 2.0. If a copy of the MPL was not distributed with this file,You can
.. obtain one at http://mozilla.org/MPL/2.0/.

.. contents::

Client / Server Api
===================

All the route use the **POST** method and the **JSON** rendering. They must all 
return list of redux action. See the reducers page.

``/furetui/init/required/data``
-------------------------------

First query called by FuretUI. The goal of this query is to initialize the client:

* Left / Right menus
* Data
* ...

.. warning::

    Return quick data, allow to display quickly the UI


``/furetui/init/optionnal/data``
--------------------------------

Second call. The goal is to load heavy data to improve the client and allow a degradate
mode:

* Internalization
* template
* offline data
* ...

.. note::

    The query can be slower than required data because the main data is already present and
    this application may be usable.

``/furetui/client/login``
-------------------------

Call when the FuretUI user click on the ``connection`` button. The server may check
the identity of the user and this access rigth. The server:

* return the state of the user connection
* Spaces
* Actions
* the current space, view, action, custom view, ...
* views
* ...

``/furetui/client/logout``
-------------------------

Call when the FuretUI user click on the ``Logout`` thumbnail. The server may close
the session of the user. The server:

* CLEAR or RESET some state
* Reinit the client data
* ...

``/furetui/view/<viewId>``
--------------------------

Must return the view definition, the ``viewId`` is the identifiant.

``/furetui/list/get``, ``/furetui/thumbnail/get``
-------------------------------------------------

Return the data of the view, the body containt:

* model
* filter
* fields (may be null)
* viewId

Must return:

* Data from fields of the model in function of filter
* data id in function of filter
* ...

``/furetui/form/get``
---------------------

Return the data of the view, the body containt:

* model
* new (boolean)
* fields (may be null)
* Identity of the data
* viewId

Must return:

* Data from fields of the model in function of filter
* ...

``/furetui/space/<spaceId>``
----------------------------

Return the space:

* Space
* Main action of the Space
* Main View of the Main Action of the Space
* ...

``/furetui/action/<actionId>``
------------------------------

Return the action:

* action
* Main View of the Action
* ...

``/furetui/data/update``
------------------------

Update, Create or Delete datas.

The api must return:

* The updated data
* ...

``/furetui/field/x2x/open``
-----------------------------

Call to get the information of a new action to display the relation ship in the breadcrum, the current parameter:

* model: model of the relation ship
* actionId: action id, if the action is defined
* value: id of the relation ship

return:

* Action data
* model data for the value
* ...

``/furetui/field/x2x/search``
-----------------------------

Call to get available value for the x2One field:

* model: model of the x2One
* field: field name in the model to display
* limit: number of data to get
* value: text from the input to filter the data

return:

* model data filtered by the value
* ...
