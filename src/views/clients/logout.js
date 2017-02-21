import plugin from '../../plugin';
import {json_post} from '../../server-call';

plugin.set(['views', 'type', 'client'], {Logout: (props) => {
    json_post('/client/logout', {}, {
        onSuccess: (result) => {
            props.dispatchAll(result);
        },
    })
    return null
}});
