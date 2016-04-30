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

First you need to create a local-config.js file to declare your local ENV vars.

```bash
cp local-config-sample.js local-config.js
```

Now you can launch the project like so
```bash
gulp server
```

You can browse to http://localhost:3000 and see the result

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

- Add multi languages
- Review the gulp method
- Generate nav automatically
