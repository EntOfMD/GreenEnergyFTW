# GreenEnergyFTW

A site for all things green energy news, utilizing cheerio to scrape and mongodb to store the results.

## How it works

---

To understand _HOW_ it works, let's take a look at **WHAT** it uses.

-   **Web Framework** - used for front-end

    -   Bootstrap
    -   _Handlebars_

-   **Web Server** - literally creates the server

    -   Express

-   **Programming Languange**
    -   Node.js (Js Framework) - Server-side JS
-   _Javascript Libraries_

    -   jQuery - Not much of it is being used, apart from displaying tooltips

-   **Database**

    -   MongoDB <-highlight of this app

-   **NPM Packages**
    -   **Axios**
    -   Body-Parser
    -   **Cheeri**
    -   debug
    -   dotenv
    -   _express_
    -   _express-handlebars_
    -   http-errors
    -   **mongoose**
    -   morgan
    -   nodemailer

### Well then, tell me how it works!

**_GreenEnergyFTW_** uses _express_ to create a server inside _node.js_ environment, written in JS. By utilizing MVC (Model, View, Controller) architecture, it's a versatile app that separates it's functionality so spaghetti code won't happen. The app then scrapes specified URL using _cheerio.js_, saves the data into _mongoDB_ database, and finally shows into the DOM via _express-handlebars_, which is a view engine.

## Future Plans

---

-   Add feature for users to add in scrape URL
-   _complete_ the feature allowing users to submit their own images for the main carousel
-   scrape the site name, date, etc info
-   scrape for images other than thumbnails

My personal thoughts:

I only honestly feet like I've come a long way since beginning the GW course. I've attempted scraping with cheerio sometime before the program, but gave up too soon before everything clicked. This homework forced me to go back to it and see what I did and I was able to understand the mistakes. This is probably the last homework I will submit (2 free passes hehe) and I will focus most of the free time on the big bad Project #3. I can honestly say I gave it all.

Send me an email: https://greenenergyftw.herokuapp.com/letsgrabacoffee

[GreenEnergyFTW](https://github.com/EntOfMD/GreenEnergyFTW)

[EntOfMD's Portfolio](https://entofmd.github.io/Bootstrap-Portfolio/portfolio.html)

Ashell F\_ &copy; 2019
