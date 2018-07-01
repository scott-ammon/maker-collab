# Maker-Collab

### Description
There are several websites today where people can post about their hobby electronics projects with single board computers, but they are just that - a post describing a project typically worked on by one person. Maker-Collab aims to connect makers to work collaboratively on their projects, which helps people build new skills, share hardware and software resources, and build cool stuff! Users post project ideas to their profile, and other users can find projects in their area, and reach out to the project idea creator to collaborate.

### Project Structure

#### This web application was developed with:
* JavaScript
* jQuery
* Node.js
* Express
* Chart.js
* Mapbox GL JS
* Materialize
* HTML
* CSS

#### RESTful routes:

| Method | Path | Action |
| ------ |------| -------|
| GET | '/' | index - homepage of site |
| GET | '/auth/login' | returns new form to login |
| POST | '/auth/login' | log in user |
| GET | '/auth/signup' | returns new form to sign up |
| POST | '/auth/signup' | creates new user |
| GET | '/auth/logout' | log out user |
| GET | '/user' | display user page (shows all projects too) |
| PUT | '/user' | update user bio |
| GET | '/user/:id' | show specific user |
| GET | '/user/edit' | get form to edit bio |
| GET | '/map' | index page displays all projects on map |
| POST | '/map/filter' | filter map by tag |
| GET | '/projects/new' | get new form to create project |
| POST | '/projects' | create new project |
| GET | '/projects/:id' | show specific project |
| PUT | '/projects/:id' | update specific project |
| DELETE | '/projects/:id' | delete specific project |

#### Database Models:

| Model | Schema | Relationship(s) |
| ----- |--------| ----------------|
| User | name:string, email:string, password:string, bio:text | has one Profile, hasMany Projects |
| Projects | title:string, description:text, location:string, lat:float, lng:float, userId:integer | hasMany Tags |
| Tags | tagName:string | hasMany Projects |

### User Stories

Some sample cases that helped develop the framework of the site:

As a hobbyist, I want to be able to find other hobbyists near me that can help me with my hardware & software questions.

As a developer, I want to find others who have hardware experience to help me build out my project ideas.

As a hobbyist, I want to share hardware & software with others near me so we can build more complex projects without the upfront cost.


### Wireframing

I drew preliminary sketches in Adobe XD to plan out the main pages with interactivity. This helped me narrow down the routes that would have to be created to display the relevant pages.

![wireframe](/public/img/project2-wireframes.png?raw=true)

### Project Tracking

I tracked progress with this [Trello Board](https://trello.com/b/pkgP40vV/ga-project-2)

### Minimum Viable Product (MVP)


### Challenges:
#### Database setup

I started the project with models for a user, profile, project, and tag. After establishing the model associations I realized I was adding too many layers of associations in order to make my project mapping functionality. I refactored by removing the profile model, and implementing the required data in the user and projects models instead. This greatly simplified the relationships, but allowed for the same amount of data to be entered.

#### Geocoding

In order to map project locations, I needed to add a sequelize hook with a geocoder to take the user's location string and convert to latitude/longitude. I initially used the node module called geocoder, but ran into issues with it being asynchronous. The database would create the table entry, but would crash the app because it couldn't read the geometry data as geocoder hadn't finished running. After some digging, I found 'node-geocoder', another node module that implements geocoding with promises, allowing for better handling of the asynchronous behavior, and logging an error if no lat/lng was found rather than crashing the app.

#### Filtering the Map

For users to see only select projects on the map, I added a filter drop down that shows the possible tags that projects may contain. The issue was each time a filter was chosen, the page refreshed and did not maintain the current map state. In order to get around this, I initially tried passing back the current map center and zoom levels as hidden inputs in the HTML form data, and then passing them to the front again on page refresh. There had to be a more efficient way... I realized that by intercepting the post route on the front end, all I had to do was grab the filtered project data from the database, erase the existing map markers and plot the new projects by sending JSON data back from the server-side post route. This greatly simplified the code and made for a better user experience as the page does not reload, and the map stays centered where the user was exploring.

### Front End Styling

I decided to implement Materialize for it's great JavaScript components. I'm not the biggest fan of Material Design, but this is a great framework for getting a site running quickly with user friendly interfaces. For my next project I'd like to dig into UIKit which I think has better user interface components (and more of them), but requires more CSS to tailor to your personal style. 

I tried to keep the pages as clean as possible without conflicting colors, but would like to improve the overall appearance as a next step. I think there are too many font sizes and conflicting headings that prevent it from looking as professional as I'd like.

### Result and Next Steps

Future items i'd like to implement are:

* In-app message feature between users to collaborate, as sending emails freely is not an appropriate method for a public site unless they're masked in some way (e.g. Craigslist)
* Add ability to save your favorite project ideas to your profile
* Add page for completed projects for users to show off what they built by collaborating, which would demonstrate the capability of the site
* Add multiple separate filter selectors on map page to filter by hardware, software, and other categories simultaneously




