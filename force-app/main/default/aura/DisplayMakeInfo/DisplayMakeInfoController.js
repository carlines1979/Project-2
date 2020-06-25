({
	init : function(component, event, helper) {
        helper.fetchMakeInfo(component, event, helper);
    },
    selectedMakeChange : function(component, event, helper) {
        helper.selectedMakeChange(component, event, helper);
    },
})