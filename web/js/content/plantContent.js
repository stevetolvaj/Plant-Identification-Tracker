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
      <h2>Plants Identified to Date:</h4>
      <p>
        The following list of plants have been identified by various users.
      </p>
    `;

    var ele = document.createElement("div");
    ele.innerHTML = content;


    var plantContainer = document.createElement("div");
    ele.appendChild(plantContainer);

    var plant1 = MakePlant({name: "Western Red Cedar",
        desc: `
                Western red cedar, (Thuja plicata), also called western arborvitae, 
                giant arborvitae, or Pacific red cedar, an ornamental and timber evergreenconifer 
                of the cypress family (Cupressaceae), native to the Pacific coast of North America.
                <br/><br/>Western red cedar trees and shrubs are pyramidal in form. The trees may grow up to 
                60 metres (about 200 feet) tall and 6 metres in circumference, measured above the 
                strongly buttressed base. The cinnamon-red or brownish outer bark is relatively thin, 
                fissured, and scaly, shedding in irregular flakes; the inner bark is fibrous. Short, 
                horizontal, or slightly drooping branches bear dense branchlet systems in flattened 
                sprays that appear bright green on the upper side and dark waxy green beneath. The tiny, 
                pointed, scalelike leaves may have faint whitish patches on the undersurfaces. The egg-shaped 
                or slightly elongated cones, 8 to 12 mm (0.3 to 0.5 inch) long, bear five to six pairs of thin 
                flexible scales <a href="https://www.britannica.com/plant/Western-red-cedar">https://www.britannica.com/plant/Western-red-cedar</a>.
              `,
        image: "pics/red_cedar.jpg"});
    var plant2 = MakePlant({name: "Ipomoea indica",
        desc: `
                Ipomoea indica is a vigorous, long-lived, tender perennial vine native to tropical, 
                subtropical and warm temperate habitats throughout the world. They can most commonly 
                be found in disturbed forests, forest edges, secondary woodland, suburban gullies, and 
                along roadsides and waterways. The plant climbs well over other plants, walls and slopes 
                as growing on the bottom. Its climbing habit allows it to compete with trees and shrubs 
                successfully. It is a twisting, occasionally lying, herbaceous plant which is more or 
                less densely hairy on the axial parts with backward-looking trichomes. The stems can 
                grow 3 to 6 cm long and sometimes have roots at the nodes. The leaves are petiolate 
                with 2 to 18 cm long petioles. The leaf blade is egg-shaped or round, 5 to 15 cm long 
                and 3.5 to 14 cm wide. The underside is densely hairy with short, soft trichomes, the 
                top is more or less sparsely hairy. The base is heart-shaped, the leaf margin is entire 
                or three-lobed, the tip is pointed or sharply pointed. The crown is funnel-shaped, 5 to 8 
                cm long, glabrous, bright blue or bluish purple, with age they become reddish purple or red. 
                The centre of the crown is a little paler. I. indica is a long-lived plant that can live up 
                to 25 years. <br/><br/>Inflorescence and fruit The inflorescences are dense, umbelliform cymes from a 
                few flowers. The inflorescence stems are 4 to 20 cm long. The bracts are linear or sometimes 
                lanceolate. The flower stems are 2 to 5 (rarely up to 8 mm) long. The sepals are almost uniform, 
                1.4 to 2.2 cm long and slowly sharpened linearly. They are hairless to close-fitting, the outer 
                three sepals are lanceolate to broadly lanceolate, and the inner two are narrowly lanceolate. 
                The stamens and the stamp do not protrude beyond the crown. The ovary is hairless. The scar is 
                three-lobed. The flowers change colour, where they start out as bright blue early in the morning, 
                shifting to a darker shade of blue in midday, then to a lavender blue and finally to a deep pink 
                at the end of the day. The fruits are more or less spherical capsules with a diameter of 1 to 1.3 cm. 
                The seeds are about 5 mm in size and are dispersed via rain, wind, human activity, gravity, and waterways.
                Flowering and fruiting are dependent on location. Some countries, such as Costa Rica and Nicaragua, 
                observe year round flowering and fruiting while other countries like South Africa observe 
                fruiting and flowering that is constrained to specific months
                <a href="https://en.wikipedia.org/wiki/Ipomoea_indica">https://en.wikipedia.org/wiki/Ipomoea_indica</a>.
                `,
        image: "pics/morning_glory.jpg"});
    // Replaced with default no arguments object below.
//    var plant3 = MakePlant({name: "Blueberry",
//        desc: `
//                Blueberries are a widely distributed and widespread group of perennial flowering plants with blue or purple berries. 
//                They are classified in the section Cyanococcus within the genus Vaccinium. Vaccinium also includes cranberries, bilberries, 
//                huckleberries and Madeira blueberries. Commercial blueberries—both wild (lowbush) and cultivated (highbush)—are all native 
//                to North America. The highbush varieties were introduced into Europe during the 1930s. Blueberries are usually prostrate 
//                shrubs that can vary in size from 10 centimeters (4 inches) to 4 meters (13 feet) in height. In commercial production of 
//                blueberries, the species with small, pea-size berries growing on low-level bushes are known as "lowbush blueberries" 
//                (synonymous with "wild"), while the species with larger berries growing on taller, cultivated bushes are known as "highbush blueberries". 
//                Canada is the leading producer of lowbush blueberries, while the United States produces some 40% of the world supply of highbush blueberries 
//                <a href="https://en.wikipedia.org/wiki/Blueberry">https://en.wikipedia.org/wiki/Blueberry</a>.
//            `,
//        image: "pics/blueberry.jpg"});

    var plant3 = MakePlant({});

    plantContainer.appendChild(plant1);
    plantContainer.appendChild(plant2);
    plantContainer.appendChild(plant3);

    return ele;
}


