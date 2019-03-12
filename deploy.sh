#!/usr/bin/env bash

# file to upload
FOLDER_NAME="dist/*"

#env, ssh remote, work dir
ENV_PRO="pro"
SSH_HOST_PRO="finbtc@47.244.103.100"
WORK_DIR_PRO="/home/finbtc/workspace/coinbull-console"
RUM_PARAM_PRO=" --env pro "

# ssh remote
ENV_TEST="test"
SSH_HOST_TEST="finbtc@192.168.0.202"
WORK_DIR_TEST="/home/finbtc/workspace/console_web"
RUM_PARAM_TEST=" --env test "

function upload() {
    # upload folder
    scp -r ${FOLDER_NAME} $1:$2
    ret=$?
    if [[ ${ret} -ne 0 ]] ; then
        echo 'Failed to scp folder'
        return 1
    fi
}

function deploy() {
    if [ "$1" = "${ENV_PRO}" ]; then
        SSH_HOST=${SSH_HOST_PRO}
        WORK_DIR=${WORK_DIR_PRO}
        RUN_PARAM=${RUM_PARAM_PRO}
    elif [ "$1" = "${ENV_TEST}" ]; then
        SSH_HOST=${SSH_HOST_TEST}
        WORK_DIR=${WORK_DIR_TEST}
        RUN_PARAM=${RUM_PARAM_TEST}
    else
        # TODO: local
        echo "Unknown env: $1"
        exit
    fi

    # upload jar and deploy.sh
    echo "*******Start to upload*******"
    upload ${SSH_HOST} ${WORK_DIR}
    ret=$?
    if [[ ${ret} -ne 0 ]] ; then
        echo 'Failed to upload files'
        exit ${ret}
    fi
}

if [ "$1" = "${ENV_TEST}" ]; then
    deploy $1
elif [ "$1" = "${ENV_PRO}" ]; then
    deploy $1
else
    echo "miss argument!"
fi

