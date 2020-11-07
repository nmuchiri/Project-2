# Express Auth Boilerplate

* create a node app
    npm i -y init
* .gitignore
     echo "node_modules" >> .gitignore
* install and set up express
    npm i express
* Stubbed out GET/auth/login, GET/auth/signup, POST auth/login, POST auth/signup
* configured the auth controller   
* Make a views folder and in it make an auth folder where you have the login and signup views
* Make and ejsLayouts file in the views folder    
    run npm i ejs to install ejs
* set up the routes and send to see if they work
    usually we will do a res.send to send a string just to see if the route is working and then we can res.render the view page we're working with
* set up express ejs and ejs-layouts
    npm i ejs express-ejs-layouts

* Set up sequelize to create databases
    npm i sequelize pg
    sequelize init

    ### EXPRESS AUTH BOILERPLATE
     1. fork and clone
     2. Install dependencies
     npm i

     3.Create a config.json with the following code;

     {
  "development": {
    "database": "<insert develop db name here>",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "database": "<insert test db name here>",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "database": "<insert production db name here>",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
*** note:***** if your database requires a username and password, you'll need to include these fields as well

     4. Create a database
     sequelize db:create <insert db name here>

     5. Migrate the `user` model to database
     sequelize db:migrate

     6. Add a 'SESSION_SECRET' and 'PORT' environment variable in a '.env' file

     7. run 'nodemon' to start app



    








