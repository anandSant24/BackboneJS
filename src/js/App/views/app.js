define(['jquery',
		'underscore',
		'backbone',
		'text!src/js/App/templates/mainTpl'
	],function($, _ ,Backbone, mainTpl){

	var DayTaskMainView = Backbone.View.extend({
		
		mainTemplate: _.template(),
		render: function(){
			console.log('Apps render function is called');
		},
		initialize: function(){
			console.log('inside dayTaskview initialize ');
		},
		addOne: function(){
			//todo
		}
	});

	return {
		DayTaskMainView : DayTaskMainView
	};
});