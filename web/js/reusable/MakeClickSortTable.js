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

    var ascending = true;
    var rotationAngle = 0;

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


        /**
         * The objList sort funtion will be used as a helper function for sorting.
         */
        objList.sort(function (q, z) {

            // using JS associative array notation, extract the 'byProperty' property from the two
            // list elements so you can compare them.
            var qVal = q[byProperty].sortOrder;
            var zVal = z[byProperty].sortOrder;


            if (!ascending) {
                var c = 0;
                if (qVal > zVal) {
                    c = -1;
                } else if (qVal < zVal) {
                    c = 1;
                }
                console.log("comparing " + qVal + " to " + zVal + " is " + c);
                return c;
            }
            var c = 0;
            if (qVal > zVal) {
                c = 1;
            } else if (qVal < zVal) {
                c = -1;
            }
            console.log("comparing " + qVal + " to " + zVal + " is " + c);
            return c;
        });

    }

    /**
     * 
     * @param {type} table The table to insert the body in
     * @param {type} list The list to populate the body
     * @param {type} sortOrderPropName The header name to sort the list by
     * @param {type} filterValue The filter value from the input box
     * @returns {undefined}
     */
    function addTableBody(table, list, sortOrderPropName, filterValue) {

        // remove old tbody element if there is one (else you'll get the new sorted rows 
        // added to end of what's there).
        var oldBody = table.getElementsByTagName("tbody");
        if (oldBody[0]) {
            console.log("ready to remove oldBody");
            table.removeChild(oldBody[0]);
        }

        jsSort(list, sortOrderPropName);

        var tableBody = document.createElement("tbody");
        table.appendChild(tableBody);

        // To the tbody, add one row (to HTML table) per object in the object list.
        // To each row, add a td element (Table Data, a cell) that holds the object's 
        // property values. 
        for (var i in objList) {

            // Filter value is checked here
            if (isToShow(objList[i], filterValue)) {
                var tableRow = document.createElement("tr");
                tableBody.appendChild(tableRow);

                // create one table data <td> content matching the property name
                var obj = objList[i];
                for (var prop in obj) {
                    tableRow.appendChild(obj[prop]);
                }
            }
        }
    } // addTableBody

    function makeHeader(propName, sortIcon) {

        var headingCell = document.createElement("th");

        var headingText = propName.replace("_", " ");

        var img = document.createElement('img');
        img.src = sortIcon;

        headingCell.innerHTML = headingText;

        // Underscore used as spaces for header titles.
        if (propName[0] !== "_") {

            headingCell.onclick = function () {
                ascending = !ascending;
                rotationAngle += 180;
                if (rotationAngle === 360) {
                    rotationAngle = 0;
                }
                console.log("WILL SORT ON " + propName + "and down arrow is: " + ascending);
                img.style.transform = `rotate(${rotationAngle}deg)`;
                addTableBody(newTable, objList, propName);
            };
            headingCell.appendChild(img);
        }


        return headingCell;
    } // end makeHeader

    // Create a container to hold the title (heading) and the HTML table
    var container = document.createElement("div");
    container.classList.add("clickSort");

    // Add a heading (for the title) and add that to the container
    var heading = document.createElement("h2");
    heading.innerHTML = title;
    container.appendChild(heading);

    //************************************** Filter input *********************
    var searchDiv = document.createElement("div");
    container.appendChild(searchDiv);
    searchDiv.innerHTML = "Filter by: ";
    // Create a filter text box for user input and append it.
    var searchInput = document.createElement("input");
    searchDiv.appendChild(searchInput);

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


    // Input box filter changes make table body update with search input value
    searchInput.onkeyup = function () {
        console.log("search filter changed to " + searchInput.value);
        addTableBody(newTable, objList, sortOrderPropName, searchInput.value);
    };

    // Return true if any property of obj contains searchKey. Otherwise, return false.
    function isToShow(obj, searchKey) {

        // show the object if searchKey is empty
        if (!searchKey || searchKey.length === 0) {
            return true;
        }

        // convert search key to upper case (will convert values also to upper case before comparing).
        var searchKeyUpper = searchKey.toUpperCase();

        for (var prop in obj) {

            // Do not try to find a match for Table cells that hold images. 
            if (prop[0] !== "_") {

                // pull out the innerHTML because all properties of obj are actually <td> tags, not just text.
                var propVal = obj[prop].innerHTML; // associative array, using property name as if index. 
                var propValUpper = propVal.toUpperCase(); // convert to upper case to match searchKey.

                console.log("checking if " + searchKeyUpper + " is in " + propValUpper);

                if (propValUpper.includes(searchKeyUpper)) {
                    console.log("Yes it is inside");
                    return true;
                }
            } // excluding image tds
        }
        console.log("no it is not inside");
        return false;
    } // isToShow 

    return container;

}  