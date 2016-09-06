from fabric.api import env, run, task, settings, cd, abort

env.user = 'root'
env.hosts = 'YOUR IP ADDRESS'

@task
def prod():
    '''
    Deploy to production
    '''
    print('Deploying to production')
    with settings(warn_only=True):
        with cd("/path/to/project"):
            run("git stash")
            run("git pull")
            run("npm install")
            run("gulp prod")
            run("rm -Rf /path/to/nginx/cache")
            run("gzip -9 public/js/main.js")
            run("gzip -9 public/css/style.css")
            run("mv public/js/main.js.gz public/js/main.js")
            run("mv public/css/style.css.gz public/css/style.css")
            run("aws s3 cp /path/to/project/public/js/main.js s3://YOURS3BUCKET/js/main.js --acl public-read  --metadata-directive REPLACE --cache-control 'max-age=2592000, public' --content-encoding 'gzip'")
            run("aws s3 cp /path/to/project/public/css/style.css s3://YOURS3BUCKET/css/style.css --acl public-read  --metadata-directive REPLACE --cache-control 'max-age=2592000, public' --content-encoding 'gzip'")
            run("aws s3 cp /path/to/project/public/img s3://YOURS3BUCKET/img --recursive  --acl public-read  --metadata-directive REPLACE --cache-control 'max-age=2592000, public'")
            run("pm2 restart PROJECTNAME")

@task
def deploy():
    '''
    Deploy to staging
    '''
    print('Deploying')
    with settings(warn_only=True):
        with cd("/path/to/project"):
            run("git stash")
            run("git pull")
            run("gulp sass")
            run("gulp js")
            run("pm2 restart PROJECTNAME")

@task
def bigdeploy():
    '''
    Deploy to staging with a `npm install`
    '''
    print('Deploying')
    with settings(warn_only=True):
        with cd("/path/to/project"):
            run("git stash")
            run("git pull")
            run("npm install")
            run("gulp sass")
            run("gulp js")
            run("pm2 restart PROJECTNAME")

@task
def lite():
    '''
    Deploy to staging without js, sass update
    '''
    print('Deploying')
    with settings(warn_only=True):
        with cd("/path/to/project"):
            run("git stash")
            run("git pull")
            run("pm2 restart PROJECTNAME")
