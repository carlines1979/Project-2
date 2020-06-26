public class RentalCallouts {
    @AuraEnabled
    public static List<Object> makeGetCallout(String make) {
		List<Object> vehicleTypes = new List<Object>();
        String format = 'JSON'; 
                
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/'+make+'?format='+format);
        request.setMethod('GET');
        HttpResponse response = http.send(request);
        // If the request is successful, parse the JSON response.
        if (response.getStatusCode() == 200) {
            // Deserializes the JSON string into collections of primitive data types.
            Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            // Cast the values in the 'Results' key as a list
            vehicleTypes = (List<Object>) results.get('Results');
            System.debug('Received the following vehicles Types:');
            for (Object vehicle: vehicleTypes) {
                System.debug(vehicle);
            }

        } else {
            new AuraHandledException('Sorry, nhtsa.dot.gov is not responding at this time, Error code: ' + response.getStatusCode());
        }
        return vehicleTypes;
    }

}