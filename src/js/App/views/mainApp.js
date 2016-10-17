define(['jquery',
		'underscore',
		'backbone',
		'src/js/App/collection/dayTaskList',
		'src/js/App/views/app',
		'src/js/App/models/dayTask',
		'text!src/js/App/templates/mainTpl.html'
	],function(
		$,
		_ ,
		Backbone,
		DayTaskCollection,
		DayTaskView,
		DayTaskModel,
		mainTpl){

	var DayTaskMainView = Backbone.View.extend({
		el : '#container',
		mainTemplate: _.template(mainTpl),
		render: function(){
			this.collection.forEach(this.addTask,this);
			//this.$el.html(this.mainTemplate(this.model.toJSON()));	
			console.log('Apps render function is called');
			//return this;
		},
		initialize: function(){
			console.log('inside dayTaskview initialize ');
		},
		addTask: function(dayTaskModel){
			//todo
			var newDayTaskView = new DayTaskView({model: dayTaskModel});
			newDayTaskView.render();
			this.$el.append(newDayTaskView.el);
		},
		initializeView: function(){
			
			//Model 
			var dayTaskModel = new DayTaskModel();

			//Collection 
			var dayTaskData = [
				{description: "Pick up milk", status: false},
				{description: "get Car wash", status: false},
				{description: "get Training", status: false},
			];
			var dayTaskCollection = new DayTaskCollection();
			dayTaskCollection.reset(dayTaskData);
			
			var dayTaskView = new DayTaskMainView({collection: dayTaskCollection});
			//Recall that reset() is used for Collection not for views
			//dayTaskView.reset(dayTask);
			//
			dayTaskView.render();
		}
	});

	return {
		DayTaskMainView : DayTaskMainView
	};
});