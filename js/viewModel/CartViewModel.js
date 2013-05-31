define(["jquery", "ko", "model/cart", "model/item", "amplify"], function ($, ko, Cart, Item, amplify) {

    function CartViewModel(){
        var self = {};

        self.Cart = ko.observableArray();
     
        self.totalPrice = ko.computed(function(){
            var total = 0;
            $.each(self.Cart(), function(i, item){
                total += item.cost();
           });
           return total;
        });

        self.deleteFromCart = function(){
            self.Cart.remove(this);
            console.log(self.Cart());
        };

        self.showOrderForm = function(){
            $(".orderForm").fadeIn();
        };

        self.sendOrderDetails = function(){
            var order = [];
            for (var i=0; i<self.Cart().length; i++){
                var orderedItem = new Order(    self.Cart()[i].articul, 
                                                self.Cart()[i].type, 
                                                self.Cart()[i].chosenSize(), 
                                                self.Cart()[i].price, 
                                                self.Cart()[i].qty(), 
                                                self.Cart()[i].cost() );
                order.push(orderedItem);
            }
            console.log("Order Details:");
            console.log(order); // send info to server
            return order;
        }


        self.CartStorageKey = ko.observableArray([]); //"CART_STORAGE"

        self.Cart.subscribe(function(newArray){
            console.log(newArray);
           amplify.store(self.CartStorageKey(), newArray);
        });
        self.check_data = function(){ // not works with data-bind="...cost()". Problem in COST and QTY store
            var cart = ko.observable(amplify.store(self.CartStorageKey) || ['']);
            if(cart() != self.Cart()){
                console.log(cart());

                self.Cart(cart());

                console.log("Cart_data loaded (AmplifyJS)");
            }
        };

        console.log("CartViewModel loaded");

        return self;
    }

var myCartViewModel = new CartViewModel();
    return myCartViewModel;

});

function Order(articul, type, chosenSize, price, qty, cost){
    self = {
        articul: articul,
        type: type,
        size: chosenSize,
        price: price,
        qty: qty,
        cost: cost
    };

    return self;
}