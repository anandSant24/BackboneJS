define(['backbone'],function(Backbone){
	var DayTask = Backbone.Model.extend({
		defaults:{
			'description':'Enter your task',
			'status': 'false'
		}
	});
	var dayTask = new DayTask();
	
	console.log('inside dayTask model ');
	return DayTask;
});