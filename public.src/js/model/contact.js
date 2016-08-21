var Contact = Backbone.Model.extend({
	urlRoot: "/signs",
});

var Contacts = Backbone.Collection.extend({
	urlRoot: '/sign',
	model: Contact
});
