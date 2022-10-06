
var express = require('express');
var cors = require('cors')
var router = require('./router/router')
const helmet = require('helmet');

var app = express();

app.use(helmet());
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));


app.use('/', router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    // res.render('error');
});

app.listen(3000, () => {
    console.log("Server running on port 3000")
})