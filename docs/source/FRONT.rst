.. This file is a part of the FuretUI project                                   
..
..    Copyright (C) 2014 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>
..
.. This Source Code Form is subject to the terms of the Mozilla Public License,
.. v. 2.0. If a copy of the MPL was not distributed with this file,You can
.. obtain one at http://mozilla.org/MPL/2.0/.

.. contents::

Front Matter
============

Information about the FuretUI project.

Project Homepage
----------------

FuretUI is hosted on `github <http://github.com>`_ - the main project
page is at http://github.com/AnyBlok/furet_ui. Source code is tracked here
using `GIT <https://git-scm.com>`_.

The most recent published version of this documentation should be at
http://furet-ui.readthedocs.io/en/latest/index.html.

Project Status
--------------

FuretUI is currently in development status and is expected to be fairly
stable.   Users should take care to report bugs and missing features on an as-needed
basis.  It should be expected that the development version may be required
for proper implementation of recently repaired issues in between releases;
the latest master is always available at https://github.com/AnyBlok/furet_ui/archive/master.zip.

Installation
------------

Install latest versions of FuretUI from github (need **npm**)::

    git clone https://github.com/AnyBlok/furet_ui.git
    cd furet_ui
    npm install
    npm run build-prod

..warning::

    ``build-prod`` return a minimify build


Unit Test
---------

Run the test with ``npm``::

    npm run test:unit


AnyBlok is tested using `Travis <https://travis-ci.org/AnyBlok/furet_ui>`_

Run the mock server fron the project::

    npm run build
    virtualenv develop
    source develop/bin/activate
    pip install -r requirement.txt
    python server.py


Contributing (hackers needed!)
------------------------------

FuretUI is at a very early stage, feel free to fork, talk with core dev, and spread the word!

Author
------

Jean-Sébastien Suzanne

Contributors
------------

`Anybox <http://anybox.fr>`_ team:

* Jean-Sébastien Suzanne
* Simon ANDRÉ
* Audrey BRAUN

Bugs
----

Bugs and feature enhancements to FuretUI should be reported on the `Issue 
tracker <https://github.com/AnyBlok/furet_ui/issues>`_.
