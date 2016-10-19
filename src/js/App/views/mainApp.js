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
			var dayTaskView;
		},
		initialize: function(){
			dayTaskCollection = new DayTaskCollection({model:new DayTaskModel});
			console.log('inside dayTaskview initialize ');
			this.listenTo(dayTaskCollection, 'add', this.addTask);
		},
		addTask: function(dayTaskModel){
			//todo
			var newDayTaskView = new DayTaskView({model: dayTaskModel});
			newDayTaskView.render();
			this.$el.append(newDayTaskView.el);
		},
		initializeView: function(){
				//Collection 
			var dayTaskData = [
				{description: "Pick up milk", status: false},
				{description: "get Car wash", status: false},
				{description: "get Training", status: false},
			];
			
			dayTaskCollection.reset(dayTaskData);
			
			var dayTaskView = new DayTaskMainView({collection: dayTaskCollection});
			//Recall that reset() is used for Collection not for views
			//dayTaskView.reset(dayTask);
			dayTaskView.render();
			//adding new model to Collection
			//Model 
			var dayTaskModel = new DayTaskModel({
				description: 'Life is Beautiful',
				status: false
			});
			//adding listener to Collection

			dayTaskCollection.add(dayTaskModel);
			//You need to add handler in View for this model addition to Collection
			//End of adding model to Collection
		}
	});

	return DayTaskMainView;
});