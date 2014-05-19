

module.exports = function(app){
    app.get('/partials/:partialPath', function(req, res){//config para angular de jade
        res.render('partials/' + req.params.partialPath);
    });

    app.get('*', function(req, res){//atrapar todas las llamadas a index
        res.render('index');
    });
}