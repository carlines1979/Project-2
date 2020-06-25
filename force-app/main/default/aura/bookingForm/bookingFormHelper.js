({
    createBooking: function(component, booking) {
        var action = component.get("c.saveBooking");
        action.setParams({
            "booking": booking
        });
        console.log("BOOKING: "  + booking); 
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
 				//Success message display logic.
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "Booking created, Thank you for your business!"
                });
                toastEvent.fire();
            } else if (state === "ERROR") {
                let errors = response.getError();
                let message = 'Unknown error'; // Default error message
                // Retrieve the error message sent by the server
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    message = errors[0].message;
                }
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "ERROR!",
                    "message": message                  
				});
                toastEvent.fire();
                
            } else {
                //UNSuccess message display logic.
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "ERROR!",
                    "message": "Something went wrong. Please, try again later!"
                    
				});
                toastEvent.fire();
            }
        });
        $A.enqueueAction(action);
    },

})