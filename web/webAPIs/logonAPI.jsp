<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 
<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%
    // logon.jsp

    StringData sd = new StringData();
    String email = request.getParameter("email");
    String password = request.getParameter("password");
    if ((email == null) || (password == null)) {
        sd.errorMsg = "Cannot search for user: 'email' and 'password' must be supplied";
        session.invalidate();
    } else {
        DbConn dbc = new DbConn();
        sd.errorMsg = dbc.getErr();
        if (sd.errorMsg.length() == 0) {
            System.out.println("*** Ready to call findByLogon");
            sd = DbMods.findByLogon(dbc, email, password);
        }
        dbc.close();
    }
    Gson gson = new Gson();
    out.print(gson.toJson(sd).trim());
    if (sd.errorMsg.length() == 0) {
        session.setAttribute("user", sd);
    } else {
        session.invalidate();
    }

%>      