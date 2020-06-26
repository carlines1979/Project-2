({
	fetchMakeInfo : function(component, event, helper) {
        component.set('v.columns', [
            	{label: 'Make Id', fieldName: 'MakeId', type: 'number'},
            	{label: 'Make Name', fieldName: 'MakeName', type: 'text'},
                {label: 'Vehicle Type Id', fieldName: 'VehicleTypeId', type: 'number'},
            	{label: 'VehicleTypeName', fieldName: 'VehicleTypeName', type: 'text'}
            ]);
        
        // Call Apex method
        this.selectedMakeChange(component, event, helper);
        
        
    },
    
    selectedMakeChange : function(component, event, helper) {
        
        var action = component.get("c.makeGetCallout"); 
        
        console.log("This is the second helper" + component.get("v.selectedMake"));
        action.setParams({make : component.get("v.selectedMake")});
        
     	action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var rows = response.getReturnValue();
                component.set("v.data", rows);        
            } else {
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
            }
        });
        $A.enqueueAction(action);
    }
})