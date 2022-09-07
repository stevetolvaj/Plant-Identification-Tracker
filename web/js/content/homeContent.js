function homeContent () {

// ` this is a "back tick". You can use it to define multi-line strings in JavaScript.
// 
// NetBeans menu option "Source - Format" will not work with the text inside of a 
// String, so you have to do this indentation manually with the editor. 

var content = `

       <h3>Functionality and Purpose</h3>

            <p>&emsp; Welcome to the Plant ID Tracker web application. 
                if you would like to learn more about plant taxonomy please click 
                the link here to the 
                <a href='https://en.wikipedia.org/wiki/Plant_taxonomy'>
                    Plant Taxonomy Wikipedia</a>.
                The vast amount of plants and the many types that can be found
                in the wild is what inspired this application. This website will
                allow you to join as a member. Share what plants you have found and
                where you have found them. Most importantly, you will be able to 
                store your images and descriptions of the plants you have found. 
                Another option will be to join as a premium member. This will allow
                you to update and identify plants from others if they are incorrect.
                There will be a small membership fee to use this application.<br></p>
                <figure>
                <img src="pics/fern.jpg" alt="Green fern">

                <figcaption>
                    Photo by 
                    <a href="https://unsplash.com/@xteemu?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                        Teemu Paananen
                    </a> on 
                    <a href="https://unsplash.com/s/photos/plant-identification?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                        Unsplash
                    </a>
                </figcaption>
                </figure>
                <p>&emsp; Any user will be able to log into their account after creating
                one with their email address, password, and membership type. Once 
                the user is logged in they will be able to add any plants they have 
                found with the name, description, and image. This will be completed
                using a separate web form. Additionally, the location (latitude and 
                longitude) may be added to be more specific. After the plant 
                identification has been added. The plants can be
                browsed along with their details from another web page. This web
                page will have a search feature to make finding users identified
                plants easier to find. The page will list all plants with the users 
                that have added the plants. There will also be functionality to 
                edit and remove plants if it is required by the user.</p>
    
                <p>&emsp; The goal of this application is to allow people to add
                various plant species identification along with the location to
                more easily identify different species. It can be difficult to
                identify plants from a book or other databases when locations
                of the plants are not easily accesses. It can also be benificial
                to allow editing of others identifications to update names/descriptions
                if they are incorrect. This will decrease errors and keep the data
                up to date. Please feel free to join and start identifying!</p>

    `;
        var ele = document.createElement("div");
        ele.innerHTML = content;
        return ele;
}