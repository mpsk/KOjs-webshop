define(['binder','router',"viewModel/OrderViewModel", "viewModel/CartViewModel"], 
		function(binder, router, OrderViewModel, CartViewModel){

	var initial = function(){
			binder.run();
			router.run();
			//CartViewModel.check_data();
			OrderViewModel.check_data();
	};

	console.log("app initial loaded");
	return{
		initial: initial
	};
});

