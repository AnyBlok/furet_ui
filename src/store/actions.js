/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
export const UNITEST_CLEAR = ({ commit }) => {
    commit('CLEAR_CLIENT');
    commit('CLEAR_DATA');
    commit('CLEAR_GLOBAL');
    commit('CLEAR_LEFT_MENU');
    commit('CLEAR_RIGHT_MENU');
}
