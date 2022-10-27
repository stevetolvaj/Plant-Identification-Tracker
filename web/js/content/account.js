
"use strict";

var account = {};


(function ( ) {
    
    
    function buildProfile (userObj) {
        var msg = "";
        if (userObj.errorMsg.length > 0) {
            msg += "<strong>Error: " + userObj.errorMsg + "</strong>";
        } else {
            msg += "<strong>Welcome Web User " + userObj.webUserId + "</strong>";
            msg += "<br/> Birthday: " + userObj.birthday;
            msg += "<br/> MembershipFee: " + userObj.membershipFee;
            msg += "<br/> User Role: " + userObj.userRoleId + " " + userObj.userRoleType;
            msg += "<p> <img src ='" + userObj.image + "'> </p>";
        }
        return msg;
    };
    
    
    account.logon = function ( ) {


        var logonElement = document.createElement("div");
        logonElement.classList.add("account");

        var title = document.createElement("h2");
        title.innerHTML = "Enter your credentials";
        logonElement.appendChild(title);

        var userNameLabel = document.createElement("label");
        userNameLabel.innerHTML = "Enter Username";
        logonElement.appendChild(userNameLabel);

        var userNameInput = document.createElement("input");
        logonElement.appendChild(userNameInput);

        var passwordLabel = document.createElement("label");
        passwordLabel.innerHTML = "Enter Password";
        logonElement.appendChild(passwordLabel);

        var passwordInput = document.createElement("input");
        passwordInput.setAttribute("type", "password");
        logonElement.appendChild(passwordInput);

        var logonButton = document.createElement("button");
        logonButton.innerHTML = "LOGIN";
        logonElement.append(logonButton);

        logonButton.onclick = function () {

            var username = userNameInput.value;
            var password = passwordInput.value;

            var url = "webAPIs/logonAPI.jsp?email=" + username + "&password=" + password;
            console.log("Login button clicked");
            ajax(url, showProfile, logonElement);
        };
        
        function showProfile (userData) {
           logonElement.innerHTML = buildProfile(userData);
        }

        return logonElement;
    };
    account.getProfile = function ( ) {};
    // create a div, invoke Get Profile API, fill div w/ error msg or web user info, return the div. }
    account.logoff = function ( ) {};
    // create a div, invoke logoff API, fill div with “logged off” message, return the div.


}( ));
