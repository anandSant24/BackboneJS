Backbone anatomy
----------------

	created by Jermey Ashkenas
	who believed in getting the truth out of DOM

	BackboneJS provides client side app structure to oranize
	Provides models to represent DataStructure
	View to hook up model into DOM
	synchronize data to/from server

To create a model class
var TodoItem= Backbone.Model.extend({});

To create model instance
var todoitem = new TodoItem({description:'pick up milk',status:'incomplete', id:1});

To get an attribte
todoitem.get('description');

To set an attribute
todoitem.set({status: 'complete'});

syn to server
todoitem.save();

Server 				Client
(data)     -----> 	Models ---provides data --> View ---build HTML --->DOM

To create a view Class

var TodoView = Backbone.View.extend({});

var todoView = new TodoView({model: todoitem});

var TodoView = Backbone.View.extend({
	render: function(){
		var html = '<h3>'+ this.model.get('description') + '</h3>';
		$(this.el).html(html);
	}
});
note: Every View has a top level ELement

instantiate view
todoView = new TodoView({model: todoItem});

todoView.render();
console.log(todoView.el);

Result: <div> 
			<h3>Pick up milk</h3>
		</div>

===================
 level 2: 	MODELS
===================
Reviewing models
----------------
	Generating a model class
		var TodoItem  = Backbone.Model.extend({});

	Generating a model instance
		var todoItem = new TodoItem({description: 'pick up milk'});

	to get an attribute
		todoItem.get('description');

	to set an attribute
		todoitem.set(status,'complete');

Fetching data from Server
-------------------------

var todoItem = new TodoItem();

	URL to get JSON data for model
		todoItem.url = '/todos';

	To populate model from server
		todoItem.fetch();
		todoitem.get('description');

	var todoItem = Backbone.Model.extend({urlRoot:'/todos'});

	Fetch todo with id:1
	--------------------
	var todoItem = new TodoItem({id:1});
	todoItem.fetch(); //GET/todos/1
	//{ id: 1, description: 'Pick up milk'}

	Update the todo
	---------------
	todoItem.set({description: 'Pick up cookies'});
	todoItem.save();// PUT /todos/1 with JSON params

Creating and Destroying a new Todo
----------------------------------

	var todoItem = new TodoItem();
	todoItem.set({'description','fill prescription'});
	todoItem.save(); //POST /todos with JSON params

	todoItem.get('id'); // 2
	todoItem.destroy(); //DELETE /todos/2

	Get JSON from model
	todoItem.toJSON();

Default Values
--------------

var TodoItem = Backbone.Model.extend({
	defaults:{
		descriptions: 'empty todo..',
		status: 'incomplete'
	}
});


var todoItem = new TodoItem();

todoItem.get('description');//empty todo..
todoItem.get('status')//incomplete


Model can have Events
---------------------

	To listen for an event on a model
	
	todoItem.on('event-name', function(){
		alert('event name happend');
	});

	run the event
	todoItem.trigger('event-name');

Special Events
--------------

	To listen for changes:
		todoItem.on('change', doThing);

		var doThing = function(){...};
	Event triggered on change:
		todoItem.set({description:'new event coming'});
	Set without triggering event
		todoItem.set({description:'silent secret'},{silent:true});
	Remove event listner
	    todoItem.off('change',doThing);

	BUILT IN EVENTS
	---------------
	change --		When an attribute is modified
	change: <attr> 	when <attr> is modified
	// ex: appointment.on(change:cancelled, funciton(){})
	destroy: 		when a model is destroyed
	sync:			whenever successfully synced
	error			when model save or validation fails
	all				Any triggered event

Exercise:

While create a default values to Date: bug is every appointment you create has the same exact date, instead of date and time when appointment is created
Ex: 
		var Appointment  = Backbone.Model.extend({
				defaults:{
				date: new Date()
			}
		});

This is because new Date is evaluate only once 

When the model is first creeated and not re-evaluated every time a new instance is created.

TO FIX THIS YOU NEED TO ASSIGN A FUNCTION TO DEFAULTS INSTEAD OF PLAIN OBJECT
Ex:
	var getDefaults  = function(){
		defaults:{
			date: new Date()
		}
	};

	var Appointment = Backbone.Model.extend({
			defaults: getDefaults
	});

