requirejs.config({
	baseUrl: '../',
	paths: {
		'text': 'src/js/lib/text',
		'jquery': 'src/js/lib/jquery-1.11.3',
		'underscore': 'src/js/lib/underscore',
		'backbone': 'src/js/lib/backbone'
	}
});

require(['src/js/App/views/mainApp'],function(App){
	var app = new App.DayTaskMainView();
	app.initializeView();
});