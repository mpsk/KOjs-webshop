define(["jquery", "ko", "model/item", "viewModel/CartViewModel", "viewModel/ItemVM"], function ($, ko, Item, CartViewModel, ItemVM) {

    function ItemsViewModel(){
        var self = {};
        
        self.items = ko.observableArray([]);
 
        self.addedToCart = ko.observableArray();
        self.incart = ko.observable(false);

        self.preload = function(){ // preload all item from JSON file
            $.getJSON('items.json', function(data){
                var mappedItems = $.map(data, function(i){
                    return new Item(i.articul, i.type, i.size, i.price, i.img);
                });
                self.items(mappedItems);
            });
        };
        self.preload();

        //loadItem to view
        self.loadItem = function(){
            var thisItem = new Item(this.articul, this.type, this.size, this.price, this.img);

            ItemVM.articul(this.articul);
            ItemVM.type(this.type);
            ItemVM.size(this.size);
            ItemVM.price(this.price);
            ItemVM.img(this.img);

            ItemVM.loaded().push(thisItem);
            ItemVM.qty(1);
            ItemVM.inCart("");

            console.log(ItemVM);
            console.log(ItemVM.loaded());
        };

        self.addToCart = function(){ 
            var thisItem = new Item(this.articul, this.type, this.size, this.price, this.img);
                thisItem.qty = ko.observable(1);
                thisItem.chosenSize = ko.observable();

                thisItem.cost = ko.computed(function(){
                    return thisItem.price * thisItem.qty();
                });

                console.log(thisItem);
                CartViewModel.Cart.push(thisItem);

        };   

        self.showItemsInCart = function(){
            console.log(CartViewModel.Cart());
        };

        self.filter = ko.observable('');
        self.searchItems = ko.computed(function(){
                  return ko.utils.arrayFilter(self.items(), function (item) {
                    return (item.articul.indexOf(self.filter()) != -1);
                 });
              }); 

        console.log("ItemsViewModel loaded");
        return self;
    }

var myItemsViewModel = new ItemsViewModel();
    return myItemsViewModel;
});