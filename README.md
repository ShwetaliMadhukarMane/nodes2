# create frontend
<h6> See index.html file</h6>
<h6>For CSS Styles.css link in HTML and index.js </h6>
<h6> see app.js and routes.js</h6>

# create backend
<pre>use pgAdmin  for create data base for that already query includes in  Query.sql file
  For node js server code available in index.js file
  Make connection between node and pgAdmin .
  Time of the checking keep node js server on 
  Server ready at http://localhost:4000/
</pre>
# API
<p>
  #Ensure Docker is Running:

Open Docker Desktop and make sure it is running.
Open Command Prompt and navigate to your project directory:
cd path\to\your\project

#Start Docker Containers:

Ensure your docker-compose.yml file is in the current directory.
Run the following command to start your containers:
docker-compose up -d

#Install Node.js Dependencies:

Run the following commands in your project directory:
npm init -y
npm install express axios body-parser jsonwebtoken bcryptjs cors

#Run the Node.js Server:

Ensure your index.js file is in the current directory.
Run the server:
node index.js

#Test API Endpoints with Postman:

Open Postman.
Create a new POST request to http://localhost:3000/api/register.
Create a new POST request to http://localhost:3000/api/login.
Use the token received from login to test POST requests to http://localhost:3000/api/deposit and http://localhost:3000/api/withdraw.
</p>
