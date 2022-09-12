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
function MakePlant(params) {
    if (!params) {
        throw("Error: Missing arguments passed to MakePlant function!");
    }
    
    var plant = document.createElement("div");
    plant.classList.add("plant");
    
    plant.desc = params.desc | "Add a description for the plant specimen.";
    
    
    var name = params.name | "Add a name to this plant specimen.";
    
    
    
    return plant;
}
