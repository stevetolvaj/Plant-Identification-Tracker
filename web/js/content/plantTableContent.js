"use strict";


function plantTableContent() {
  var myDiv = document.createElement("div");

  // REPLACE THIS funList assignment statement with an AJAX call to file json/water.json
  ajax("./webAPIs/listPlantsAPI.jsp", processPlantData, myDiv);

  function processPlantData(plantsList) {
    console.log("plant list test print:");
    console.log(plantsList);
    
    if (plantsList.dbError) {
        alert("error getting plants from database");
    }
    
    let plants = plantsList.plantList;

            var newPlantList = []; // empty array
            
            for (var i = 0; i < plants.length; i++) {
                newPlantList[i] = {}; // i-th element of array is empty object.
                newPlantList[i].PlantID = SortableTableUtils.makeNumber(plants[i].plantId);
                newPlantList[i].PlantName = SortableTableUtils.makeText(plants[i].plantName),
                newPlantList[i]._Image = SortableTableUtils.makeImage(plants[i].plantImage, "10rem");
                newPlantList[i].Region = SortableTableUtils.makeText(plants[i].plantRegion);
                newPlantList[i].UserEmail = SortableTableUtils.makeText(plants[i].webUserEmail);

            }

               function inject(ele, where) {
                where.innerHTML = ""; // blank out content area before appending
                where.appendChild(ele);
            }

            // document.getElementById("listHere").appendChild(MakeSortableTable(carList, "condition"));

            inject(MakeClickSortTable("Plants Identified by Users", newPlantList, "PlantID", "icons/down.png"), myDiv);
  }

  return myDiv;
}
