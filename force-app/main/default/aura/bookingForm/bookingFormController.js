({
	clickCreate : function(component, event, helper) {
        var validBooking = component.find('bookingform').reduce(function (validSoFar, inputCmp) {
            // Displays error messages for invalid fields
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        // If we pass error checking, do some real work
        if(validBooking){
            // Create the new booking
            var newBooking = component.get("v.newBooking");
            console.log("Create booking: " + JSON.stringify(newBooking));
            helper.createBooking(component, newBooking);
        }
		
    },
    
    onChange : function (component, event, helper) {
        console.log(component.find("bookingform1").get("v.value") + ' SELECTED ');

        
        component.set("v.newBooking.CarType__c", component.find("bookingform1").get("v.value")) ; 
    }
})