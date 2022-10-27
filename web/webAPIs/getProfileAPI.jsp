<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="model.webUser.StringData" %> 
<%@page language="java" import="com.google.gson.*" %>

<%

    // Get user session object if credentials were correct.
    StringData sd = (StringData) session.getAttribute("user");

    if (sd == null) {
        sd = new StringData();
        sd.errorMsg = "Sorry but there is user logged into the session right now";
    }

    Gson gson = new Gson();
    out.print(gson.toJson(sd));

%>