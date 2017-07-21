/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import Vue from 'vue';
import {router} from '../../routes';
import {store} from '../../store';
import {Logout} from '../../views/clients/logout';
jest.mock('../../server-call')

describe('App component', () => {
    beforeEach(() => {
        store.dispatch('UNITEST_CLEAR');
    });
    it('Render App with default value from store', () => {
        Logout({router})
    });
});
