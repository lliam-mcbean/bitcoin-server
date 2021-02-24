# BITCOIN PRICE TECHNICAL

This is a Node.js backend mixed with a WebGL/THREE.js front-end. It is deployed through Heroku.

There were some challenges involved with making a THREE.js project that connected to a backend server. I ended up using Jquery for the get requests, it seemed to make setting the interval function once I got the data the easiest.

I could not import certain features from the THREE.js library as I had to use the CDN to bring in the library, I had a problem importing modules that I couldn't figure out, so no orbit controls.

The major thing I would change would be how I chose to parse the csv file, I ended up using a node package called csv-parser which made the work easy. I have another project deployed where I do all the splitting in JavaScript, but there is no backend server and I just pump it into local storage. So if I had the chance I would go back and parse it more manually within the index.js app file.
