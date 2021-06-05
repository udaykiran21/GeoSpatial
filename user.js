const mongoose = require("mongoose") //Importing mongoose
const Schema = mongoose.Schema

const UserSchema = new Schema({			//define the schema
	
	name: { type: String }, 	//declare the type for every key
	mobile: { type: Number, unique: true }, //unique true makes sure that mobile number is unique for every entry
	email: { type: String },
	
	address:
	
	{ 	
		
		city:  { type: String }, 
		state:  { type: String }, 
		pincode: { type: Number}
	},
		
	
		location: {					//GeoJson cooridnates format
			type: {type: String, default: 'Point'}, //point type coordinates
				coordinates: [Number]
			}
			  		
	},


 { timestamps : true })  // timestamps enable us to include createdAt, updatedAt

UserSchema.index({location: "2dsphere"}) //GeoJson location type as 2dsphere

module.exports = mongoose.model("user", UserSchema) //exporting the model, so that, it can be imported in controller handle
