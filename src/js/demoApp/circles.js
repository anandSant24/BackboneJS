z//this app will simple moves the rectangle to the right upon click event
var Model = Backbone.Model.extend({});

var circleView = Backbone.View.extend({
	
	tagName: 'div',
	//to be able to move element className is must, as css is getting added to it
	events: {
		click: 'moveElement'
		//must declare a string as value for click 
		// click: moveElement() will NOT work
	},

	render: function(){
		var name="anand";
		this.setDimensions();
		this.setPosition();
		return this;
	},

	setDimensions: function(){
		this.$el.css({
			//you need to access model like this this.model.get('propertyName')
			// you cannot access it directly like this this.model.get(propertyName)
			// notice that we are not using string here
			width: this.model.get('width')+'px',
			height: this.model.get('height')+'px',
			'border-radius': this.model.get('border-radius')+'%',
			background: this.model.get('backgroundColor')
		});
		this.el.className = this.model.get('className');

	},

	setPosition: function(){
		var position = this.model.get('position');
		this.$el.css({		
			top: position.y,
			left: position.x
		});	
	},

	moveElement: function(){
		//inOrder to move the element that element position should be set to absolute
		
		/*var vh = window.innerHeight;
		var vw = window.innerWidth;
		var circlePosition =  this.$el.position().left;
		var circleWidth = this.$el.width();
		// here 20 is the y cordinate distance(kind of left distance) and circleWidth 
		positionLimit = vw - circlePosition - 20 -circleWidth;*/
		// viewportWidth - circlePosition - 20 -circleWidth sets the boundary
		// next I can make this transition smooth 
/*		for (; circlePosition <  positionLimit ;) {
			this.$el.css('left', this.$el.position().left + 10);
			circlePosition = this.$el.position().left;
		}*/


	}
});

//the the data can 
var circleModels = [
	new Model({
		width: 25,
		height: 25,
		'border-radius':50,
		backgroundColor:'#e8e8e8',
		position:{
			x: 20,
			y: 70
		},
		className: 'circle0'
	}),
	new Model({
	width: 25,
	height: 25,
	'border-radius':50,
	backgroundColor:'#080808',
	position:{
		x: 20,
		y: 110
	},
	className: 'circle1'
}),
	new Model({
	width: 25,
	height: 25,
	'border-radius':50,
	backgroundColor:'#DCCF1E',
	position:{
		x: 20,
		y: 150
	},
	className: 'circle2'
}),
	new Model({
	width: 25,
	height: 25,
	'border-radius':50,
	backgroundColor:'#BD5212',
	position:{
		x: 20,
		y: 190
	},
	className: 'circle3'
})
	];

//note that while passing model you can provide property of the model


//el is backbone's element
_.each(circleModels, function(circleModel){
		$('#rectangle').append(new circleView({model: circleModel}).render().el);
}); 