NOW
---
	var Appointment = Backbone.Model.extend({urlRoot: '/appointments'});
	var appointment = new Appointment({id:1});
	appointment.fetch();
GOOD DAY COMPLETED LEVEL 2 BUT STILL GOT MANY THINGS TO BE DONE

===================
  level 3: 	VIEW
===================

var SampleView = Backbone.View.extend({});
var simpleView = new SampelView();
console.log(simpleView.el);
// <div></div> this is the default tag for the el when you don't specify any tag

var SimpleView = Backbone.View.extend({tagName:'li'});
var sampleView = new SimpleView();
console.log(sampleView.el);
// <li></li>
 tagName can be any HTML tag

var TodoView = Backbone.View.extend({
	tagName:'article',
	id:'todo-view',
	className: 'todo'
});

var todoView = new TodoView();
console.log(todoView.el);
//<article id="todo-view" class="todo"> </article>


I want to use jQuery method
$('#todo-view').html();

el is a DOM element

$(todoView.el).html(); 
or use shortcut
todoView.$el.html();
Good since el's id can be dynamic

Using template
--------------

var TodoView = Backbone.View.extend({
	//Backbone comes with the underscore library
	template: _.template('<h3><%= description %></h3>');

	render: function(){
		var attributes = this.model.toJSON();
		this.$el.html(this.template(attributes));
	}
});

var todoView = new TodoView({model: todoItem});
todoView.render();
console.log(todoView.el);

Adding View Events
------------------

in jQuery to handle click we do
var alertStatus = function(){
	alert('Hey you clicked  h3');
};

$('h3').click(alertStatus);
THIS IS NOT HOW WE DO IN BACKBONE
* in Backbone View are respoinsible for any user interaction, so they are defined inside of View
var todoView = Backbone.View.extend({
	
	events:{
	/* "<event> <selector>" : "method" */
	"click h3":"alertStatus" 
	},

	alertStatus: function(e){
		alert('clicked h3');
  	}

}); 
Backbone handle this like this, jQuery delegate method
Selector is scoped to the el 
this.$el.delegate('h3','click',alertStatus);


var DocumentView = Backbone.View.extend({
	
});

Challenge 5:

alert the user the title of the appointment whenever they click on its view

var AppointmentView = Backbone.View.extend({
	template: _.template('<span><%=title %></span>'),
	render: function(){
			this.$el.html(this.template(this.model.toJSON()));
	},
});

Solution:


var AppointmentView = Backbone.View.extend({
	events:{
		'click':'alertStatus'
	},
	template: _.template('<span><%=title %></span>'),

	render: function(){
			this.$el.html(this.template(this.model.toJSON()));
	},
	alertStatus: function(){
		alert(this.model.get('title'));
	}
});


ROAR Completed Level 3 on Thursday only in One Day Hurray :)

Level 4 Friday 30th Sept

MODEL AND VIEW
--------------

var TodoView = Backbone.View.extend({
		template: _.template('<h3>'+
			'<input type=checkbox'+
			'<%= if(status==="complete") { doxyz } %>'+
			'<%= description %>'+'</h3>');
	});

	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
	}
});

var todoView = new TodoView({model: todoItem});
todoView.render();


Our model provide Views with the Data and it is View responsibility to update DOM

var TodoView = Backbone.View.extend({
	events: {
		'change input' : 'toggleStatus' 
	},
	toggelStatus: function(){
		if(this.model.get('status') === 'incomplete'){
			this.model.set({'status':'complete'});
		}else{
			this.model.set({'status': 'incomplete'});
		}
	}
});

