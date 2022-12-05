<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="model.webUser.StringData" %> 
<%@page language="java" import="com.google.gson.*" %>

<%

    StringData sd = new StringData(); // set to ""
    sd.errorMsg = "Session has been invalidated/logged off";

    session.invalidate();

    Gson gson = new Gson();
    out.print(gson.toJson(sd));

%>
