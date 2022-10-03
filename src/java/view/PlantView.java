package view;

// classes imported from java.sql.*
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import model.plant.*;

// classes in my project
import dbUtils.*;

public class PlantView {

    public static StringDataList getAllPlants(DbConn dbc) {

        // sdl will be an empty array and DbError with "" 
        StringDataList sdl = new StringDataList(); 
        
        // sd will have all of it's fields initialized to ""
        StringData sd = new StringData();
        
        try {
            String sql = "SELECT plants.*, web_user.user_email, web_user.image " 
                    + "FROM plants "
                    + "INNER JOIN web_user "
                    + "ON web_user.web_user_id = plants.web_user_id "
                    + "ORDER BY plant_id ";  // you always want to order by something, not just random order.
            
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();

            while (results.next()) {
                
                sd = new StringData();
                
                // the formatUtils methods do not throw exceptions, but if they find illegal data, they write 
                // a message right in the field that they are trying to format.

                // plainInteger returns integer converted to string with no commas.
                sd.plantId = FormatUtils.plainInteger(results.getObject("plant_id"));
                sd.plantName = FormatUtils.formatString(results.getObject("plant_name"));
                sd.plantImage = FormatUtils.formatString(results.getObject("plant_image"));
                sd.plantLatitude = FormatUtils.formatLocationCoordinate(results.getObject("plant_latitiude"));
                sd.plantLongitude = FormatUtils.formatLocationCoordinate(results.getObject("plant_longitude"));
                sd.plantDescription = FormatUtils.formatString(results.getObject("plant_description"));
                sd.plantRegion = FormatUtils.formatString(results.getObject("plant_region"));
                sd.plantSeason = FormatUtils.formatString(results.getObject("plant_season"));
                sd.webUserId = FormatUtils.formatInteger(results.getObject("web_user_id"));
                sd.webUserEmail = FormatUtils.formatString(results.getObject("user_email"));
                sd.webUserImage = FormatUtils.formatString(results.getObject("image"));


                sdl.add(sd);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            sd.errorMsg = "Exception thrown in PlantView.getAllPlants(): " + e.getMessage();
            sdl.add(sd);
        }
        return sdl;
    }
}