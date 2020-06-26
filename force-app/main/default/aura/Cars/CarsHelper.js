({
	fetchCarsHelper : function(component, event, helper) {
        component.set('v.columns', [
            	{label: 'Make', fieldName: 'Brand__c', type: 'text'},
            	{label: 'Model', fieldName: 'Model__c', type: 'text'},
                {label: 'Year', fieldName: 'Year__c', type: 'text'},
            	{label: 'Car Type', fieldName: 'Type__c', type: 'text'}
            ]);
        var action = component.get("c.getCars");
        action.setParams({});
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var rows = response.getReturnValue();
                component.set("v.data", rows); 
                
           	} else if (state === "ERROR") {
                let errors = response.getError();
                let message = 'Unknown error'; // Default error message
                // Retrieve the error message sent by the server.
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    message = errors[0].message;
                }
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "ERROR!",
                    "message": message,
                    "type" : 'error'
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
    }
})