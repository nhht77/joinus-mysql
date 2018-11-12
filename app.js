const mysql      = require('mysql'),
      express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser');
 
var connection = mysql.createConnection({
  host:         'localhost',
  port:         8889,
  user:         'root',
  password:     'root',
  database:     'join_us'
});
 
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
    let q = "SELECT COUNT(*) AS Count FROM users";
    connection.query(q, (err, results, field) => {
        if (err) throw err;
        
        let count = results[0].Count;
        res.render('index', {count: count});
    })
})

app.post('/register', (req, res) => {
    let person = {
        email: req.body.email
    };

    let q = "INSERT INTO users SET ?";

    connection.query(q, person, (err, results, field) => {
        res.redirect('/');
    })
})

app.listen(3000, () => console.log('Server is running on port 3000'));