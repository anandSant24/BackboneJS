define(['jquery',
		'underscore',
		'backbone'
	],function($, _ ,Backbone){

	var DayTaskMainView = Backbone.View.extend({
		
		render: function(){
			console.log('Apps render function is called');
		},
		initialize: function(){
			console.log('inside dayTaskview initialize ');
		}
	});

	return {
		DayTaskMainView : DayTaskMainView
	};
});