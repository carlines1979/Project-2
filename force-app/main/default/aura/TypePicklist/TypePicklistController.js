({
    doInit : function(component) {
        var action = component.get("c.getPickListValues");
        action.setParams({
            objectType: component.get("v.sObjectName"),
            selectedField: component.get("v.fieldName")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            //if (state === "SUCCESS") {
                var pklist = response.getReturnValue();
                component.set("v.picklistValues", pklist);
                console.log("VALUES" + pklist)  ;   
                console.log("STATE" + state) ;
           // }       
        })
        
        $A.enqueueAction(action);
    }
})