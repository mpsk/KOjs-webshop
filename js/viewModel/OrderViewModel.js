// validation http://www.youtube.com/watch?v=P_fpLp5C0LI
// http://jsfiddle.net/ericbarnard/KHFn8/

define(["jquery", "ko", "viewModel/CartViewModel", "amplify"], function ($, ko, CartViewModel, amplify) {

    function OrderViewModel(){
        var self = {};
        self.clientOrder = ko.observableArray();

        self.name = ko.observable().extend({ minLength: 2, required: { message: 'Please, fill out this field!' }});
        self.email = ko.observable().extend({ email: true, required: { message: 'Please, fill out this field!' }});
        self.adress = ko.observable();
        self.phone = ko.observable().extend({ number: true, required: { message: 'Please, fill out this field!' }});
        self.info = ko.observable();

        self.validErrors = ko.validation.group(self);

        // Amplify JS integration
        self.nameStorageKey = "CLIENT_NAME";
        self.name.subscribe(function(newValue){
                amplify.store(self.nameStorageKey, newValue);
            });

        self.emailStorageKey = "CLIENT_EMAIL";
        self.email.subscribe(function(newValue){
                amplify.store(self.emailStorageKey, newValue);
            });

        self.adressStorageKey = "CLIENT_ADRESS";
        self.adress.subscribe(function(newValue){
                amplify.store(self.adressStorageKey, newValue);
            });

        self.phoneStorageKey = "CLIENT_PHONE";
        self.phone.subscribe(function(newValue){
                amplify.store(self.phoneStorageKey, newValue);
            });

        self.infoStorageKey = "CLIENT_INFO";
        self.info.subscribe(function(newValue){
                amplify.store(self.infoStorageKey, newValue);
            });

        self.check_data = function(){
            var name = amplify.store(self.nameStorageKey) || "";
            var email = amplify.store(self.emailStorageKey) || "";
            var adress = amplify.store(self.adressStorageKey) || "";
            var phone = amplify.store(self.phoneStorageKey) || "";
            var info = amplify.store(self.infoStorageKey) || "";

            if (name != self.name() || email != self.email() || 
                adress != self.adress() || phone != self.phone() || info != self.info() ) { 

                    self.name(name); 
                    self.email(email); 
                    self.adress(adress); 
                    self.phone(phone); 
                    self.info(info); 

                    console.log("OrderForm_data loaded (AmplifyJS)");
                }

        }; // -END- Amplify JS integration

        self.confirm = function(){
            if (self.validErrors().length === 0) { // check required fields
                var client = new Client(self.name(), self.email(), self.adress(), self.phone(), self.info());

                self.clientOrder().push(client);
                self.clientOrder().push(CartViewModel.Cart());

                //Send info
                console.log("Client info:");
                console.log(self.clientOrder());
                CartViewModel.sendOrderDetails();

                //clear order
                self.clientOrder([]);
            }
            else{
                self.validErrors.showAllMessages();
            }
        };

        return self;
    }

var myOrderViewModel = new OrderViewModel();

    return myOrderViewModel;
});

// Client-Constructor for order form
function Client (name, email, adress, phone, info){
    self = {
        name: name,
        email: email,
        adress: adress,
        phone: phone,
        info: info
    };

    return self;
};