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
           		}
        });
        $A.enqueueAction(action);
    }
})