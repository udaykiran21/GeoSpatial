# GeoSpatial
Geospatial web app
Build a REST API to make some querying (CRUD operations)
Assuming NodeJS , ExpressJS, Mongodb, Compass GUI are already installed
#############
Lets start with defining Mongoose Schema
steps: 
--> import mongoose and create the schema
const mongoose = require("mongoose") //Importing mongoose
const Schema = mongoose.Schema
---> define the type of items to be inserted into documents
const UserSchema = new Schema({key: type, ... })
Here, the details of residents are defined
name: String
number: Number,
location: {type: { type: String, default: 'Point'}, {coordinates: [Number]}} /define GeoJSON coordinates format
make timestamps: true as true to record createdAt, updatedAt
Export this file so that they can be imported in the controller handle
Save this file as model.js in models folder

####################
Now, crerate a views folder and add index.ejs. This is essentially to develop views handle (to render UI)
ejs - embeded javascript template is a template engine to render UI files

--> define labels and inputs for various fields to write them into Database, with a submit button
Save the file.

###################
Now, create a file for controller handle that is server.js
--> import the module 'express' and create an instance to use them in the application
Imprt the other modules like 'mongoose', 'path' and also the modeller file

Connect to the database with
mongoose.connect(url, callback())


app.use(express.json()) //helpful in parsing JSON
app.use(express.urlencoded({extended: true})) //helpful in parsing forms

now set the template engine to ejs
app.set('views', file_path)//views folder path
app.set('view engine', ejs) //renders ejs file

--> create the routes for desired CRUD operations
//route to render the index.ejs
app.get('/', (req,res) => {
	res.render('index')    //it renders the index.ejs where there is an html file to take input from user
})

//route to post the data
app.post('/user', callback().save())  //dynamic user input is possible on browser through html page

//route to display the documents in descending order of createdAt
app.get('sort/desc', callback() => UserModel.find({}).sort({ createdAt: 'desc' })

//route to update the documets by searching a name in the URL
app.patch('update/:name', callback() => UserModel.UpdateOne({name:req.params.name}, {$set: {key: values}}, callback())

//route to delete the document by searching a name in the URL
app.delete('/delete/:name', callback()=>{UserModel.deleteOne({name:req.params.name}, callback())}

//route to fine the distances from the given coordinates
//mongodb offers some indexes to perform this operation
app.get('/distances/:longitude&:latitude', (req,res) => {
	UserModel.find({
			"location": { 
			 	$nearSphere: { 
			 		$geometry: {
			 			type: "Point", coordinates:[Number(req.params.longitude), Number(req.params.latitude)]}}}}, callback())

//listen to port assigned

app.listen(port, () => { 
	console.log('server running at:' + port) //listens to port assigned
})

############

Go to console terminal
--$node /server.js
when a successful connection is made, go to web browser and enter the URI :http://127.0.0.1:port (port is the defined port number)

--the form for user input appears, then quickly add the details of residents and submit them

Testing the application:
-- Launch the Postman application.
-- Enter the URI to perform the various operations
route http://127.0.0.1:port/sort/desc -- displays the userlist in descending order according to createdAt
rout http://127.0.0.1:port/distances/45.17&12.45 -- displays the nearest to farthest users from the coordinates (12.45, 45.17) //in geojson, first coordinate is longitude and second cooridnate is latitude)



