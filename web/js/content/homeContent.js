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
                There will be a small membership fee to use this application.<br><br>

                <img src="pics/fern.jpg" alt="Green fern">

                <cite>
                    Photo by 
                    <a href="https://unsplash.com/@xteemu?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                        Teemu Paananen
                    </a> on 
                    <a href="https://unsplash.com/s/photos/plant-identification?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
                        Unsplash
                    </a>
                </cite>


                <br>
                &emsp; Any user will be able to log into their account after creating
                one with their email address, password, and membership type. Once 
                the user is logged in they will be able to add any plants they have 
                found with the name, description, and image. This will be completed
                using a separate web page. Additionally, the location (latitude and 
                longitude) may be added to be more specific. After the plant 
                identification has been added. All plants can be
                browsed along with their details from another web page. This page
                will list all plants with the users that have added the plants. 
                There will also be functionality to edit and remove plants if
                it is required by the user.</p>

            <h3>Database Design</h3>

            <p>&emsp;The database table (other) will be used to store the plant information 
                that the user has entered. It will include the following details
            <ul>
                <li>Auto incrementing primary key - integer</li>
                <li>The name of the plant - characters</li>
                <li>The description of the plant - characters</li>
                <li>The latitude/GPS coordinate the plant was found - decimal</li>
                <li>The longitude/GPS coordinate the plant was found - decimal</li>
                <li>The URL of the plants image - characters</li>
                <li>The region the plant is in - character</li>
                <li>The season of the year it was found - character</li>
                <li>The foreign key for identifying the user that found it - integer</li>
            </ul>
            <p>

            <h3>Web Development Experience</h3>

            <p>&emsp;My web development experience is at a beginner level when
                it comes to HTML, CSS, and JavaScript. I did take a short
                online course many years ago and I still remember some of the
                topics. Currently, I do have
                slight experience using Java Spring Boot to create Restful APIs
                with Hibernate to store data in MySQL databases. This should make
                learning these new topics easier.
                Also, I have completed a good amount of Android Mobile Applications
                with XML and Kotlin, which I believe are slightly similar to HTML and
                JavaScript but still different in many ways. I am also familiar with
                how HTTP requests are handled on backend services. Overall, looking
                forward to everything that will be taught in this course!</p>

            <h3>Current Homework Reflection</h3>

            <p>This week's homework was well explained and not too difficult
                besides taking the time to experiment with different layouts and 
                CSS attributes. The HTML portion of the assignment was fairly easy
                but the CSS portion was slightly more difficult and took some time
                to experiment with different designs. I choose an interesting
                navigation bar at first that was along the bottom of the title bar
                but realized after it was completed that it did not have enough
                content. It also would need to collapse when in narrow view so I
                have decided to wait to implement it at a later date once there is 
                more content. This homework was valuable for learning and reviewing
                responsive design that I have previously struggled with. It also
                helped me learn more CSS attributes that I have never used.</p>

    
    `;
        var ele = document.createElement("div");
        ele.innerHTML = content;
        return ele;
        }