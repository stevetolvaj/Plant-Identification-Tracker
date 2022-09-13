/*
    Created on : Sept 12, 2022
    Class      : 3308
    Author     : Steve Tolvaj
 */

/**
 * This MakePlant function is used to create a plant objects that have
 * been observed by a user. May have more details/fields in the future.
 * 
 * @param {image: path/URL, name: name of plant, desc: description of plant} params
 * @returns {Element|plant} The div HTML with class of .plant that has the data relating to 
 * the plant that was created.
 */

"use strict";

function MakePlant(params) {
    
    if (!params) {
        throw "Error: Missing arguments passed to MakePlant function!";
    }
    
    var plant = document.createElement("div");
    plant.classList.add("plant");
    

    var name = params.name || "Add a name to this plant specimen.";
   
    plant.desc = params.desc || "Add a description for the plant specimen.";
    
    plant.setName = function(newName) {
        name = newName;
        display();
    };
    
    plant.setDesc = function(newDesc) {
        plant.desc = newDesc;
        display();
    };
    
    var plantInfo = document.createElement("div");
    plantInfo.setAttribute("id", "details");
    plant.appendChild(plantInfo);
    
    var display = function () {
//        plantInfo.innerHTML = "<p>Plant name: " + name + "<br/>" + 
//                "Plant description: " + plant.desc + "</p><br/>";

        // Putting image first then inserting the html before end of plantInfo div.
        var plantImg = document.createElement("img");
        plantImg.src = params.image || "pics/potted_plant_100px.png";
        plantInfo.appendChild(plantImg);
        
        plantInfo.insertAdjacentHTML("beforeend", "<p><strong>Plant name:</strong> " + name + "<br/>" + 
                "<strong>Plant description:</strong> " + plant.desc + "</p><br/>");

    };
    
    display();
    
    return plant;
}
