define(["jquery", "ko", "model/item", "viewModel/CartViewModel"], function ($, ko, Item, CartViewModel) {

    function ItemVM(){
        var self = {};
        
        self.loaded = ko.observableArray();

        self.articul = ko.observable();
        self.type = ko.observable();
        self.size = ko.observableArray();
        self.thisSize = ko.observable();
        self.price = ko.observable();
        self.img = ko.observable();
        self.qty = ko.observable(1);
        self.inCart = ko.observable();
        
        self.addToCart = function(){  // типа счетчик и добавление в корзину
            var thisItem = new Item(this.articul(), this.type(), this.size(), this.price(), this.img());
                thisItem.qty = ko.observable(self.qty());
                thisItem.chosenSize = ko.observable(self.thisSize());
                thisItem.cost = ko.computed(function(){
                    return thisItem.price * thisItem.qty();
                });

                console.log(thisItem);
                CartViewModel.Cart.push(thisItem);
                console.log(CartViewModel.Cart());

                self.loaded([]);
                self.inCart("in cart");
        };

        
        self.totalCost = ko.computed(function(){
            return self.price() * self.qty();
        });

        return self;
    }

var myItemVM = new ItemVM();
    return myItemVM;
});