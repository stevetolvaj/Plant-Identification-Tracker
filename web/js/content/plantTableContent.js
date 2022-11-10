"use strict";


function plantTableContent() {
    var myDiv = document.createElement("div");

    ajax("./webAPIs/listPlantsAPI.jsp", processPlantData, myDiv);

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
