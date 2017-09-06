'use strict';

const usdocker = require('@usdocker/usdocker');
//const path = require('path');

const SCRIPTNAME = 'postgres';

let config = usdocker.config(SCRIPTNAME);
let configGlobal = usdocker.configGlobal();
const CONTAINERNAME = SCRIPTNAME + configGlobal.get('container-suffix');

function getContainerDef() {

    let docker = usdocker.dockerRunWrapper(configGlobal);
    return docker
        .containerName(CONTAINERNAME)
        .port(config.get('port'), 5432)
        .volume(config.get('folder'), '/var/lib/postgresql/data')
        .env('TZ', configGlobal.get('timezone'))
        .env('POSTGRES_USER', config.get('user'))
        .env('POSTGRES_PASSWORD', config.get('password'))
        .isDetached(true)
        .isRemove(true)
        .imageName(config.get('image'))
    ;
}

module.exports = {
    setup: function(callback)
    {
        config.setEmpty('image', 'postgres:9-alpine');
        config.setEmpty('folder', config.getDataDir());
        config.setEmpty('user', 'postgres');
        config.setEmpty('password', 'password');
        config.setEmpty('port', 5432);

        //config.copyToUserDir(path.join(__dirname, 'postgres', 'conf'));
        //config.copyToDataDir(path.join(__dirname, 'postgres', 'data'));

        callback(null, 'setup loaded for ' + SCRIPTNAME);
    },

    debugcli(callback) {
        let result = usdocker.outputRaw('cli', getContainerDef());
        callback(result);
    },

    debugapi(callback) {
        let result = usdocker.outputRaw('api', getContainerDef());
        callback(result);
    },

    up: function(callback)
    {
        usdocker.up(CONTAINERNAME, getContainerDef(), callback);
    },

    status: function(callback) {
        usdocker.status(CONTAINERNAME, callback);
    },

    down: function(callback)
    {
        usdocker.down(CONTAINERNAME, callback);
    },

    restart: function(callback)
    {
        usdocker.restart(CONTAINERNAME, getContainerDef(), callback);
    },

    client: function(callback, extraArgs)
    {
        usdocker.exec(CONTAINERNAME, ['psql'].concat(extraArgs), callback);
    },

    connect: function(callback, extraArgs)
    {
        usdocker.exec(CONTAINERNAME, ['bash'].concat(extraArgs), callback);
    }
};
