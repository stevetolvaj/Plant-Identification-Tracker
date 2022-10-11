"use strict";

function userTableContent() {
    var myDiv = document.createElement("div");

  // REPLACE THIS funList assignment statement with an AJAX call to file json/water.json
  ajax("./webAPIs/listUsersAPI.jsp", processUserData, myDiv);

  function processUserData(usersList) {
    console.log("user list test print:");
    console.log(usersList);
    
    if (usersList.dbError) {
        alert("error getting plants from database");
    }
    
    let users = usersList.webUserList;

            var newUsersList = []; // empty array
            
            for (var i = 0; i < users.length; i++) {
                newUsersList[i] = {}; // i-th element of array is empty object.
                newUsersList[i].UserID = SortableTableUtils.makeNumber(users[i].webUserId);
                newUsersList[i].Email = SortableTableUtils.makeText(users[i].userEmail),
                newUsersList[i]._Image = SortableTableUtils.makeImage(users[i].image, "10rem");
                newUsersList[i].DOB = SortableTableUtils.makeDate(users[i].birthday);
                newUsersList[i].Role = SortableTableUtils.makeText(users[i].userRoleType);

            }

               function inject(ele, where) {
                where.innerHTML = ""; // blank out content area before appending
                where.appendChild(ele);
            }

            // document.getElementById("listHere").appendChild(MakeSortableTable(carList, "condition"));

            inject(MakeClickSortTable("Registered Users List", newUsersList, "UserID", "icons/down.png"), myDiv);
  }

  return myDiv;
}