NOPE :( 
This is not BEST code we have Lot of model logic inside View

BEST way is to handle model inside Model

var TodoView = Backbone.View.extend({
	
	events: {
		'change input' : 'toggleStatus' 
	},
	
	toggelStatus: function(){(
		this.model.toggleStatus();
	}
});

var TodoItem = Backbone.Model.extend({
	toggleStatus: function(){
		if(this.get('status') === 'incomplete'){
			this.set({'status':'complete'});
		}else{
			this.set({'status': 'incomplete'});
		}		
	}
	//lets syn to server
	this.save();
});

CSS:

.complete{
	color: #bbb;
	text-decoration: line-through;
}

Now How should we update View

TodoView = Backbone.View.extend({
	events:{
		'change input': 'toggleStatus'
	},
	toggleStatus: function(){
		this.model.toggleStatus();
		this.render();
		// :( THIS DOESNOT WORK FOR ALL MODEL CHANGES
	}
	render:function(){
		this.$el.html(this.template(this.modle.toJSON()));
	}
});

WE CAN USE MODEL CHANGES AND UPDATE THE VIEW ACCORDINGLY

TodoView = Backbone.View.extend({
	events:{
		'change input': 'toggleStatus'
	},
	initialize: function(){
		this.model.on('change', this.render, this);
	},
	toggleStatus: function(){
		this.model.toggleStatus();
		// :( THIS DOESNOT WORK FOR ALL MODEL CHANGES
	}
	render:function(){
		this.$el.html(this.template(this.modle.toJSON()));
	}
});

NOTE: what is this? 
x  this.model.on('change', this.render);
when change event is trigger render will be called with window object 
render: function(){
	this.$el.html(this.template(this.model.toJSON()));
}

V  this.model.on('change', this.render, this);
this will trigger render function with the reder context

REMOVE VIEW ON MODEL DESTROY
----------------------------
TodoView = Backbone.View.extend({

	initialize: function(){
		this.model.on('change', this.render, this);
		this.model.on('destroy', this.remove, this);
	},
	render:function(){
		this.$el.html(this.template(this.modle.toJSON()));
	},
	remove: function(){
		this.$el.remover();
	}
});


Completed Level 4 Hurry :) :) :) I can Even complete 5,6,7 but hold on lets create an 
Awesome Project to put my learning into Action and then get back to remaing Levels

If I Sit late night I could finish them up but my EYEs are teared not because of any emotional pain but  because they have overworked from last few days..
They Need rest. bye for now...

see you on Sept 31

I am back on Oct4 didn'twork on 31,1 on 2nd worked on CSS

Level 5
Collections:

Set of Models:
-------------

Backbone has collection for set of models

var TodoList = Backbone.Collection.extend({
	model: TodoItem
});

var todoList = new TodoList();

TodoLIst manages a set of TodoItem model instances

get Number of models
todoList.length;

add a model instance
--------------------
todoList.add(todoItem1);

get model instance at index 0
todoList.at(0);

get by id 1
todoList.get(1);

removing a model instance
todoList.remove(todoItem1);

Bulk Population
------------------

reset:
------
var todos = [
	{description: "Pick up milk", status: 'incomplete'},
	{description: "get Car wash", status: 'incomplete'},
	{description: "get Training", status: 'incomplete'},
];

todoList.reset(todos);

todoList will now have 3 items in it
Todoitem Todoitem Todoitem

Each object in Array becomes a TodoItem


Fetching Data from Server
-------------------------
URL to get JSON data from 
var TodoList = Backbone.Collection.extend({
	url: '/todos'
});

populate collection from server
todoList.fetch(); // GET /todos

Collection Can Have Events
-------------------------

To listen for an event on collection

todoList.on('event-name', function(){
	alert('event happend');
});

Run the event
todoList.trigger(event-name);

Special Event:
--------------
todoList.on('reset',doThingfn);
{silent:true}//
todoList.off('reset',doThingfn);

Built-in Events
add 	when a model is addded
Remove 	when model is removed
reset 	when a model reset or fetched

todoList.on('add', funciton(todoItem){
//todoItem is the model being added or removed

});

Events triggers on model in a collection will aslo be triggered on model

Iteration
---------

setup our collection:
--------------------
var todos = [
	{description: "Pick up milk", status: 'incomplete'},
	{description: "get Car wash", status: 'incomplete'},
	{description: "get Training", status: 'incomplete'},
];
setup our collection:
todoList.reset(todos);

alert each models descriptions
------------------------------
todoList.forEach(funciton(todoItem){
	alert(todoItem.get('description'))
});

todoList.map(function(todoItem){
	return todoitem.get('description')
})

todoList.filter(function(todoItem){
	return todoitem.get('status') === "true";
});


many other function can be used which are provided by underscore library like filter map etc....


LEVEL -6
========
Backbone View Collections:
--------------------------

Review

Model and View
Model ---- 1-1 Mapping with ------ View

But with 
Collection & View
Collection ----1:M------models<-->View
						models<-->View
						models<-->View
						models<-->View
						models<-->View

A Collection View doesn't render any of its own HTML . It delegates that respoinsibility to model views.

Define and Render:
-----------------

var TodoListView = Backbone.View.extend({});

var todoListView = new TodoListView({collection: todoList});

first crack at render
--------------------
PROBLEM WITH CONTEXT
--------------------
render: funciton(){
	this.collection.forEach(function(todoItem){
		var todoItem = new TodoView({model: todoItem});
		//HERE THIS WILL HAVE WRONG CONTEXT
		this.$el.append(todoView.render().el);
	});
}					

//PROBLEM HERE IN FOREACH WITH THIS CONTEXT

render: funciton(){
	this.collection.forEach(this.addOne, this);
	//TO MAKE SURE CONTEXT OF addOne is called on view we have added addtional this at end
}

addOne: function(){
	var todoItem = new TodoView({model: todoItem});
	//HERE THIS WILL HAVE RIGHT CONTEXT
	this.$el.append(todoView.render().el);
}					

var todoListView = new TodoListView({collection: todoList});
todoListView.render();
console.log(todoListView.el);

<div>
	<h3 class="incomplete">
		<input type="checkbox"/> Pick up Milk
	</h3>
	
	<h3 class="incomplete">
		<input type="checkbox"/> Learn Backbone
	</h3>
</div>


Now what happens if we try to add a new todoItem to our collection 

var newTodoItem = new TodoItem({
	description: 'Take out trash',
	status: 'incomplete'
});
//Adding item to the Collection
todoList.add(newTodoItem);

this will not update the DOM 
lets fix our view to accomodate this changes

var TodoListView =  Backbone.View.extend({

	initialize: function(){
		this.collection.on('add',addOne, this);
	},
	render: funciton(){
		this.collection.forEach(this.addOne, this);
		//TO MAKE SURE CONTEXT OF addOne is called on view we have added addtional this at end
	},

	addOne: function(){
		var todoItem = new TodoView({model: todoItem});
		//HERE THIS WILL HAVE WRONG CONTEXT
		this.$el.append(todoView.render().el);
	}					
});


similarily for fetch Server

var todoList = new TodoList();

var todoListView = new TodoListView({
	collection: todoList
});

todoList.fetch();// this will fire the reset event

we can listen this in colleciton View by adding this

var TodoListView =  Backbone.View.extend({

	initialize: function(){
		this.collection.on('add',addOne, this);
		this.collection.on('reset',addAll, this);
	},
	render: funciton(){
		this.addAll();
		//TO MAKE SURE CONTEXT OF addOne is called on view we have added addtional this at end
	},

	addOne: function(){
		var todoItem = new TodoView({model: todoItem});
		//HERE THIS WILL HAVE WRONG CONTEXT
		this.$el.append(todoItem.render().el);
	},

	addAll: funciton(){
		this.collection.forEach(this.addOne, this)
	}						
});

let see how it works

todosView.render();
$('#app').append(todoView.el);
todoItems.fetch();//this will fetch new data from server and prints

Fixing remove with Custom Events
--------------------------------
 we need not touch collection or View just use custom events

 when we remove an item from collection we don't destroy the item
 If we destry it, it will remove item from View but thats not we want


 TodoList Collection
-------------------
 initialize: funciton(){
 this.on('remove', this.hideModel);
 }

 hideModel: function(){
  model.trigger('hide');
 }

 TodoItemView
 ------------
 initialize: function(){
 	this.model.on('hide', this.remove, this);
 },
 remove: function(){
 	this.remove(this.model);
 }

DONE WITH LEVEL 6 VEDIO NEED TO DO CHALLENGE MAY BE TOMORROW... REST FOR eyes
ITS 11Pm gOOD DAY AND NIGHT ON 4TH oCT

What a Great Day today I was able to create a moreToDo app
using Collection and View and models , 

Tomorrow i.e 6th I should be again create same thing just to get hang of it for a while and make it more modular HURRAY its almost Thursday now :)

6th oct 2016 not that bad but Its for good time from 6 to 7 and then time pass with downloading songs and then cooking and news(GOSH) I should avoid this so many things I see every day which are interesting at same time Time Killer :(

at 11 PM here I am reviewing all I read for Backbone.js
I do need to write it down in notes so that I can refer them back quickly.