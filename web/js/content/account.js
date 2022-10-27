
"use strict";

var account = {};


(function ( ) {

    function buildProfile(userObj) {
        var msg = "";
        if (userObj.errorMsg.length > 0) {
            msg += "<strong>Error: " + userObj.errorMsg + "</strong>";
        } else {
            msg += "<h2>Welcome Web User " + userObj.webUserId + "</h2>";
            msg += "<p><br/> Birthday: " + userObj.birthday;
            msg += "<br/> MembershipFee: " + userObj.membershipFee;
            msg += "<br/> User Role: " + userObj.userRoleId + " " + userObj.userRoleType;
            msg += "<img src ='" + userObj.image + "'> </p>";
        }
        return msg;
    }
    ;

    account.logon = function ( ) {
        var logonElement = document.createElement("div");
        logonElement.classList.add("account");

        var title = document.createElement("h2");
        title.innerHTML = "Enter your credentials";
        logonElement.appendChild(title);

        var userEmailLabel = document.createElement("label");
        userEmailLabel.innerHTML = "Email:";
        logonElement.appendChild(userEmailLabel);

        var userEmailInput = document.createElement("input");
        logonElement.appendChild(userEmailInput);

        var passwordLabel = document.createElement("label");
        passwordLabel.innerHTML = "Password:";
        logonElement.appendChild(passwordLabel);

        var passwordInput = document.createElement("input");
        passwordInput.setAttribute("type", "password");
        logonElement.appendChild(passwordInput);

        var logonButton = document.createElement("button");
        logonButton.innerHTML = "LOGIN";
        logonElement.append(logonButton);

        var profileDiv = document.createElement("div");
        logonElement.appendChild(profileDiv);

        logonButton.onclick = function () {
            var email = userEmailInput.value;
            var password = passwordInput.value;

            if (email.length < 1) {
                alert("Enter a valid email address");
                return;
            }

            if (password.length < 1) {
                alert("Enter a valid password");
                return;
            }



            var url = "webAPIs/logonAPI.jsp?email=" + email + "&password=" + password;
            console.log("Login button clicked");
            ajax(url, (userData) => {

                profileDiv.innerHTML = buildProfile(userData);

                //logonElement.innerHTML = buildProfile(userData);
            }, logonElement);
        };

        return logonElement;
    };
    account.getProfile = function ( ) {
        var getProfileElement = document.createElement("div");
        getProfileElement.classList.add("account");
        ajax("webAPIs/getProfileAPI.jsp", (userData) => {
            console.log(userData);
            getProfileElement.innerHTML = buildProfile(userData);
        }, getProfileElement);

        return getProfileElement;
    };

    account.logoff = function ( ) {

        var logoffElement = document.createElement("div");
        ajax("webAPIs/logoutAPI.jsp", () => logoffElement.innerHTML = `<h2> User log out successful`, logoffElement);
        return logoffElement;
    };

}( ));
