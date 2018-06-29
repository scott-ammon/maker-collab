# Maker-Collab

### This full stack web application was developed with:
* JavaScript
* jQuery
* Node.js
* Express
* Materialize
* HTML
* CSS

### Description
There are several sites today where people can post about their hobby maker projects with microcontrollers, mechatronics, etc., but they are just that - a post describing a project typically worked on by one person. Maker-Collab aims to connect makers to work collaboratively on their projects, which helps people build new skills, share hardware and software resources, and build cool stuff!

### Project Structure

#### RESTful routes:

(work in progress)

| Method | Path | Action |
| ------ |------| -------|
| GET | '/' | index |
| GET | '/auth/login' | new |
| POST | '/auth/login' | log in user |
| GET | '/auth/signup' | new |
| POST | '/auth/signup' | create |
| GET | '/auth/logout' | log out user |
| GET | '/map' | index |
| POST | '/map/filter' | filter map by tag |
| GET | '/projects' | index |
| GET | '/projects/new' | new |
| POST | '/projects/' | create |
| GET | '/projects/:id' | show |
| PUT | '/projects/:id' | update |
| DELETE | '/projects/:id' | delete |

#### Database Models:

| Model | Schema | Relationship(s) |
| ----- |--------| ----------------|
| User | name, email, password | has one Profile |
| Projects | title,description,location,lat,lng,userId | belongsTo User, hasMany Tags |
| Tags | tagName | belongsToMany Projects |


### Project Tracking

I tracked progress with this [Trello Board](https://trello.com/b/pkgP40vV/ga-project-2)

### Wireframing


### Minimum Viable Product (MVP)


### Challenges

#### Database setup: 

I started the project with models for a user, profile, project, and tag. After establishing the associations between the models and writing initial routes it became clear that I was adding too many layers of associations in order to make my mapping functionality. I refactored by removing the profile model, and implementing the required data in the user and projects models instead. This greatly simplified the relationships, but allowed for the same amount of data to be entered.

#### Geocoding:

In order to map project locations, I needed to add a sequelize hook with a geocoder to take the user's location string and convert to latitude/longitude. I initially used the node module called geocoder, but ran into issues with it being asynchronous. The database would create the table entry, but would crash the app because it couldn't read the geometry data as geocoder hadn't finished running. After some digging, I found 'node-geocoder', another node module that implements geocoding with promises, allowing for the locations to be grabbed before completing the database entry, and logging an error if no lat/lng was found.





### Front End Styling

I decided to implement Materialize for it's great JavaScript components. I'm not the biggest fan of Material Design, but this is a great framework for getting a site running quickly with user friendly interfaces. If I had more than the alloted time on this project, I'd like to dig into UIKit which I think has better user interface components (and more of them), but requires more CSS to tailor to your personal style. 

Color Palette:


### Result and Next Steps

Future items i'd like to implement are:

