
var utilityAPI = {
    timestampToDateString : function(timestamp){
        let d = new Date(timestamp);
        return ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
            d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)
            + ":" + ("0" + d.getSeconds()).slice(-2);
    },
    daysBetween : function(date1,date2){
        let singleDayInMillis = (24*60*60*1000);
        let diff = (new Date(date2.valueOf()) - new Date(date1.valueOf()))/singleDayInMillis;
        return diff;
    },
    convertToBoolean : function(input) {
        let result = false;
        if(typeof input === "string"){
            var sanitisedInput = input.trim().toLowerCase();
            result = (sanitisedInput === "true");
        } else if(typeof input === "boolean"){
            result = input;
        } else {
            console.log("Could not convert " + input + " to boolean - defaulting to false");
        }
        return result;
    }
}
export default utilityAPI ;
