var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
// views is directory for all template files
app.engine('html', require('ejs').renderFile);
  
app.get('*', function(req, res){
	     res.sendFile(__dirname + '/public/index.html');
	     });

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


