define(function () {

    CartItem = function(product, qty){
    	var self ={};
        
        self.product = ko.observableArray(product);
        self.qty = ko.observable(qty);

        self.cost = function(){
            return self.product.price * self.qty;
		};

		return self;

	};

console.log('Cart constructor loaded');

return CartItem;
});
