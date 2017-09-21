.. This file is a part of the FuretUI project                                   
..
..    Copyright (C) 2014 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>
..
.. This Source Code Form is subject to the terms of the Mozilla Public License,
.. v. 2.0. If a copy of the MPL was not distributed with this file,You can
.. obtain one at http://mozilla.org/MPL/2.0/.

.. contents::

RELEASE
=======

* FIX Many2One list field have not to display ``undefined`` when the field is
  empty
* FIX: removed the empty getters, because latest version of vuex fail if the
  getters methods object is empty
* FIX: in the route of the action, if come from relationship the in the params
  the entry relationship is ``true``
* IMP: list view add overflow-x when the view is to large
* IMP: Add tooltip on list header
* IMP: Add centerd option on column properties for list view
* IMP: Add default sort on list view
* FIX: b-checkbox-option became b-checkbox-item in buefy 0.5.2
* FIX: checkbox (buefy 0.5.2)
* FIX: b-modal (buefy 0.5.2)
* IMP: add colors in list view to overload the class of the tr in table
* ADD: Logo drawed by Audrey BRAUN

1.3.0 (2017-08-14)
------------------

* Pass route params when call ``/furetui/init/required/data``
* Add ``RELOAD`` command in dispatchAll, to reload all furetui
* FIX Field Boolean 
* Fix contant in Form / Thumbnail views
* FIX fields.common

1.2.0 (2017-07-23)
------------------

* Add two / way instance creation to allowed import oter component
* Add documention to start client

1.1.0 (2017-07-22)
------------------

* Fix some documentation
* Rename Text to RichText
* Add Field Text


1.0.0 (2017-07-22)
------------------

First release:

* Add some fields
* Add some views
* Add notifications
* Add vuejs, vuex, vue-i18n, vue-router
* Add Bulma, buefy
