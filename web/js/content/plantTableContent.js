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
                newPlantList[i].Region = SortableTableUtils.makeText(plants[i].plantRegion);
                newPlantList[i].User_Email = SortableTableUtils.makeText(plants[i].webUserEmail);

            }

               function inject(ele, where) {
                where.innerHTML = "";
                where.appendChild(ele);
            }


            inject(MakeClickSortTable("Plants Identified by Users", newPlantList, "Plant_ID", "icons/down.png"), myDiv);
  }

  return myDiv;
}
