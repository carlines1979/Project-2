({
	fetchCarsHelper : function(component, event, helper) {
        component.set('v.columns', [
            	{label: 'Make', fieldName: 'Brand__c', type: 'text'},
            	{label: 'Model', fieldName: 'Model__c', type: 'text'},
                {label: 'Year', fieldName: 'Year__c', type: 'text'},
            	{label: 'Car Type', fieldName: 'Car_Type__c', type: 'text'}
            ]);
        var action = component.get("c.getCars");
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