# Maker-Collab

### This game was developed with:
* HTML
* CSS
* JavaScript
* jQuery
* Node.js

### Description
There are several sites today where people can post about their hobby maker projects with microcontrollers, mechatronics, etc., but they are just that - a post describing a project typically worked on by one person. Maker-Collab aims to connect makers to work collaboratively on their projects, which helps people build new skillsets, share hardware and software resources, and build cool stuff!

### Project Structure

#### RESTful routes:

(work in progress)
| Method | Path | Action |
| ------ |------| -------|
| GET | '/' | index |
| GET | '/auth/login' | ? |
| POST | '/auth/login' | ? |
| GET | '/auth/signup' | new |
| POST | '/auth/signup' | create |
| GET | '/auth/logout' | ? |
| GET | '/profile/new' | new |
| GET | '/profile' | index |
| POST | '/profile' | create |
| PUT | '/profile/:id' | update |
| GET | '/projects' | index |
| GET | '/projects/:id' | show |
| POST | '/projects/' | create |
| DELETE | '/projects/:id' | delete |


#### Database Models:

| Model | Schema | Relationship(s) |
| ----- |--------| ----------------|
| User | name, email, password | hasOne Profile |
| Profile | bio, lat, long, userId | hasMany Projects, belongsTo User |
| Projects | title,description,code,lookingFor,profileId | belongsTo Profile, hasMany Tags |
| Tags | tagName | belongsToMany Projects |

### Project Tracking

I tracked progress with this [Trello Board](https://trello.com/b/pkgP40vV/ga-project-2)

### Minimum Viable Product (MVP)



### Front End Styling


### Result and Next Steps

Future items i'd like to implement are:



