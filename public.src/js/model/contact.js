var Contact = Backbone.Model.extend({
	urlRoot: "/signs",
	
	constructor: function(name, phone) {
		this.name = name;
		this.phone = phone;
	}
});