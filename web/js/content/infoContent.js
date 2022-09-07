function infoContent() {

    var content = `
    <h4>Information</h4>
    <h5> I added this info content link in as an extra just to have another link.</h5>
    <p>
        This is the information about the website. There should be more soon. 
        Eventually it will be fully functioning.
    </p>
    `;

    var ele = document.createElement("div");
    ele.innerHTML = content;
    return ele;
}


