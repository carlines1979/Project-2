public with sharing class CarController {

    @AuraEnabled
    public static List<AggregateResult> getCars() {
        // Select list of cars grouped by brand, model, year, type to avoid unuseful duplicate results.  
        try { 
            
            List<AggregateResult> carlist = [SELECT  Brand__c, Model__c, Year__c, CarType__r.Type__c
        	FROM Car__c WITH SECURITY_ENFORCED 
                    GROUP BY Brand__c, Model__c, Year__c, CarType__r.Type__c 
                    ORDER BY Brand__c, Model__c , Year__c];

        	 return carlist;  
            
        } catch (Exception e) {
            throw new AuraHandledException('Server-side Error: ' + e.getMessage());
        }
                       
    }
        

}