define(function () {

	function Item(articul, type, size, price, img){
		var self = {};

			self.articul = articul;
			self.type = type;
			self.size = size;
			self.price = price;
			self.img = img;

		return self;
	};

console.log('Item constructor loaded');

return Item;
});
