public with sharing class CarTypeController {
    
    @AuraEnabled
    public static List<Car_Type__c> getTypes() {       

        return [SELECT Id, Name, Type__c, Price_Day__c
                               FROM Car_Type__c WITH SECURITY_ENFORCED ORDER BY Name 
                                  ];
    }

}