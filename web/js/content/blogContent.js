"use strict";
        function blogContent() {
// ` this is a "back tick". Use it to define multi-line strings in JavaScript.
        var content = ` 
      <h2>My Blog</h2>
      <h3>Database Design</h3>

            <p>&emsp;The database table (other) will be used to store the plant information 
                that the user has entered. It will include the following details
            <ul>
                <li>Auto incrementing primary key - BIGINT_auto-incrementing</li>
                <li>The name of the plant - VARCHAR</li>
                <li>The description of the plant - VARCHAR</li>
                <li>The latitude/GPS coordinate the plant was found - DECIMAL(10,8)</li>
                <li>The longitude/GPS coordinate the plant was found - DECIMAL(11,8)</li>
                <li>The URL of the plants image - VARCHAR</li>
                <li>The region the plant is in - VARCHAR</li>
                <li>The season of the year it was found - VARCHAR</li>
                <li>The foreign key for identifying the user that found it - BIGINT</li>
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

            <h3>HomePage Homework Reflection</h3>

            <p> &emsp; The week's homework was well explained and not too difficult
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
    
            <h3>JS UI Homework Reflection</h3>
            
            <p> &emsp; The week's homework showed a very interesting way to learn
                about producer and consumer-style code. It proves to be a very
                reliable and reusable code. The only hard part of the homework
                for me was analyzing the provided code to understand how it works.
                Once that step was complete the rest of the homework was fairly
                easy. I did find that learning about overriding style sheets was
                valuable if you are using provider code samples. Overall, it was
                a great way to introduce and learn JavaScript. It also allowed 
                some time to improve the styling of my website.
            </p>
    
            <h3>JS Objects Homework Reflection</h3>
            
            <p> &emsp; This week's homework was more of a medium level of difficulty
                for me. This was because of some small issues with styling.
                When I was setting the styling for the new objects page it took me
                a while to realize the image styling was being overridden by the original
                content div id. I did find a solution by adding the important tag
                to the width of the image within the new object selector. Other
                than that it was fairly easy and very interesting to learn about
                how to modify DOM elements from JavaScript. I enjoyed this homework
                overall and look forward to learning more!
            </p>
            
            <h3>Database</h3>
            
            <p> &emsp; I have had some experience with databases from a previous
                database management class. It has been a while since I have worked
                with MySQL directly since I usually use frameworks that automatically
                populate tables. So far the topics are not new to me but definitely 
                a good refresher since I do not remember them. Previously I have
                used MySQL workbench for local and remote databases on AWS RDBS
                and have also written SQL scripts using Java JDBC connector.
                The only other database work I have done was Spring with Hibernate
                where it really did not require any MySQL scripts.<br/>
                &emsp; The homework was fairly easy due to my previous experience
                but still had to relearn some MySQL keywords. I also learned that 
                if you use the table editor on MySQL workbench and try to insert
                null into non-character fields it will change the field to zeros.
                I realized that if I wanted the field to be truly null I would have to 
                run a script that specified it to be null. This homework was a 
                good way to figure out new things and the link to it can be found
                <a target="blank" href="./docs/tolvaj_steve_database_HW.pdf">here</a>.
            </p>
            
            <h3>Web API</h3>
            
            <p> &emsp; My previous server-side database access code included using
                JPA, Hibernate, and JDBC at a beginner level before. I have never
                linked it to a front-end program before. My experience with it was
                 more of an abstract way to work with database access code.
                This was a great way to learn how to learn database access 
                at a lower level and get a better understanding of how it works.
                I also learned how to generate better user-friendly error messages
                instead of just having one generalized error message. This homework
                showed how it is better to have various error messages at different 
                levels of the program to provide better debugging. Also to have a 
                user-friendly error message, which I have never thought of other
                than a few alerts to display here and there. I have also never 
                imported the drivers manually and it was a good way to learn while
                using NetBeans. I usually use different IDEs where I can just click
                add dependancys. It is useful to know how to do this manually when 
                needed. The error message document can be found 
                <a target="blank" href="./docs/Tolvaj_webAPI_HW5.pdf">here</a>. 
            </p>
            <h3>Clicksort</h3>
            
            <p> &emsp; The progress made for this week was implementing a table
                to show the registered users along with their data(found under search
                and click on users). The other table shows the plants and the user's
                email that identified the plant(found under search and click on plants).
                The table includes sorting ascending and descending when the header column
                names are clicked. The arrow showing the order is also animated to show 
                the updated sort order. Another feature of these tables is the search filter
                function. The table entries are filtered based on the characters in the 
                search filter entry.<br/>
                &emsp; It was fairly easy to implement the reusable table component
                but a little more difficult to get the arrow direction and search filter
                function to work. After reading through the code a few times it became easier
                to understand how to implement the search filter function. I found it very
                interesting to learn about how to rotate images using JavaScript for showing
                ascending and descending order on the table header names.
                
            </p>

    `;
                var ele = document.createElement("div");
                ele.innerHTML = content;
                return ele;
        }