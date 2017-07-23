.. This file is a part of the FuretUI project                                   
..
..    Copyright (C) 2014 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>
..
.. This Source Code Form is subject to the terms of the Mozilla Public License,
.. v. 2.0. If a copy of the MPL was not distributed with this file,You can
.. obtain one at http://mozilla.org/MPL/2.0/.

.. contents::

Add FuretUI in your own project
===============================

FuretUI don't give a final web client, You have to create the **html** page.
In this page you must:

* 1) create page: (css, html, js)
* 2) load furetui components
* 3) load your own components
* 4) create the FuretUI Client

Example::

    <!DOCTYPE html>
    <html>
        <head>
            <meta http-equiv="content-type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"/>
            <title>Your title</title>
            <!--
                Your css files
            -->
        </head>
        <body>
            <!-- the entry point of the client -->
            <div id="anyblok-furetui-app"></div>
            <!--
                Your js files
            -->
            <!--
                Furet UI bundles
            -->
            <!--
                Your components for FuretUI
            -->
            <!-- creation of the client -->
            <script type="text/javascript">
                createFuretUIClient('#anyblok-furetui-app');
            </script>
        </body>
    </html>

