({
	fetchCarTypesHelper : function(component, event, helper) {
        component.set('v.columns', [
            	{label: 'Type', fieldName: 'Name', type: 'text'},
            	{label: 'Standard Type', fieldName: 'Type__c', type: 'text'},
                {label: 'Price per Day', fieldName: 'Price_Day__c', type: 'currency'}
            ]);
        var action = component.get("c.getTypes");
        action.setParams({});
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