define(['jquery',
		'underscore',
		'backbone',
		'src/js/App/models/dayTask',
		'text!src/js/App/templates/dayTaskTpl.html'
	],function($, _ ,Backbone, DayTaskModel, dayTaskTpl){

	var DayTaskView = Backbone.View.extend({
		
		mainTemplate: _.template(dayTaskTpl),
		
		render: function(){
			this.$el.html(this.mainTemplate(this.model.toJSON()));	
			return this;
		},
		
		initializeView: function(){	
			var dayTaskView = new DayTaskView({model : DayTaskModel});
			dayTaskView.render();
		}
	});

	return DayTaskView;
});