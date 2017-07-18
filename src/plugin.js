/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
class Plugin {
    constructor () {
        this.plugs = {};
    }
    set (paths=[], obj) {
        const recPlugs = (plugs, _paths) => {
            if (_paths.length == 0) {
                Object.assign(plugs, obj);
            } else {
                if (! plugs[_paths[0]]) plugs[_paths[0]] = {};
                recPlugs(plugs[_paths[0]], _paths.slice(1))
            }
        };
        recPlugs(this.plugs, paths)
    }
    get (paths=[]) {
        const recPlugs = (plugs, _paths) => {
            if (_paths.length == 1) {
                return plugs[_paths[0]];
            } else {
                return recPlugs(plugs[_paths[0]] || {}, _paths.slice(1))
            }
        };
        return recPlugs(this.plugs, paths)
    }
}

const plugin = new Plugin();
export default plugin;
