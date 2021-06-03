var express = require('express');
var app = express();
var fs = require('fs');
var port = process.env.PORT || 3002

//show the list of users

app.get('/listUsers', (req,res) => {
						
						fs.readFile("/home/uday/Documents/projects/users.json", 'utf8', (err, data) => {
						console.log(JSON.parse(data));
						res.end(data);

						})
		})

//add user
const user = {
   				"user4" : {
      						"name" : "samu",
      						"password" : "password4",
      						"profession" : "teacher",
      						"id": 4
   							}
			} 

app.post('/add', (req,res) => {
									fs.readFile("/home/uday/Documents/projects/users.json", 'utf8', (err,data) => {
									data = JSON.parse(data)
									data["user4"] = user["user4"]
									console.log(data)
									res.end(JSON.stringify(data))
	})
	
})

app.get('/:b&:c', (req,res) => {
						
						fs.readFile("/home/uday/Documents/projects/users.json", 'utf8', (err, data) => {

						var data = JSON.parse(data)
      					var user = data["user" + req.params.b]
      					var a = req.params.b + req.params.c
      					console.log(a)
      					res.end( JSON.stringify(user))

						})
		}) 

var server = app.listen(port, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})