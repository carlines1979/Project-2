public class pickListController {
    @AuraEnabled        
    public static List<String> getPickListValues(String objectType, String selectedField) {
        List<String> pkListValues = new List<String>();
        Schema.SObjectType obj = Schema.getGlobalDescribe().get(objectType);
        Schema.DescribeSObjectResult res = obj.getDescribe();
        Schema.DescribeFieldResult result = res.fields.getMap().get(selectedField).getDescribe();

        list < Schema.PicklistEntry > pkle = result.getPicklistValues();
        
        for( Schema.PicklistEntry pklVal : pkle){
            pkListValues.add(pklVal.getValue());
        }  
        System.debug(pkListValues);   
        return pkListValues;
     }
}