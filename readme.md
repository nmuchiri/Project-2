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


#RICK & MORTY 

### ERD

<div style="width: 640px; height: 480px; margin: 10px; position: relative;"><iframe allowfullscreen frameborder="0" style="width:640px; height:480px" src="https://lucid.app/documents/embeddedchart/d43b22ac-74c9-4d46-b22a-f3a8b038c847" id="-XMOk~0yhA_o"></iframe></div>


----------------------------------------------------------
### User Stories

The user will either sign up to create a new profile or log in to an already existing account. They will be directed to the home page with all characters where they can choose their favorite character. When they click on their profile, they will be able to view all their favorite characters. They will be able to delete any character they've favorited from their profile. 

The user will also be able to write notes about their favorite characters. 

----------------------------------------------------------
### Wireframes

![Alt text]("https://app.moqups.com/t5VBPubf3h/edit/page/ad64222d5")
![Alt text]("https://app.moqups.com/t5VBPubf3h/edit/page/a4d9d15c9")
![Alt text]("https://app.moqups.com/t5VBPubf3h/edit/page/aa44769b5")

----------------------------------------------------------








    








