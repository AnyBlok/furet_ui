import Client from '../client';
import plugin from '../../plugin';
import RaisedButton from 'material-ui/RaisedButton';


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
                        style={{marginTop: 100}}
                        label="Login" 
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
