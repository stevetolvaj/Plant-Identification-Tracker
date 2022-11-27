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
            newUsersList[i]._Update = SortableTableUtils.makeLink(
                    "<img src='icons/update.png' style='width:1rem' />", // innerHTML of link
                    '#/userUpdate/' + users[i].webUserId             // href of link
                    );

        }


        var heading = Utils.make({
            htmlTag: "h2",
            parent: myDiv
        });
        Utils.make({// don't need reference to this span tag...
            htmlTag: "span",
            innerHTML: "Web User List ",
            parent: heading
        });
        var img = Utils.make({
            htmlTag: "img",
            parent: heading
        });
        img.src = "./icons/add.png";
        img.style.cssText = 'width:2.5rem;display: inline-block; vertical-align:middle';
        img.onclick = function () {
            // By changing the URL, you invoke the user insert. 
            window.location.hash = "#/register";
        };


        const usersTableContent = {headingDOM: heading, objList: newUsersList, sortOrderPropName: "User_ID", sortIcon: "icons/down.png"};

        myDiv.appendChild(MakeClickSortTable(usersTableContent));

    }

    return myDiv;
}



