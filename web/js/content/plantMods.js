"use strict";

var plantMods = {}; // Update Solutioin Spring 2022

(function () {  // This is an IIFE.

    // Fields for plants:
//    public String plantId = "";
//    public String plantName = "";
//    public String plantImage = "";
//    public String plantLatitude = "";
//    public String plantLongitude = "";
//    public String plantDescription = "";
//    public String plantRegion = "";
//    public String plantSeason = "";
//    public String webUserId = "";// Foreign Key


    var fields = [
        {
            fieldName: "plantId",
            prompt: "ID",
            disabled: true
        },
        {
            fieldName: "plantName",
            prompt: "Name"

        },
        {
            fieldName: "plantDescription",
            prompt: "Description"


        },
        {
            fieldName: "plantImage",
            prompt: "Image"

        },
        {
            fieldName: "plantLatitude",
            prompt: "Latitude"

        },
        {
            fieldName: "plantLongitude",
            prompt: "Longitude"

        },
        {
            fieldName: "plantRegion",
            prompt: "Region"

        },
        {
            fieldName: "plantSeason",
            prompt: "Season"

        },
        {
            fieldName: "webUserId",
            prompt: "Email of user adding plant: ",
            pickList: true
        }
    ];

    var component = document.createElement("div");

    // call reusable function to make an edit area component
    var userEditArea = MakeEditArea({
        areaTitle: "InsertPlants",
        fieldDefn: fields
    });
    component.appendChild(userEditArea);

    plantMods.insert = function () {

        // Create UI for insert (using the shared DOM elements just above, in the IIFE).
        userEditArea.areaTitle.innerHTML = "Add New Plant";
        userEditArea.blankInputs();
        userEditArea.button.innerHTML = "Insert Save";
        userEditArea.formMsg.innerHTML = ""; // wipe out any old message

        // *********************************************************
        // Add email picklist to choose user ids 
        ajax("webAPIs/getEmailsAPI.jsp", processRoles, userEditArea.formMsg);

        function processRoles(obj) {
            // obj is the list of roles returned by the getRolesAPI.jsp
            if (obj.dbError.length > 0) {
                userEditArea["userId"].errorTd.innerHTML +=
                        "Programmer Error: Cannot Create Email Pick List... " +
                        obj.dbError;
            } else {

                var selectTag = Utils.makePickList({
                    list: obj.emailList,
                    idProp: "webUserId",
                    displayProp: "userEmail"
                });

                // put the Email select tag (just made) into the inputTd property 
                // of the UserId row of the HTML table 
                userEditArea["webUserId"].inputTd.innerHTML = "";
                userEditArea["webUserId"].inputTd.appendChild(selectTag);
            }
        } // processRoles (ajax call back function 
        // *********************************************************

        userEditArea.button.onclick = function () {  // INSERT SAVE

            // inputObj is an object with all user input values. 
            var userInputObj = userEditArea.getDataFromUI();

            // Place the id (selected option of the select tag) into the userInputObj
            var idSelect = userEditArea["webUserId"].inputTd.getElementsByTagName("select")[0];
            userInputObj.webUserId = idSelect.options[idSelect.selectedIndex].value;


            // convert userInputObj to JSON and URL encode (e.g., turns space to %20), 
            // URL encode so that the server does not reject URL for security reasons.
            var urlParams = encodeURIComponent(JSON.stringify(userInputObj));
            console.log("Insert Save URL params: " + urlParams);

            ajax("webAPIs/insertPlantsAPI.jsp?jsonData=" + urlParams, reportInsert, userEditArea.formMsg);

            function reportInsert(obj) {

                // obj is the error message object (passed back from the Insert API).
                // obj (conveniently) has its fields named exactly the same as the input data was named. 

                console.log("Insert API response (error message object) on next line");
                console.log(obj);

                // write all the error messages to the UI (into the third column for each row).
                userEditArea.writeErrorObjToUI(obj);

                if (obj.errorMsg.length === 0) { // success
                    userEditArea.formMsg.innerHTML = "Record successfully inserted.";
                } else {
                    userEditArea.formMsg.innerHTML = obj.errorMsg;
                }
            }
        };

        return component;
    }; // plantMods.insert

    plantMods.update = function (plantId) {
        userEditArea.areaTitle.innerHTML = "Update Plant";
        userEditArea.blankInputs();
        userEditArea.button.innerHTML = "Update Save";
        userEditArea.formMsg.innerHTML = ""; // wipe out any old message

        console.log("plantMods.update called with plantId " + plantId);

        ajax("webAPIs/getPlantByIdAPI.jsp?plantId=" + plantId, gotRecordById, userEditArea.formMsg);

        function gotRecordById(plantObj) {

            userEditArea.writeDbValuesToUI(plantObj);

            ajax("webAPIs/getEmailsAPI.jsp", processEmails, userEditArea.formMsg);

            function processEmails(obj) {
                // obj is the list of roles returned by the getRolesAPI.jsp
                if (obj.dbError.length > 0) {
                    userEditArea["webUserId"].errorTd.innerHTML +=
                            "Programmer Error: Cannot Create Email Pick List... " +
                            obj.dbError;
                } else {
                    console.log("webUserId is " + plantObj.webUserId);
                    var selectTag = Utils.makePickList({
                        list: obj.emailList,
                        idProp: "webUserId",
                        displayProp: "userEmail",
                        selectedKey: plantObj.webUserId
                    });

                    // put the Email select tag (just made) into the inputTd property 
                    // of the UserId row of the HTML table 
                    userEditArea["webUserId"].inputTd.innerHTML = "";
                    userEditArea["webUserId"].inputTd.appendChild(selectTag);
                }
            } // processEmails
        } // gotRecordById

        userEditArea.button.onclick = function () { // Update Save

            // collect all the user input values into an object. 
            var plantObj = userEditArea.getDataFromUI();

            // find the user role selected from the select tag (and put it into userInputObj).
            var userSelect = userEditArea["webUserId"].inputTd.getElementsByTagName("select")[0];
            plantObj.webUserId = userSelect.options[userSelect.selectedIndex].value;

            // convert userInputObj to JSON and URL encode (turns space to %20), 
            // so server does not reject URL for security reasons.
            var urlParams = encodeURIComponent(JSON.stringify(plantObj));
            console.log("Update Save URL params: " + urlParams);

            ajax("webAPIs/updatePlantAPI.jsp?jsonData=" + urlParams, reportUpdate, userEditArea.formMsg);

            function reportUpdate(jsErrorObj) {

                userEditArea.writeErrorObjToUI(jsErrorObj);

                // jsErrorObj is a StringData object full of error messages 
                // (using same field names). 

                if (jsErrorObj.errorMsg.length === 0) { // success
                    userEditArea.formMsg.innerHTML = "Record successfully updated. ";
                } else {
                    userEditArea.formMsg.innerHTML = jsErrorObj.errorMsg;
                }
            }
        }; //updateSave submit button

        return component;

    };

}());  // end of the IIFE