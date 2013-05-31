define(["jquery", "sammy", "ko"], function($, Sammy, ko){
	var self ={};

	self.sammy = new Sammy.Application();

	self.routes = [
			{ url: "#/all", element: $("#all") },
			{ url: "#/shirts", element: $("#shirts") },
			{ url: "#/pants", element: $("#pants") },
			{ url: "#/tshirts", element: $("#tshirts") },
			{ url: "#/cart", element: $("#cart") }
		];

	self.run = function(){
		$.each(self.routes, function(i, route){
			self.sammy.get(route.url, function(){
				$('.items').hide();
				route.element.fadeIn();
			});
		});
		
		$.each(self.routes, function(i, route){
			console.log(route.element);
		});

		self.sammy.run('#/all');
		console.log('router loaded');
	};
	
	self.navigate = function(url) {
            sammy.setLocation(url);
    };

	return {
		run: self.run,
		navigate: self.navigate
	};
});