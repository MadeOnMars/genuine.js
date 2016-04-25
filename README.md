# Genuine.js 1.0.1
![david](https://david-dm.org/codekonami/genuine.js.svg)
### Introduction

Genuine.js is a framework for Front End developer to start projects with
the rights tools.

### Installation

#### Dependencies
You can launch the app directly by doing a **node app.js** but in order to release all the
power of **Genuine.js** you'd better installed **gulp** as well like so

```bash
npm install --global gulp
```

Then to install the dependencies do :

```bash
npm install
```

#### How to launch

The app depends on some ENV variables.

To launch the app on dev mode
```bash
export NODE_env=development
```

To choose the port (by default 3000)
```bash
export NODE_ENV_dev_port=3002
```
Example
```bash
NODE_env=development NODE_ENV_dev_port=3002 gulp server
```

Now you can browse to http://localhost:3002 and see the result

### Features

### Demo

### Vagrant

I love Vagrant. I've added a Vagrantfile and a bootstrap.sh which will generate everything you need.
The default IP is 172.28.128.49 and the nginx waits for a www.genuine.com.

So add this host below on your guest OS to see the website :

172.28.128.49 www.genuine.com

### Documentation

We added a simple command that generate a page automatically like this :

```bash
gulp add --page 'Mentions Légales' --slug mentions-legales --partial mentions-legales
```
This will generate the route, the controller file, the view file and even the js functions
to be able to develop right away.

For the rest, since it's built on top of Express.js you should check the Express doc.

### FAQ
> My brower doesn't refresh with Livereload as promised.

It seems there is an issue on Chrome see here :
https://github.com/livereload/livereload-extensions/issues/26

The solution is actually to open the developer mode.

### TODO

- If the route added through **gulp add --route somethings** finishes with an 's'
you can suppose that it will need some fake data coming from an API. So it will need
to copy/paste the articles.json for example.
