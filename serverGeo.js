const express = require('express') //import the express module
const app = express()    //create an instance for the express
const path = require('path') //import part module
const mongoose = require('mongoose') //importing mongoose library
//const url = 'mongodb+srv://Udaykiran:*********@uday.uuhmz.mongodb.net/peopledb?retryWrites=true&w=majority' //url to connect to db
const url = 'mongodb://localhost/peopledb'

const UserModel = require("./models/user") //importing the modeller

const router = express.Router() 
const port = process.env.PORT || 5000 // assigns a port no 5000, if 5000 not available, host assigns someother free port

mongoose.connect(url, {useNewUrlParser:true, useCreateIndex: true, useUnifiedTopology: true}) //databse connection
			.then(() => console.log("db connected...")) //on successful connection
			.catch((err) => console.log(err)) //if error throws error

app.use(express.json()) //helpful in parsing JSON
app.use(express.urlencoded({extended: true})) //helpful in parsing forms

/*app.engine('ejs', require('ejs').renderFile)*/
app.set('views', path.join('/home/uday/Documents/projects', 'views')) //we have to define the path where the views folder exist, (even __dirname() works)
app.set("view engine", "ejs") //set the template engine to ejs


//define routes for CRUD oeprtaions

app.get('/', (req,res) => {
	res.render('index')    //it renders the index.ejs where there is an html file to take input from user
})

app.post('/api/user', (req,res) => {			//writes the data into the collection

			const SaveUser = new UserModel({name: req.body.name,    //req.body contains the data from the client
							mobile: req.body.mobile,
							email: req.body.email,
							address:
							{ 	

								city: req.body.city, 
								state: req.body.state, 
								pincode: req.body.pincode, 
							},
								location: {coordinates: [Number(req.body.longitude), Number(req.body.latitude)]}
						       })
							

				
			SaveUser.save((error, savedUser)=>{
    			if(error) 
    				throw error
        		//res.send(savedUser)
        		console.log(savedUser)  //the posted user details are logged on console, we can verify
        		res.redirect('/') //after submitting the input, immediately it redirects to index page

						})
		})
						



app.get('/sort/desc', (req,res) => {      //defines the route to get the list of values
	UserModel.find({ }, (err,users) => {
		if (err)
			throw err
		res.json(users)

	}).sort({ createdAt: 'desc' }) //this method sorts the data in descending order
})

app.get('/:name', (req,res) => {  //route to display a specific data 
	UserModel.find({ name: req.params.name }, (err,users) => {  //req.params contain the paramaters in the URL
		if (err)
			throw err
		res.json(users)

	})
})
app.patch('/update/:name', (req,res) => {  //defining route for update
	UserModel.updateOne({
	 name: req.params.name }, { $set: { email: 'helga2@gmail.com' } }, (err,data) => {
		if (err)
			throw err
		res.json(data)
		console.log(data) //here i set it statically, but we can make it dynamic either in params or through input from a html page

	})

})


app.delete('/delete/:name', (req,res) => {
	UserModel.deleteOne({ name: req.params.name }, () => {
		res.end()
		console.log('deleted')
	}

	)
})

//function for distances from nearest to farthest sorted list, $geoWithin provides distances witout sorting
//mondodb allows us to use $nearSphere operator that returns the documents nearest to farthest
app.get('/distances/:longitude&:latitude', (req,res) => {
	UserModel.find({

			"location": { 
			 	$nearSphere: { 
			 		$geometry: {
			 			type: "Point", coordinates:[Number(req.params.longitude), Number(req.params.latitude)]}}}}, (err,users) => {
		if (err)
			throw err
		res.json(users)
		console.log(req.params.longitude)
		console.log(req.params.latitude)

	})

})  




app.listen(port, () => { 
	console.log('server running at:' + port) //listens to port assigned
})
