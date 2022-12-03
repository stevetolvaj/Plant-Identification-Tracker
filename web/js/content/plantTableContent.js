"use strict";


function plantTableContent() {
    var myDiv = document.createElement("div");

    ajax("./webAPIs/listPlantsAPI.jsp", processPlantData, myDiv);
    
        function deletePlant(plantId, td) {
    console.log("to delete user " + plantId);

        if (confirm("Do you really want to delete plant " + plantId + "? ")) {
            
            var error = "";
            ajax("./webAPIs/deletePlantAPI.jsp?deleteId=" + plantId, successfulDelete, error);
            
            function successfulDelete(result) {
                
                if (result.errorMsg.length > 0) {
//                    if (result.errorMsg.includes("foreign key constraint fails")) {
//                        console.log(result.errorMsg);
//                        alert("This user could not be deleted because there are identified plants associated with this account.");
//                    } else 
                        if (result.errorMsg.includes("Problem getting connection:Communications link failure")) {
                        console.log(result.errorMsg);
                        alert("The database is currently unavailable. Please try again later.");
                    } else {
                        alert(result.errorMsg);
                    }
                    
                } else {

                var dataRow = td.parentNode;
                var rowIndex = dataRow.rowIndex - 1; 
                var dataTable = dataRow.parentNode;
                dataTable.deleteRow(rowIndex);
            }
            }
            
            console.log(error);
            
            if (error.length > 0) {
                alert(error);
                
            }

        }
    }

    function processPlantData(plantsList) {
        console.log("plant list test print:");
        console.log(plantsList);

        if (plantsList.dbError) {
            alert("error getting plants from database");
        }

        let plants = plantsList.plantList;

        var newPlantList = [];

        for (var i = 0; i < plants.length; i++) {
            newPlantList[i] = {};
            newPlantList[i].Plant_ID = SortableTableUtils.makeNumber(plants[i].plantId);
            newPlantList[i].Plant_Name = SortableTableUtils.makeText(plants[i].plantName),
                    newPlantList[i]._Image = SortableTableUtils.makeImage(plants[i].plantImage, "10rem");
            newPlantList[i].Lattitude = SortableTableUtils.makeNumber(plants[i].plantLatitude);
            newPlantList[i].Longitude = SortableTableUtils.makeNumber(plants[i].plantLongitude);
            newPlantList[i].User_Email = SortableTableUtils.makeText(plants[i].webUserEmail);

            newPlantList[i]._Update = SortableTableUtils.makeLink(
                    "<img src='icons/update.png' style='width:1rem' />", // innerHTML of link
                    '#/plantUpdate/' + plants[i].plantId             // href of link
                    );
            
            newPlantList[i]._ = SortableTableUtils.makeImage("icons/delete.png", '1rem');
            
            const plantId = plants[i].plantId;
            newPlantList[i]._.onclick = function () {
            deletePlant(plantId, this);
            };

        }

        var heading = Utils.make({
            htmlTag: "h2",
            parent: myDiv
        });
        Utils.make({// don't need reference to this span tag...
            htmlTag: "span",
            innerHTML: "Plants List ",
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
            window.location.hash = "#/plantInsert";
        };

        const plantsTableContent = {headingDOM: heading, objList: newPlantList, sortOrderPropName: "Plant_ID", sortIcon: "icons/down.png"};

        myDiv.appendChild(MakeClickSortTable(plantsTableContent));
    }

    return myDiv;
}
