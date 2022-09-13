/*
    Created on : Sept 12, 2022
    Class      : 3308
    Author     : Steve Tolvaj
 */

"use strict";

/**
 * The content generating function will be for the make plant page that will
 * be populated with identified plant specimen objects as a vertical list.
 * @returns {Element|plantContent.ele} 
 */
function plantContent() {
    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = ` 
      <h4>Plants Identified to Date:</h4>
      <p>
        The following list of plants have been identified by various users.
      </p>
    `;
    
    var ele = document.createElement("div");
    ele.innerHTML = content;
    
    
    var plantContainer = document.createElement("div");
    ele.appendChild(plantContainer);
 
    var plant1 = MakePlant({name: "Red Cedar",
        desc: "Juniperus virginiana is a dense slow-growing coniferous evergreen tree that may never become more than a bush on poor soil, but is ordinarily from 5–20 metres (16–66 feet) tall, with a short trunk 30–100 centimetres (12–39 inches) in diameter, rarely to 27 m (89 ft) in height and 170 cm (67 in) in diameter.", 
        image: "pics/red_cedar.jpg"});
    var plant2 = MakePlant({name: "Ipomoea indica",
        desc: "Ipomoea indica is a species of flowering plant in the family Convolvulaceae, known by several common names, including blue morning glory, oceanblue morning glory, koali awa, and blue dawn flower. It bears heart-shaped or 3-lobed leaves and purple or blue funnel-shaped flowers 6–8 cm (2–3 in) in diameter, from spring to autumn. The flowers produced by the plant are hermaphroditic.",
        image: "pics/morning_glory.jpg"});
    var plant3 = MakePlant({name: "Blueberry",
        desc: "Blueberries are a widely distributed and widespread group of perennial flowering plants with blue or purple berries. They are classified in the section Cyanococcus within the genus Vaccinium. Vaccinium also includes cranberries, bilberries, huckleberries and Madeira blueberries.",
        image: "pics/blueberry.jpg"});

    plantContainer.appendChild(plant1);
    plantContainer.appendChild(plant2);
    plantContainer.appendChild(plant3);
    
    return ele;    
}


