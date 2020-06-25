public with sharing class CarController {

    @AuraEnabled
    public static List<Car__c> getCars() {
               
        List<Car__c> carlist = [SELECT  Brand__c, Model__c, Year__c, CarType__r.Type__c
        FROM Car__c ORDER BY Brand__c, Model__c , Year__c 
           ];
        
        for (Car__c car : carlist){
            System.debug(car.CarType__r.Type__c);
        }
        return carlist;  
    }
    
    

}