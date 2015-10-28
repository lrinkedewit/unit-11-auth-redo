#Authorization

##Summary
In this challenge you will be working with

###Learning Goals
- [ ] Understand basics of cookies and sessions
- [ ] Understand the purpose of different encryption methods and how they work
- [ ] Understand how headers play a role in authorization

##Cookies

##Sessions

##Bcrypt
![inline](http://3.bp.blogspot.com/-MZXxu6K5kmw/UpYnwO89WEI/AAAAAAAAAAU/gjQza5sXz48/s1600/password_hashing.png)

##Getting started

###Setup
- [ ] Run ```npm install``` to install server-side dependencies
- [ ] Run ```npm start``` to start your server. Open your browser to the following address:
````
http://localhost:3000/
````

###Testing
- [ ] Run ```npm test``` in your terminal to test your code
- [ ] Additionally, open your browser to the following address to view your application:
````
http://localhost:3000/
````

###Creating users
- [ ] Add route to handle POST requests to ```/users```
- [ ] Modifiy the ```.createUser``` middleware in the ```./server/user/userController.js``` file to create a user when a user sends a POST request
- [ ] If the POST request is successful, redirect to the ```/secret``` route
- [ ] Add a route that handles POST requests to ```/login```
- [ ] Modify the ```.verifyUser``` middleware in the ```./server/user/userController.js``` file to check if a user exists and the password is correct
- [ ] If the username cannot be found or the password is incorrect, they should be redirected to ```/signin```
````
http://localhost:3000/signup
````

###Create a cookie
- [ ] Create a cookie named 'codesmith' with the value of 'hi'
- [ ] Create a cookie named 'secret' with a value that is a random number generated from 0-99
- [ ] Create a cookie named 'ssid' with a value that is equal to the id of the user (mongoose creates an id for each user - you will need to implement a method to get the id of the user)

###Blocking certain pages
- [ ] Modify the ```authController``` middleware to verify if a user is valid and has an active session. If they do, they should have be able to access the following page:
````
http://localhost:3000/secret
````
- [ ] If they do not, they should be redirected to the signup page
````
http://localhost:3000/signup
````

###Bcrypting passwords
- [ ] We are going to add a hook that will run before any passwords are saved that will bcrypt passwords before they are saved. Add the bcrypt hook to ```/server/user/userModel```
- [ ] Have it so that when a new user is created their password is then bcrypted before being saved to the database
- [ ] When a user signs in implement, implement a method to compare their inputted password to the hashed password in the database

###Extension
- [ ] User passport.js
- [ ] Verify a user with JSON Web Tokens and local storage

###Resources and Links
- [https://www.safaribooksonline.com/blog/2014/03/10/express-js-middleware-demystified/](https://www.safaribooksonline.com/blog/2014/03/10/express-js-middleware-demystified/)

