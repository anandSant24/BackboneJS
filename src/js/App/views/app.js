define(['jquery',
		'underscore',
		'backbone',
		'src/js/App/models/dayTask',
		'text!src/js/App/templates/mainTpl.html'
	],function($, _ ,Backbone, DayTaskModel, mainTpl){

	var DayTaskMainView = Backbone.View.extend({
		el : '#container',
		mainTemplate: _.template(mainTpl),
		render: function(){
			this.$el.html(this.mainTemplate(this.model));	
			console.log('Apps render function is called');
		},
		initialize: function(){
			console.log('inside dayTaskview initialize ');
		},
		addOne: function(){
			//todo
		},
		initializeView: function(){
			
			var dayTaskView = new DayTaskMainView({model : DayTaskModel});
			dayTaskView.render();
		}
	});

	return {
		DayTaskMainView : DayTaskMainView
	};
});