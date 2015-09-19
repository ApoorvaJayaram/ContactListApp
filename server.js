var express = require('express');
var app = express();
var mongojs = require('mongojs');
//name of the db and collection to be used
var db = mongojs('contactlist',['contactlist']);
var bodyParser = require('body-parser');

/*app.get('/',function (req,res){
	res.send("Hello world form server.js!!!");
});*/

app.use(express.static(__dirname + "/public"));//static here tells the server to look for static files ie, our html,javascript,image and css files coz they dont change dynamically.
app.use(bodyParser.json());
app.get('/contactlist',function(req,res){
	console.log("I received a get request!");
	db.contactlist.find(function(err,docs)
	{  
		console.log("Documents:::"+docs);
		res.json(docs);
	});
	/*person1 = {
		name : 'Tim',
		email : 'tim@email1.com',
		number : '(111) 111-1111'
	};
	person2 = {
		name : 'John',
		email : 'John@email2.com',
		number : '(222) 222-2222'
	};
	person3 = {
		name : 'Jerry',
		email : 'Jerry@email3.com',
		number : '(333) 333-3333'
	};
	var contactlist = [person1,person2,person3];
	res.json(contactlist);*/
});
//app.poost listens for the post request from the controller
app.post('/contactlist',function(req,res){
	console.log(req.body);
	db.contactlist.insert(req.body,function(err,doc)
	{
		res.json(doc);
	});
});
app.delete('/contactlist/:id',function(req,res)
{
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)},function(err,doc)
	{
		res.json(doc);
	});
});
app.get('/contactlist/:id',function(req,res)
{
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)},function(err,doc)
	{
		res.json(doc);
	});
});

app.put('/contactlist/:id',function(req,res){
	var id = req.params.id;
	console.log(req.body.name);
	db.contactlist.findAndModify(
	{
		query: {_id: mongojs.ObjectId(id)},//selects the contact to be modified
		update: {$set:{name:req.body.name,email:req.body.email,number: req.body.number}},
	new: true},
	function(err,doc){
		res.json(doc);
	
		
	});
});
app.listen(8000);
console.log("server running on the port 8000...");