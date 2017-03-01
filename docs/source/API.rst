.. This file is a part of the FuretUI project                                   
..
..    Copyright (C) 2014 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>
..
.. This Source Code Form is subject to the terms of the Mozilla Public License,
.. v. 2.0. If a copy of the MPL was not distributed with this file,You can
.. obtain one at http://mozilla.org/MPL/2.0/.

API
===

Render the application, need the providers for theme and redux storage

|api|

::

    import App from './app':
    
    <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
            <App />
        </MuiThemeProvider>
    </Provider>

..warning::

    All the component under App need to be under the provider.


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


Action
------

Render one action and on view

::

    import {Action} from './action';

    <Action
        actionId={actionId (string, required)}
        model={model (string)}
        viewId={viewId (string)}
        views={[{actionId (string, required), viewId (string, required)}, ...]}
        disabled={disabled (boolean)}
    />

Picture
-------

Render a picture, the picture can be come from:

* svg-icon: Material design icon
* font-icon: font-awesome class

::

    import {Picture} from './picture';

    <Picture type="font-icon" value="fa-user" iconSize="fa-3x" />
    or
    <Picture type="svg-icon" value="ActionAndroid" style={{height: 48, width: 48}} />


.. |action_manager| image:: _static/api/action-manager.png
    :alt: Action manager

.. |app| image:: _static/api/app.png
    :alt: App
