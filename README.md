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
There are several websites today where people can post about their hobby electronics projects with single board computers, but they are just that - a post describing a project typically worked on by one person. Maker-Collab aims to connect makers to work collaboratively on their projects, which helps people build new skills, share hardware and software resources, and build cool stuff! Users post project ideas to their profile, and other users can find projects in their area, and reach out to the project idea creator to collaborate.

### Project Structure

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
| User | name:string, email:strin, password:string,bio:text | has one Profile |
| Projects | title:string,description:text,location:string,lat:float,lng:float,userId:integer | belongsTo User, hasMany Tags |
| Tags | tagName:string | belongsToMany Projects |

### User Stories

### Wireframing

### Project Tracking

I tracked progress with this [Trello Board](https://trello.com/b/pkgP40vV/ga-project-2)

### Minimum Viable Product (MVP)


### Challenges:
#### Database setup

I started the project with models for a user, profile, project, and tag. After establishing the model associations I realized I was adding too many layers of associations in order to make my project mapping functionality. I refactored by removing the profile model, and implementing the required data in the user and projects models instead. This greatly simplified the relationships, but allowed for the same amount of data to be entered.

#### Geocoding

In order to map project locations, I needed to add a sequelize hook with a geocoder to take the user's location string and convert to latitude/longitude. I initially used the node module called geocoder, but ran into issues with it being asynchronous. The database would create the table entry, but would crash the app because it couldn't read the geometry data as geocoder hadn't finished running. After some digging, I found 'node-geocoder', another node module that implements geocoding with promises, allowing for the locations to be grabbed before completing the database entry, and logging an error if no lat/lng was found.

### Front End Styling

I decided to implement Materialize for it's great JavaScript components. I'm not the biggest fan of Material Design, but this is a great framework for getting a site running quickly with user friendly interfaces. For my next project I'd like to dig into UIKit which I think has better user interface components (and more of them), but requires more CSS to tailor to your personal style. 

Color Palette:


### Result and Next Steps

Future items i'd like to implement are:

