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

    /**
     * Public setter, sets name of the plant div and updates display.
     * Also clears the input after submission.
     * @param {String} newName The new name for the plant.
     */
    plant.setName = function (newName) {
        name = newName;
        display();




    };

    /**
     * Private setter, adds new description to the previous 
     * description of the plant div and updates display.
     * Also clears the textarea after submission.
     * Only adds to previous description if default is not present. If default
     * is present string is replaced and then more may be added.
     * @param {String} newDesc The new description of the plant.
     */
    plant.addDesc = function (newDesc) {
        if (plant.desc === "Add a description for the plant specimen.") {
            plant.desc = newDesc;
        } else {
            plant.desc = plant.desc + " " + newDesc;
        }

        display();
    };


    // div with id plantDetails for displaying the plant information.
    var plantInfo = document.createElement("div");
    plantInfo.classList.add("plantInfo");
    // plantInfo.setAttribute("id", "plantInfo");
    plant.appendChild(plantInfo);

    /**
     * Used to update the info portion of the plant div with picture, name, and
     * description.
     */
    var display = function () {

        var imageURL = params.image || "pics/potted_plant_100px.png";

        // Create string for image.
        var image = "<img alt=\"Plant Picture\" src=\"" + imageURL + "\"";

        // Added image in first for easier styling.
        var str = image + "<p><strong>Plant name:</strong> " + name + "<br/>" +
                "<strong>Plant description:</strong> " + plant.desc + "</p><br/>";

        plantInfo.innerHTML = str;
    };

    // div with id plant input for user input.
    var plantInput = document.createElement("div");
    plantInput.setAttribute("id", "plantInput");
    plant.appendChild(plantInput);

    var nameButton = document.createElement("button");
    nameButton.innerHTML = "Change plant name to:";
    plantInput.appendChild(nameButton);

    var newNameInput = document.createElement("input");
    plantInput.appendChild(newNameInput);

    nameButton.onclick = function () {
        plant.setName(newNameInput.value);
    };

    plantInput.appendChild(document.createElement("br"));

    // Title change
    var descButton = document.createElement("button");
    descButton.innerHTML = "Add to the plant description:";
    plantInput.appendChild(descButton);

    var newDescInput = document.createElement("textarea");
    plantInput.appendChild(newDescInput);

    descButton.onclick = function () {
        plant.addDesc(newDescInput.value);
    };


    display();

    return plant;
}
