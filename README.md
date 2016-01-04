#Authorization

##Summary
In this challenge you will be learning about how to authenticate users and authorize which data they get access to - a crucial part of every modern web application.

You will do that by creating cookies to send to browser and creating sessions to verify the cookies. After that you will be encrypting your stored passwords with bcrypt in order to keep your user information secure.

###Learning Goals
- [ ] Understand the basics of cookies and sessions
- [ ] Understand the purpose of different encryption methods and how they work
- [ ] Understand how headers play a role in authorization
- [ ] Gain exposure to server side templating

##Cookies
![](http://s.ravelrumba.com/uploads/2010/02/cookie-header-image1.png)

A cookie is a small amount of data that is stored in the browser. When a cookie is set in the browser, it is then sent with every request to the server. That means the server can 'remember' the user's previous activity by inspecting the information stored in the cookie. Cookies allow websites to maintain state - that is, to persist information even as the page reloads. We'll use them here for maintaining a user's credentials.

##Sessions
Sessions are used to validate whether a user (with the proper cookies) should be logged into their account. A user receives a cookie when they successfully login to their account. Whenever the user visits the site again, the server verifies the user's cookie, uses that information to determine if the user has a session, and then can redirect the request appropriately (either to a login page if they're not logged in or the requested resource if they are logged in).

##Bcrypt
It is not safe to assume that your data is impenetrable (by hackers, curious and/or disgruntled employees). Therefore it is essential not to store passwords (and other sensitive data) in plain text. If somebody gains access to your data, not only will they be able to login to your account for your site, but consumers also generally use the same password for many sites, and therefore the attacker will have access to those accounts as well. A standard way to ensure that information is not readily readable is by encrypting the data:

![](https://i-msdn.sec.s-msft.com/dynimg/IC168364.gif)

A special key is used encrypt and encrypt the information. However, because the same key is used to encrypt and decrypt, an attacker who gains access to the key (or guesses it) will be able to decrypt all the passwords. Therefore, one-way encryption (cryptographic hash function) is used.

![](https://upload.wikimedia.org/wikipedia/commons/2/2b/Cryptographic_Hash_Function.svg)

However, attackers utilize a list of the most common passwords, randomly encrypts them, and then compares it to values in the database. As soon as an attack figures out the cryptographic hash function, then the attacker can apply the same hash function to all passwords.

![](http://3.bp.blogspot.com/-MZXxu6K5kmw/UpYnwO89WEI/AAAAAAAAAAU/gjQza5sXz48/s1600/password_hashing.png)

Bcrypt was developed to reduce the effectiveness of rainbow tables. Passwords are encrypted with a random string (known as a salt). The string that is encrypted is no longer a common password (since there a random string of characters following it). As long as the salt is known for a specific password, the original password can then be generated.

##EJS
We will also be working with [EJS](https://github.com/tj/ejs), an html templating library that creates web pages with variable content on the server end.

![](http://www.michaelgallego.fr/images/posts/2012-11-26-client-side-1.png)

Unlike Single Page Applications (SPA) - where part of the pages is generated after the HTML file is rendered to the page via AJAX, the HTML (and DOM) is fully constructed on the server end. There are many templating libraries out there:

 - Jade
 - EJS
 - Handlebars
 - Mustache

We will be working with EJS to generate static HTML pages.

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
- [ ] Add route to handle POST requests to ```/signup```
- [ ] Modify the ```userController.createUser``` middleware in the ```./server/user/userController.js``` file to create a user from the client's request. Users require the following properties:
````
{
  username: [String]
  password: [String]
}
````
- [ ] If the POST request is successful, redirect to the ```/secret``` route
- [ ] If the POST request body is unsuccessful, display the error message (look into [server-side templating](https://github.com/mde/ejs))
- [ ] Add a route that handles POST requests to ```/login```
- [ ] Modify the ```userController.verifyUser``` middleware in the ```./server/user/userController.js``` file to check if a user exists and the password is correct
- [ ] If the username cannot be found or the password is incorrect, they should be redirected to ```/signin```
````
http://localhost:3000/signin
````

###Create a cookie
- [ ] Inside of ```cookieController.setCookie```, create a cookie named 'codesmith' with the value of 'hi' that should be set with all requests
- [ ] Inside of ```cookieController.setCookie```, create a cookie named 'secret' with a value that is a random number generated from 0-99 that should be sent with all requests
- [ ] Inside of ```cookieController.setSSIDCookie```, create a cookie named 'ssid' with a value that is equal to the id of the user (mongoose creates an id for each user - you will need to implement a method to get the id of the user)

###Sessions
- [ ] Create a session when a user creates an account. A session has the following properties:
````
cookieId: [String]
````
The cookieId is equal the to the value of the cookie named ```ssid``` (which is equal to the user's id).
- [ ] Create a session when a user logins to an account

###Blocking certain pages
- [ ] Modify the ```sessionController.isLoggedIn``` middleware to verify if a user has a cookie with the name "ssid" and it has an active session. If they do, they should have be able to access the following page:
````
http://localhost:3000/secret
````
- [ ] If they do not, they should be redirected to the signup page
````
http://localhost:3000/signup
````

###Bcrypting passwords
We are going to add a hook that will run before any passwords are saved that will bcrypt passwords before they are saved.
- [ ] Have it so that when a new user is created their password is then bcrypted before being saved to the database. Hint: check out [Mongoose Middleware](http://mongoosejs.com/docs/middleware.html)
- [ ] When a user signs in, implement a method to compare their inputted password to the hashed password in the database

###Extension
- [ ] Use [passport](http://passportjs.org/) to create a local session when a user signs up or logs in
- [ ] Verify a user with [JSON Web Tokens](https://en.wikipedia.org/wiki/JWT) and local storage

##Resources and links
- [http://kestas.kuliukas.com/RainbowTables/](http://kestas.kuliukas.com/RainbowTables/)
- [https://www.nczonline.net/blog/2009/05/05/http-cookies-explained/](https://www.nczonline.net/blog/2009/05/05/http-cookies-explained/)
