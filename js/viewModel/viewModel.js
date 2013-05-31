define(
    [
    	"viewModel/ItemsViewModel",
    	"viewModel/CartViewModel",
        "viewModel/OrderViewModel",
        "viewModel/ItemVM"
    ],
    function (ItemsViewModel, CartViewModel, OrderViewModel, ItemVM) {
    console.log("viewModel loaded");    
        return {
            ItemsViewModel: ItemsViewModel,
            CartViewModel: CartViewModel,
            OrderViewModel: OrderViewModel,
            ItemVM: ItemVM

        };

    });