package model.webUser;

import dbUtils.DbConn;
import dbUtils.FormatUtils;
import dbUtils.PrepStatement;
import dbUtils.ValidationUtils;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Date;

public class DbMods {
    
    
    

    public static StringData findByLogon(DbConn dbc, String email, String password) {

        StringData sd = new StringData();

        if ((password == null) || (email == null)) {
            sd.errorMsg = "Error: Must provide a valid email and password for logon";
            return sd;
        }

        try {
            String sql = "SELECT web_user_id, user_email, user_password, membership_fee, birthday, image, "
                    + "web_user.user_role_id, user_role_type "
                    + "FROM web_user, user_role WHERE web_user.user_role_id = user_role.user_role_id "
                    + "AND web_user.user_email = ? AND web_user.user_password = ?";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);

            // Encode the id (that the user typed in) into the select statement, into the first (and only) ? 
            stmt.setString(1, email); // 1 means the first  ? in the SQL
            stmt.setString(2, password);          // 2 means the second ? in the SQL  

            ResultSet results = stmt.executeQuery();
            if (results.next()) { // id is unique, one or zero records expected in result set

                // plainInteger returns integer converted to string with no commas.
                sd.webUserId = FormatUtils.plainInteger(results.getObject("web_user_id"));
                sd.userEmail = FormatUtils.formatString(results.getObject("user_email"));
                sd.userPassword = FormatUtils.formatString(results.getObject("user_password"));
                sd.image = FormatUtils.formatString(results.getObject("image"));
                sd.birthday = FormatUtils.formatDate(results.getObject("birthday"));
                sd.membershipFee = FormatUtils.formatDollar(results.getObject("membership_fee"));
                sd.userRoleId = FormatUtils.plainInteger(results.getObject("web_user.user_role_id"));
                sd.userRoleType = FormatUtils.formatString(results.getObject("user_role_type"));

            } else {
                sd.errorMsg = "Web User Not Found.";

            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in DbMods.findById(): " + e.getMessage();
        }
        return sd;

    } // findById
    
     public static StringData insertUser(StringData inputData, DbConn dbc) {

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
            String sql = "INSERT INTO web_user (user_email, user_password, image, membership_fee, birthday, user_role_id) "
                    + "values (?,?,?,?,?,?)";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setString(1, inputData.userEmail); // string type is simple
            pStatement.setString(2, inputData.userPassword);
            pStatement.setString(3, inputData.image);
            pStatement.setBigDecimal(4, ValidationUtils.decimalConversion(inputData.membershipFee));
            pStatement.setDate(5, ValidationUtils.dateConversion(inputData.birthday));
            pStatement.setInt(6, ValidationUtils.integerConversion(inputData.userRoleId));

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
                errorMsgs.errorMsg = "Invalid User Role Id";
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That email address is already taken";
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // insert
     
      private static StringData validate(StringData inputData) {

        StringData errorMsgs = new StringData();

        /* Useful to copy field names from StringData as a reference
    public String webUserId = "";
    public String userEmail = "";
    public String userPassword = "";
    public String userPassword2 = "";
    public String image = "";
    public String birthday = "";
    public String membershipFee = "";
    public String userRoleId = "";   // Foreign Key
    public String userRoleType = ""; // getting it from joined user_role table.
         */
        // Validation
        errorMsgs.userEmail = ValidationUtils.stringValidationMsg(inputData.userEmail, 45, true);
        errorMsgs.userPassword = ValidationUtils.stringValidationMsg(inputData.userPassword, 45, true);

        if (inputData.userPassword.compareTo(inputData.userPassword2) != 0) { // case sensative comparison
            errorMsgs.userPassword2 = "Both passwords must match";
        }

        errorMsgs.image = ValidationUtils.stringValidationMsg(inputData.image, 300, true);

        errorMsgs.birthday = ValidationUtils.dateValidationMsg(inputData.birthday, false);
        errorMsgs.membershipFee = ValidationUtils.decimalValidationMsg(inputData.membershipFee, false);
        errorMsgs.userRoleId = ValidationUtils.integerValidationMsg(inputData.userRoleId, true);

        return errorMsgs;
    } // validate 

} // class
