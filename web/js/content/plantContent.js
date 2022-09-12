/*
    Created on : Sept 12, 2022
    Class      : 3308
    Author     : Steve Tolvaj
 */

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
    return ele;    
}


