package view;

// classes imported from java.sql.*
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.userEmail.*;

// classes in my project
import dbUtils.*;

public class UserEmailView {

    public static StringDataList getAllEmails(DbConn dbc) {

        StringDataList sdl = new StringDataList();
        try {
            String sql = "SELECT web_user_id, user_email "
                    + "FROM web_user ORDER BY user_email ";  // you always want to order by something, not just random order.
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();
            while (results.next()) {

                StringData email = new StringData();
                email.webUserId = FormatUtils.formatInteger(results.getObject("web_user_id"));
                email.userEmail = FormatUtils.formatString(results.getObject("user_email"));

                sdl.add(email);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            StringData sd = new StringData();
            sd.errorMsg = "Exception thrown in RoleView.allRolesAPI(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }
}
