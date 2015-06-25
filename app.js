var express = require('express');
var config = require('./config');
var url = require('url');
var http = require('http');

var app = express();

/* Include the app engine handlers to respond to start, stop, and health checks. */
app.use(require('./lib/appengine-handlers'));

app.get('/getdashboarddataforclient', function(req, res) {
	var query = url.parse(req.url, true).query;
	/*var options = {
	  host: 'default-dot-nmclvpoc.appspot.com',
	  path: '?productnum=' + query.clientid
	};*/

	callback = function(res) {
		  var str = '';

		  //another chunk of data has been recieved, so append it to `str`
		  res.on('data', function (chunk) {
			str += chunk;
		  });

		  //the whole response has been recieved, so we just print it out here
		  res.on('end', function () {
			console.log(str);
		  });
	}
	http.request(options, callback).end();
});

app.get('/getdashboarddataforclientproxy', function(req, res) {
	var query = url.parse(req.url, true).query;
	
	var client = getClient();
	client.products = getProducts();
	
	
	var dashboardData = {
		"client": client
	}
	
	res.header('Access-Control-Allow-Origin', '*');
    //res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    //res.header('Access-Control-Allow-Headers', 'Content-Type');
	
	res.status(200).send(JSON.stringify(dashboardData,null,3));
});


//proxy
function getProducts() {
	var products = [ { 
	      "product_id_num":1,
		  "product_num":100,
		  "product_type_cde":1,
		  "role_type_txt": "Insured",
		  "payment_amount":500,
		  "payment_freq":"Monthly",
		  "owner_type_cde":1,
		  "plan_txt":"Basic Med Life",
		  "benefit_amt":2000,
		  "total_value":15000,
		  "dividend_amt":600,
		  "loan_amt":1200
		  },
		  { 
	      "product_id_num":1,
		  "product_num":100,
		  "product_type_cde":1,
		  "role_type_txt": "Insured",
		  "payment_amount":500,
		  "payment_freq":"Monthly",
		  "owner_type_cde":1,
		  "plan_txt":"Basic Med Life",
		  "benefit_amt":2000,
		  "total_value":15000,
		  "dividend_amt":600,
		  "loan_amt":1200
		  }
		  ];
	return products;
}
function getClient() {
	var client = { 
	      "client_id":1,
		  "client_type_cde":1,
		  "taxpayer_id":"222-22-2222",
		  "full_name":"Ranjith Nair",
		  "email":"rj@gmail.com",
		  "birth_dte":"1/1/2000"
		  };
	return client;
}

app.get('/proxyforproduct', function(req, res) {
	
	res.setHeader('Content-Type', 'application/json');
	res.status(200).send(JSON.stringify(getProducts(),null,3));	  
});
app.get('/proxyforclient', function(req, res) {
	
	res.setHeader('Content-Type', 'application/json');
	res.status(200).send(JSON.stringify(getClient(),null,3));	  
});

var server = app.listen(config.port, '0.0.0.0', function() {
  console.log('App listening at http://%s:%s', server.address().address, server.address().port);
  console.log("Press Ctrl+C to quit.");
});
      
