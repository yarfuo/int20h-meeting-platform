#!/usr/bin/env sh
echo SECRET_KEY=$SECRET_KEY >> .env
echo REACT_APP_SERVICE_URL=$REACT_APP_SERVICE_URL >> .env
echo LETSENCRYPT_EMAIL=$LETSENCRYPT_EMAIL >> .env
echo DOMAIN=$DOMAIN >> .env
echo SUBDOMAIN=$SUBDOMAIN >> .env

echo FRONTEND_IMAGE=$IMAGE:client  >> .env
echo API_IMAGE=$IMAGE:api  >> .env
