define(['src/js/App/models/dayTask'],function(DayTask){

	var DayTaskList = Backbone.Collection.extend({
		model: DayTask
	});
	
	console.log('inside dayTaskList collection ');
	
	// NO revealing modeule pattern bcs of unable to create instance, need to find actual problem here
	return DayTaskList;

});
