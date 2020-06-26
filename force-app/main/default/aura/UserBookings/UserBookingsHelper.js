({
    fetchBookingsHelper : function(component, event, helper) {
        component.set('v.columns', [
            	{label: 'Brand', fieldName: 'CarBrand', type: 'text'},
            	{label: 'Model', fieldName: 'CarModel', type: 'text'},
                {label: 'Start Date', fieldName: 'Start_Date__c', type: 'date'},
                {label: 'End Date', fieldName: 'End_Date__c', type: 'date'},
                {label: 'Total Price', fieldName: 'Total_Price__c', type: 'currency'}
            ]);
        var action = component.get("c.getBooking");
        action.setParams({});
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var rows = response.getReturnValue();
                for (var i = 0; i < rows.length; i++) {
                	var row = rows[i];
                    if (row.Car__c) {
                     	row.CarBrand = row.Car__r.Brand__c;
                    	row.CarModel = row.Car__r.Model__c;   
                    } 
                component.set("v.data", rows);        
           		}
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
    }
})