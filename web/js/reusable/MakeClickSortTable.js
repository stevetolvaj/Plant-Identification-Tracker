"use strict";


/**
 * 
 * @param {string} title The title of the table.
 * @param {object []} objList The list of objects to display in the table
 * @param {string} sortOrderPropName The name of the prop that the list should be sorted by
 * @param {string} sortIcon The icon to be used when the column is sorted
 * @returns {Element|MakeClickSortTable.container} The container of the table
 */
function MakeClickSortTable(title, objList, sortOrderPropName, sortIcon) {

    /**
     * The jsSort function will sort the list based on the property
     * @param {object[]} objList The list of objects to sort
     * @param {string} byProperty The property to sort the list by
     * @returns {undefined}
     */
    function jsSort(objList, byProperty) {

        if (!objList || !objList[0]) {
            var message = "List cannot be sorted. Not enough objects to sort through.";
            console.log(message);
            alert(message);
            return; 
        }

        var obj = objList[0];
        if (!obj[byProperty]) {
            var message = "The list does not have the property " + byProperty + " to sort by.";
            console.log(message);
            alert(message);
            return;  
        }

        if (!obj[byProperty].sortOrder || obj[byProperty].sortOrder === null) {
            var message = "Cannot sort objList by property " + byProperty +
                    " because this property never had it's sortOrder set (by a method in SortableTableUtils.js).";
            console.log(message);
            alert(message);
            return;  // early return -- dont try to sort.
        }

        // q and z are just elements in the array and the funcction has to return negative or positive or zero 
        // depending on the comparison of q and z.
        // using JS associative array notation (property name char string used inside square brackets 
        // as it if was an index value). 

        objList.sort(function (q, z) {  // in line (and anonymous) def'n of fn to compare list elements. 
            // the function you create is supposed to return positive (if first bigger), 0 if equal, negative otherwise.

            // using JS associative array notation, extract the 'byProperty' property from the two
            // list elements so you can compare them.
            var qVal = q[byProperty].sortOrder;
            var zVal = z[byProperty].sortOrder;


            var c = 0;
            if (qVal > zVal) {
                c = 1;
            } else if (qVal < zVal) {
                c = -1;
            }
            console.log("comparing " + qVal + " to " + zVal + " is " + c);
            return c;
        });

    } // jsSort


    // remove the tbody from 'table' (if there is one). 
    // sort 'list' by 'sortOrderPropName'. 
    // add a new tbody to table, inserting rows from the sorted list.
    function addTableBody(table, list, sortOrderPropName) {

        // remove old tbody element if there is one (else you'll get the new sorted rows 
        // added to end of what's there).
        var oldBody = table.getElementsByTagName("tbody");
        if (oldBody[0]) {
            console.log("ready to remove oldBody");
            table.removeChild(oldBody[0]);
        }

        jsSort(list, sortOrderPropName);

        // Add one row (to HTML table) per element in the array.
        // Each array element has a list of properties that will become 
        // td elements (Table Data, a cell) in the HTML table. 
        var tableBody = document.createElement("tbody");
        table.appendChild(tableBody);

        // To the tbody, add one row (to HTML table) per object in the object list.
        // To each row, add a td element (Table Data, a cell) that holds the object's 
        // property values. 
        for (var i in objList) {
            var tableRow = document.createElement("tr");
            tableBody.appendChild(tableRow);

            // create one table data <td> content matching the property name
            var obj = objList[i];
            for (var prop in obj) {

                // **** THE ONLY CHANGE IS HERE ****
                // obj[prop] should already hold a "td" tag
                tableRow.appendChild(obj[prop]);
                // **** END OF THE CHANGE       ****
            }
        }

    } // addTableBody

    function makeHeader(propName, sortIcon) {

        var headingCell = document.createElement("th");

        var headingText = propName.replace("_", " ");

        // if the first character of a property name starts with underscore then we assume that 
        // column should not be click sortable (maybe it is an image column). 
        if (propName[0] !== "_") {
            headingText = headingText + "<img src='" + sortIcon + "'/> ";
            headingCell.onclick = function () {
                console.log("WILL SORT ON " + propName);
                addTableBody(newTable, objList, propName);
            };
        }
        headingCell.innerHTML = headingText;
        return headingCell;
    } // end makeHeader


    // **** ENTRY POINT ****

    // Create a container to hold the title (heading) and the HTML table
    var container = document.createElement("div");
    container.classList.add("clickSort");

    // Add a heading (for the title) and add that to the container
    var heading = document.createElement("h3");
    heading.innerHTML = title;
    container.appendChild(heading);

    // Create a new HTML table tag (DOM object) and add that to the container.
    var newTable = document.createElement("table");
    container.appendChild(newTable);

    // To the HTML table, add a tr element to hold the headings of our table.
    var headerRow = document.createElement("tr");
    newTable.appendChild(headerRow);

    // ADD one column heading per property in the object list.
    var obj = objList[0];
    for (var propName in obj) {
        headerRow.appendChild(makeHeader(propName, sortIcon));
    }

    // After sorting objList by sortOrderPropName, create or replace the tbody 
    // populated with data from the sorted objList.
    addTableBody(newTable, objList, sortOrderPropName);

    return container;

}  // MakeTableBetter