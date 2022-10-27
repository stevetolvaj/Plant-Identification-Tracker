"use strict";

function userTableContent() {
    var myDiv = document.createElement("div");

    ajax("./webAPIs/listUsersAPI.jsp", processUserData, myDiv);

    function processUserData(usersList) {
        console.log("user list test print:");
        console.log(usersList);

        if (usersList.dbError) {
            alert("error getting users from database");
        }

        let users = usersList.webUserList;

        var newUsersList = [];

        for (var i = 0; i < users.length; i++) {
            newUsersList[i] = {};
            newUsersList[i].User_ID = SortableTableUtils.makeNumber(users[i].webUserId);
            newUsersList[i].Email = SortableTableUtils.makeText(users[i].userEmail),
                    newUsersList[i]._Image = SortableTableUtils.makeImage(users[i].image, "10rem");
            newUsersList[i].DOB = SortableTableUtils.makeDate(users[i].birthday);
            newUsersList[i].Role = SortableTableUtils.makeText(users[i].userRoleType);

        }

        function inject(ele, where) {
            where.innerHTML = "";
            where.appendChild(ele);
        }

        const usersTableContent = {title: "Registered Users List", objList: newUsersList, sortOrderPropName: "User_ID", sortIcon: "icons/down.png"};

        myDiv.appendChild(MakeClickSortTable(usersTableContent));

        // myDiv.appendChild(MakeClickSortTable("Registered Users List", newUsersList, "User_ID", "icons/down.png"));
    }

    return myDiv;
}



