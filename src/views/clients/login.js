/**
This file is a part of the FuretUI project

   Copyright (C) 2017 Jean-Sebastien SUZANNE <jssuzanne@anybox.fr>

This Source Code Form is subject to the terms of the Mozilla Public License,
v. 2.0. If a copy of the MPL was not distributed with this file,You can
obtain one at http://mozilla.org/MPL/2.0/.
**/
import React from 'react';
import Client from '../client';
import plugin from '../../plugin';
import RaisedButton from 'material-ui/RaisedButton';
import translate from 'counterpart';

class Login extends Client {
    getData2Send () {
        return {};
    }
    onCallServer () {
        const data = this.getData2Send();
        this.json_post('/client/login', data, {
            onSuccess: (result) => {
                this.props.dispatchAll(result);
            },
        });
    }
    render () {
        return (
            <div className="container">
                <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-6 col-lg-offset-3">
                    <RaisedButton 
                        ref="button"
                        style={{marginTop: 100}}
                        label={translate('furetUI.views.clients.login.button', {fallback: 'Login'})}
                        fullWidth={true} 
                        primary={true}
                        onClick={this.onCallServer.bind(this)}
                    /> 
                </div>
            </div>
        );
    }
}

plugin.set(['views', 'type', 'client'], {Login});
export default Login;
