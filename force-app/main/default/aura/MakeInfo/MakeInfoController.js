({
	onChange : function (component, event, helper) {
        console.log(component.find("selectmake").get("v.value") + ' SELECTED ');

        
        component.set("v.brandselected", component.find("selectmake").get("v.value")) ; 
        component.set("v.display", "true");
    },
})