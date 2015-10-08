#!/usr/bin/env bash

# TODO : Try to integrate this in the bootstrap
#http://www.sitepoint.com/configuring-nginx-speed-ghost-blog/
apt-get update
apt-get install -y nginx
apt-get install -y git
apt-get install -y curl
curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -
apt-get update
apt-get install -y nodejs

mkdir /home/app
ln -fs /vagrant /home/app/public
mkdir /home/app/logs
touch /home/app/logs/error.log
touch /home/app/logs/access.log
sed -i 's/sendfile on;/sendfile off;/g' /etc/nginx/nginx.conf
echo '127.0.0.1 www.genuine.com' >> /etc/hosts

echo 'server {
    listen 0.0.0.0:80;
    server_name genuine.com www.genuine.com;
    access_log /home/app/logs/access.log;
    error_log /home/app/logs/error.log;

    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header HOST $http_host;
        proxy_set_header X-NginX-Proxy true;

        proxy_pass http://127.0.0.1:3000;
        proxy_redirect off;
    }
}' > /etc/nginx/sites-available/app
rm /etc/nginx/sites-enabled/default
ln -s /etc/nginx/sites-available/app /etc/nginx/sites-enabled/app

service nginx restart

cd /home/app/public
sudo rm -Rf node_modules
sudo cp package.json /home/vagrant/
cd /home/vagrant
sudo npm install -g gulp
sudo npm install -g forever
sudo npm install

ln -s /home/vagrant/node_modules /home/app/public/node_modules

cd /home/app/public
gulp sass
gulp js

forever start --uid "app" /home/app/public/app.js
