public with sharing class BookingController {
	
    
    @AuraEnabled
    public static List<Booking__c> getBooking() {
        
		ID userId = System.UserInfo.getUserId();        
        User userContactId = [Select Contact.id FROM USER WHERE ID = :userId] ;
        System.debug('userContactId');
        return [SELECT Id, Name, Car__r.Brand__c, Car__r.Model__c, Start_Date__c, End_Date__c, Total_Price__c
                			FROM Booking__c 
               				WHERE Contact__c = :userContactId.ContactId
               				];
        
    }
    
    
    @AuraEnabled
    public static void saveBooking(Booking__c booking) {
        
        try {
            ID userId = System.UserInfo.getUserId();        
            User userContactId = [Select Contact.id FROM USER WHERE ID = :userId] ;
            
            List<Car_Type__c> cartypelist = [SELECT Id FROM  Car_type__c WHERE Type__c = :booking.CarType__c]; 
            booking.Contact__c = userContactId.ContactId;  
  
            
            Car_Type__c ct = cartypelist[0];
            booking.CarType__c = ct.Id; 
            insert booking;
        } catch (Exception e) {
            throw new AuraHandledException('Server-side Error: ' + e.getMessage()); 
        }
    }


}