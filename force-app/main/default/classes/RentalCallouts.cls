public class RentalCallouts {
    @AuraEnabled
    public static Object makeGetCallout(String make) {
        Object first=null;
        String format = 'JSON'; 
                
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://vpic.nhtsa.dot.gov/api/vehicles/getmanufacturerdetails/'+make+'?format='+format);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        // If the request is successful, parse the JSON response.
        if (response.getStatusCode() == 200) {
            // Deserializes the JSON string into collections of primitive data types.
            Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            // Cast the values in the 'animals' key as a list
            List<Object> vehicles = (List<Object>) results.get('Results');
            System.debug('Received the following vehicles:');
            for (Object vehicle: vehicles) {
                System.debug(vehicle);
            }
            System.debug('THIS IS THE FIRST vehicle:');
            first = vehicles.get(0); 
            System.debug(first);
        }
        return first;
    }

}
