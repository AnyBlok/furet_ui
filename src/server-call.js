/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import xhr from 'xhr';
import {dispatchAll} from './store';

export const json_post = (url, datas, {onSuccess, onError, onComplete}) => {
    xhr.post('/furetui' + url, {sync: false, body: datas, json: true}, (err, resp) => {
        if (resp.statusCode == '200') {
            if (onSuccess) onSuccess(resp.body);
        } else {
            if (onError) onError(err, resp);
        }
        if (onComplete) onComplete(err, resp);
    });
}

export const json_post_dispatch_all = (path, params) => {
    json_post(path, params, {
        onSuccess: (results) => {
            dispatchAll(results);
        },
    })
}

export default {
    json_post,
    json_post_dispatch_all,
}
