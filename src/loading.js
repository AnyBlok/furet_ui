/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';

export default class extends React.Component {
    render () {
        return (
            <div className="container">
                <h1><i className="fa fa-spinner fa-spin fa-lg fa-fw"></i>Loading ...</h1>
            </div>
        );
    }
}
