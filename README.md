# Webpack implementation of Stella

An example of using webpack to render ES6/2015 react project.  Based on [stella](https://github.com/coder36/stella).  

The most optimised version of the site is served up as a static html file, with the isomorphic site pre-rendered and embedded in a html file.
This is as fast as it gets: 
####[demo](http://pure-mountain-5774.herokuapp.com/index.html)
  
  - React 
  
  - Webpack
  
  - Node
  
  - Isomorphic React
  
  - Jest
  
  - Express
  
  - Rake
  
It's responsive...

<a href="http://pure-mountain-5774.herokuapp.com/"><img src="https://raw.githubusercontent.com/coder36/stella/master/public/img/screenshot2.png" width="400px" /></a>



## Isomorphic React

One of the problems with react, is that the initial load and parsing of the javascript can be slow.  On a modern device this isn't a problem,
but on an older phone, the delay can make for a bad user experience - it appears as though the website has stopped responding.   
The work around for this is to pre render the page using 'isomorphic' react.  For stella, most of the content is pulled dynamically from
 json endpoints - this can not be pre-redndered.  However parts of stella can be pre-rendered:  

This works really well on a mobile device and effectively disguises what can be a slow first render.

####[isomorphic demo](http://pure-mountain-5774.herokuapp.com/index_iso)


## Dev Setup

When running in dev mode, webpack handles the  ES6/2015 javascript transpilation.

        bundle
        rake bootstrap
        rake start
        
This will start up an express server and a `webpack --watch`         
        
        
Open [http://localhost:3000/index](http://localhost:3000/index)

### Isomorphic
The isomorphic version uses node to pre-render the page.  It's missing a fair bit of content, but on slow mobile devices at least
the user isn't left with an empty page.

Open [http://localhost:9292/iso](http://localhost:9292/iso)

Open [http://localhost:9292/index_iso](http://localhost:9292/index_iso)

You will see an initial static version of the site, until react takes over client side.  This works best on a mobile.



## Running in production mode

        rake build
 
This will generate static content in the `_gen` folder 
 
[http://localhost:3000/index.html](http://localhost:3000/index.html) 

[http://localhost:9292/iso.html](http://localhost:9292/iso.html)


## Deploying to heroku

        rake heroku:deploy
        rake heroku:logs
        
