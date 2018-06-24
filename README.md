# Maker-Collab

### This game was developed with:
* HTML
* CSS
* JavaScript
* jQuery
* Node.js

### Description
There are several sites today where people can post about their hobby projects with microcontrollers and computers like Arduino and Raspberry Pi, but they are just that - a post describing a project typically worked on by one person. Maker-Collab aims to connect makers to work collaboratively on their projects, which helps people build new skillsets, share hardware and software resources, and build cool stuff!

### Project Structure

RESTful routes:

Database Models:

| Model | Schema | Relationship |
| ------------- |-------------| -----|
| User | name,email,password | hasOne Profile |
| Profile | hardware,software | hasMany Projects, belongsTo User |
| Projects | title,picture,description,code,hardware | belongsTo Profile |

### Project Tracking

I tracked progress with this [Trello Board](https://trello.com/b/pkgP40vV/ga-project-2)

### Minimum Viable Product (MVP)



### Front End Styling


### Result and Next Steps

Future items i'd like to implement are:



