package model.plant;

import dbUtils.*;

public class DbMods {

    /*
    Returns a "StringData" object that is full of field level validation
    error messages (or it is full of all empty strings if inputData
    totally passed validation.  
     */
    private static StringData validate(StringData inputData) {

        StringData errorMsgs = new StringData();

//    public String plantId = "";
//    public String plantName = "";
//    public String plantImage = "";
//    public String plantLatitude = "";
//    public String plantLongitude = "";
//    public String plantDescription = "";
//    public String plantRegion = "";
//    public String plantSeason = "";
//    public String webUserId = "";// Foreign Key
        // Validation
        errorMsgs.plantName = ValidationUtils.stringValidationMsg(inputData.plantName, 45, true);
        errorMsgs.plantImage = ValidationUtils.stringValidationMsg(inputData.plantImage, 500, false);
        errorMsgs.plantDescription = ValidationUtils.stringValidationMsg(inputData.plantDescription, 2000, false);
        errorMsgs.plantRegion = ValidationUtils.stringValidationMsg(inputData.plantRegion, 45, false);
        errorMsgs.plantSeason = ValidationUtils.stringValidationMsg(inputData.plantSeason, 45, false);

        errorMsgs.plantLatitude = ValidationUtils.decimalValidationMsg(inputData.plantLatitude, false);
        errorMsgs.plantLongitude = ValidationUtils.decimalValidationMsg(inputData.plantLatitude, false);

        errorMsgs.webUserId = ValidationUtils.integerValidationMsg(inputData.webUserId, true);

        return errorMsgs;
    } // validate 

    public static StringData insertPlant(StringData inputData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        errorMsgs = validate(inputData);
        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation

            /*
                  String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, "+
                    "web_user.user_role_id, user_role_type "+
                    "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id " + 
                    "ORDER BY web_user_id ";
             */
            // Start preparing SQL statement
            String sql = "INSERT INTO plants (plant_name, plant_image, plant_description, plant_region, "
                    + "plant_season, plant_latitiude, plant_longitude, web_user_id) "
                    + "values (?,?,?,?,?,?,?,?)";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setString(1, inputData.plantName); // string type is simple
            pStatement.setString(2, inputData.plantImage);
            pStatement.setString(3, inputData.plantDescription);
            pStatement.setString(4, inputData.plantRegion);
            pStatement.setString(5, inputData.plantSeason);

            pStatement.setBigDecimal(6, ValidationUtils.decimalConversion(inputData.plantLatitude));
            pStatement.setBigDecimal(7, ValidationUtils.decimalConversion(inputData.plantLongitude));

            pStatement.setInt(8, ValidationUtils.integerConversion(inputData.webUserId));

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                    errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid web user Id";
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That plant name is already taken";
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // insert

} // class
