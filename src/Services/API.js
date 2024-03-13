import axios from 'axios';
import * as _ from 'lodash';

const get = (path, query, res, rej, ending) => {
    return new Promise((pRes, reject) => {
        axios.get(path, { params: query })
            .then(response => {
                const stdResponse = {
                status: response.status,
                statusText: response.statusText,
                result: _.get(response, 'data.result', response.data)
                };
                if (res) res(stdResponse);
                pRes(stdResponse);
            }, err => {
                console.log(`ERR GET ${path}: `, err);
                if (rej) rej(err);
                reject(err);
            })
            .finally(() => {
                if (ending) ending();
            });
    });
};

const post = (path, body, res, rej, ending) => {
    return axios.post(path, body)
        .then(response => {
            const stdResponse = {
                status: response.status,
                statusText: response.statusText,
                result: _.get(response, 'data.result', response.data)
            };
            if (res) res(stdResponse);
        })
        .catch(err => {
            console.log(err);
            const errResponse = err.response;
            const stdError = {
                status: _.get(errResponse, 'status', 501),
                statusText: _.get(errResponse, 'statusText', ''),
                result: _.get(errResponse, 'data.result', 'No Reason')
            };
            if (rej) rej(stdError);
        })
        .finally(() => {
            if (ending) ending();
        });
};

const patch = () => {

};

const put = () => {

};

const delPost = () => {

};

export {
  get,
  post,
  patch,
  put,
  delPost
};