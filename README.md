# Genuine.js 1.3.4
![david](https://david-dm.org/codekonami/genuine.js.svg)
### Introduction

Genuine.js is a framework to start projects with
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

#### Add a page

We added a simple command that generate a page automatically like this :

```bash
gulp page --name 'About us'
```
This will generate the route **about-us**, the partial view file **about-us.ejs** and even the js functions
to be able to develop right away.

You decide which slug and filename you want to use. Just do this:
```bash
gulp page --name 'About us' --slug about --partial about-file
```

#### Add a content type

Content type will basically be your menu sections. Let's say you are doing a website for a restaurant. There is plenty of chance that you will need a "Menus" category with all your entries.

So do generate all the things for this new content type just type :

```bash
gulp generate --type 'menus'
#The type should only be letters. No '-' or '_'
```

Then do add you new entries, it's pretty similar to pages

```bash
gulp add --type 'menus' --name 'King Menu' --slug king-menu --partial king-menu
```

In fact 'Pages' is a content type too so if you do a :

```bash
gulp add --type 'pages' --name 'About us' --slug about --partial about-file
```

It will do the exact same thing that a :

```bash
gulp page --name 'About us' --slug about --partial about-file
```

Everything should make sense now, right?

For the rest, since it's built on top of Express.js you should check the Express doc.

### FAQ
> My brower doesn't refresh with Livereload as promised.

It seems there is an issue on Chrome see here :
https://github.com/livereload/livereload-extensions/issues/26

The solution is actually to open the developer mode.

### TODO

- Find a way to manage css dependencies
- Generate Nav automatically
- Automatic plan du site
- Add production README explanation
- Add Dockerfile
