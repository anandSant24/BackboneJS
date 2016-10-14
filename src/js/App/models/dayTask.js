define([],function(){
	var DayTask = Backbone.Model.extend({
		defaults:{
			'descriptions':'Enter your task',
			'status': false
		}
	});
console.log('inside dayTask model ');
	
	return {
		model: DayTask
	};
});