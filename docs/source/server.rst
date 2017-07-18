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
return list of store mutation. See the store page::

    [
        ``store mutation``
               OR / AND
        ``translation definition``
               OR / AND
        ``locale``
               OR / AND
        ``client path for vue-router``
    ]


``/furetui/init/required/data``
-------------------------------

First query called by FuretUI. The goal of this query is to initialize the client:

.. warning::

    Return quick data, allow to display quickly the UI


``/furetui/init/optionnal/data``
--------------------------------

Second call. The goal is to load heavy data to improve the client and allow a degradate
mode

.. note::

    The query can be slower than required data because the main data is already present and
    this application may be usable.

``/furetui/custom/view/<viewName>``
-----------------------------------

Called when the custom view is called, is not required to respond to this query

``/furetui/view/<viewId>``
--------------------------

Called when the view have been selected or changed.


``/furetui/space/<spaceId>``
----------------------------

Called when the view space been selected or changed.

optionnal values in body:

* spaceId
* menuId
* actionId
* viewId
* dataId
* mode

``/furetui/action/<actionId>``
------------------------------

Called when the view action been selected or changed.

optionnal values in body:

* spaceId
* menuId
* actionId
* viewId
* dataId
* mode

``/furetui/field/x2x/search``
-----------------------------

Call to by Many2One and Many2ManyTags to search the remote value

the value in body are:

* model
* value
* fields

.. warning:: 

    the wanted result is not a classical response

    {
        ids: [
            ``data id``,
            ...
        ],
        data: [
            ``store mutation``,
                   OR / AND
            ``translation definition``
                   OR / AND
            ``locale``
                   OR / AND
            ``client path for vue-router``
        ],
    }

``/furetui/list/x2m/get``
-------------------------

Call to by One2Many and Many2Many to get children values

the value in body are:

* model
* viewId
* dataIds

``/furetui/field/x2m/get/views``
--------------------------------

Call to by One2Many and Many2Many to get the children views

the value in body:

* viewIds

``/furetui/data/create``
------------------------

Call to save an unexisting data

the value in body are:

* model
* data
* changes: ``all the change not only for this data``
* fields
* path: ``optionnal``
    - spaceId
    - menuId
    - actionId
    - viewId

.. warning:: 

    Don't forget to change path to pass in RO mode


``/furetui/data/read``
----------------------

Call to read entries in function of filter

the value in body are:

* model
* viewId
* filter
* fields

``/furetui/data/read/<dataId>``
-------------------------------

Call to read only one entry

the value in body are:

* model
* viewId
* new
* fields

``/furetui/data/update``
------------------------

Call to save an existing data

the value in body are:

* model
* dataId
* data
* changes: ``all the change not only for this data``
* fields
* path: ``optionnal``
    - spaceId
    - menuId
    - actionId
    - viewId

.. warning:: 

    Don't forget to change path to use the good dataId and RO mode

``/furetui/data/delete``
------------------------

Call to remove an existing data

the value in body are:

* model
* dataIds

.. warning::

    Don't forget to call the mutation to remove the dataIds alse on furetui client

``/furetui/data/call``
----------------------

Call to remove an existing data

the value in body are:

* model
* search
* value

.. warning::

    It is not a classical response, the goal it to define the available filter
    for search view

Default route for login and logout
----------------------------------

The view can be overwriting this route can be deprecated.

``/furetui/client/login``
~~~~~~~~~~~~~~~~~~~~~~~~~

Call when the FuretUI user click on the ``connection`` button. The server may check
the identity of the user and this access rigth. The server:

``/furetui/client/logout``
~~~~~~~~~~~~~~~~~~~~~~~~~~

Call when the FuretUI user click on the ``Logout`` thumbnail. The server may close
the session of the user. The server:

.. warning::

    Dont forget to remove all the data
