import xhr from 'xhr';

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

export default {
    json_post,
}
