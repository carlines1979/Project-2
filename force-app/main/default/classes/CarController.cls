public with sharing class CarController {

    @AuraEnabled
    public static List<Car__c> getCars() {
               
        return [SELECT  Brand__c, Model__c, Year__c, CarType__c
        FROM Car__c ORDER BY Brand__c, Model__c , Year__c 
           ];
    }

}