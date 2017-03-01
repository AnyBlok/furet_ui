.. This file is a part of the FuretUI project                                   
..
..    Copyright (C) 2014 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>
..
.. This Source Code Form is subject to the terms of the Mozilla Public License,
.. v. 2.0. If a copy of the MPL was not distributed with this file,You can
.. obtain one at http://mozilla.org/MPL/2.0/.

API
===

ActionManager
-------------

Display left / rigth menu from space and add breadcrum.

|action_manager|

The breadcrum is a set of current actions

This composant is connected at Redux with the state ``action_manager``.

::

    import {ActionManager} from './action';

    <ActionManager 
        actionId={actionId (string, required)} 
        left_menu={left_menu (icon button or icon menu or icon drawer)}
        rigth_menu={rigth_menu (icon button or icon menu or icon drawer)}
    />


.. |action_manager| image:: _static/api/action-manager.png
    :alt: Action manager
