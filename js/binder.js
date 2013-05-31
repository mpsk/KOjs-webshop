define(["jquery", "ko", "viewModel/viewModel"], function ($, ko, viewModel) {
    
    var run = function(){
    	ko.applyBindings(viewModel.ItemsViewModel, $(".content")[0]);
    	ko.applyBindings(viewModel.ItemVM, $("#itemview")[0]);
    	ko.applyBindings(viewModel.CartViewModel, $(".cartview")[0]);
    	ko.applyBindings(viewModel.CartViewModel, $("#cartLength")[0]);
    	ko.applyBindings(viewModel.OrderViewModel, $("section.orderForm")[0]);
        ko.applyBindings(viewModel.ItemsViewModel, $("#left-search")[0]);
    }

    console.log("binder loaded (ko.applyBindings(viewModel...))");
    return {
    	run: run
    };
});