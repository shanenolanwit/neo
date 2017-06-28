# Assignment 1 - ReactJS app.

Name: Shane Nolan (20012561)

## Overview.
Neo is an app used to assist agile teams manage 
sprint cycles. A sprint is composed of a collection of issues, 
each given an estimate of how long it will take to complete (
from 1 to 10 days), a priority ranked from low to high, and 
a status - complete or not complete. Each issue should have a 
simple descriptive name, with the ability to add more detail. 
Developers should be able to leave comments on issues to 
promote collaboration. Other developers should be able to vote 
up these comments if they find them helpful. 
The main objective while developing this application was to 
provide core features necessary to complete an agile development 
cycle without adding too much clutter.

Given the assignment specifications I attempted to implement a 
wide variety of features to demonstrate understanding and 
independant learning. I use es5 and es6, I ensured I had a large 
number of routes including parameterised routes, I incorporated 
a mock json server to demonstrate REST/CRUD principles and also 
incorporated a real web based database backend (firebase). Where 
possible I refactored functions to utility classes to keep components 
clean.



 . . . . . List of user features . . . . 
 
 + User registration / Authentication
 + Realtime Dashboard / Newsfeeds
 + Simulated graphs
 + Simple and clean UI design
 + Form Validation
 + Create / Read / Update / Delete Sprints
 + Create / Read / Update / Delete Issues
 + Comment Upvoting on issues
 + Search and sort issues
 + Breadcrumbs for quick navigation

## Installation requirements.
. . . .  List of software used to develop the app . . . . . . . 
+ bootstrap 3.3.6
+ firebase 3.6.10
+ lodash 2.4.2
+ react 15.4.2
+ react-dom 15.4.2
+ react-router 2.6.1
+ superagent 3.5.0
+ zingchart 2.1.2
+ zingchart-react 1.0.5
+ create-react-app tool
+ json-server 0.9.6
+ Firebase account
+ Postman
+ Windows OS
+ PhpStorm IDE
+ Sublime Text


After cloning the application, install json-server
npm install -g json-server
Create a firebase account and replace the firebase credentials in firebase_utils/constants
with your own credentials. Allows remote read/write may require some security config, see firebase documentation for more detail.
Create a json file named db.json somewhere on the file system 
and start up the json-server pointing it at the db.json file
The app expects the json-server to run on port 3004 so run a command 
similar to 
json-server --watch db.json --port 3004
once the json server has started, start the react app by 
running the commands 
npm install
npm start
The application should start up and can be accessed via the 
browser at the url http://localhost:3000/home

The list of users and their passwords are 
+ admin@neo.com - admin123
+ shane@neo.com - shane123
+ nicola@neo.com - nicola123
+ amanda@neo.com - amanda123

## Data Model Design.

Diagram of app's data model

![][image1]


## App Component Design.

A diagram showing the app's hierarchical component design 

![][image2]

## UI Design.

An empty json-server database - sprints,issues,comments -> a sprint can have many issues, an issue can have many comments
![][image3]
Users maintained by firebase
![][image4]
The login page allows you to login or register.js a new user
![][image5]
Firebase uses email and password to authenticate
![][image6]
The home screen - after logging in the user has more options along the nav bar
![][image22]
The manage tab is where you can list and create sprints
![][image11]
The sprint creation form maintains validation state
![][image20]
Custom validation rules allow checking for constraints such as valid date ranges
![][image21]
After creating a sprint, it will appear in the sprint list. Each row has a link to the sprint view and a button allowing you to delete the sprint
![][image19]
In the sprint view, the issues are listed in a table which contains a search bar, and an issue creation form 
![][image15]
Editable items are easy to edit, just click on them. Custom fields such as duration are calculated at run time
![][image16]
Once an issue is created it appears in the table. Each row contains a link to the issue and a button which allows you to delete the issue.
![][image17]
The different columns represent the health of the issue, which can be quickly determined by the colour
![][image18]
Sorting and searching are made easy using the text field across the top of the issue table and by using the chevron glyphs on top of each column. When you click a chevron the rows are sorted by that column in a descending order, clicking the glyph again will sort by that column in an ascending order
![][image13]
![][image14]
Issues are easy to edit and maintain, similar to previous components. Clicking on an editable item triggers edit mode. Clicking on the chevrons of the different issue fields - priority/workdays/status, updates the relevant field
![][image9]
Editing Made Easy. Comments can be added using a simple form. Comments are sorted by upvotes
![][image10]
The news page has simulation data, real time data and 3rd party data. The sockets use zing charts to render beautiful rich graphs, toggling simulation mode (using the simulation button) causes the graphs to update their data every 3 seconds. The Realtime Neo News shows real events triggered by app users. And the tech radar news pulls tech related news from newsapi when the app loads. I tried to find a web based react specific news source with a jsno endpoint. But the tech news section shows how the app can pull data from web endpoints.
![][image12]
Using firebase and websockets to dynamically update the news page anytime certain events are triggered  - such as creating an issue, sprint or comment. Or closing an issue. The news items contain a timestamp, and author and a link to the relevant component
![][image7]
Firebase console view of the news items
![][image8]



## Routing.
+ / - displays home screen Home
+ /home - displays home screen Home
+ /news - display news screen NewList
+ /login - displays the login/register.js screen Login
+ /sprints - displays the list of sprints SprintIndex
+ /sprints/:id - displays a particular sprint Sprint
+ /issues/:id - displays a particular issue Issue

## Extra features

+ Authentication and Registration -> Uses firebase to register.js and authenticate users
+ Dashboard Charts -> Simulates real time data using ZingCharts
+ Dashboard News -> Uses the firebase socket io connection to display events in real time
+ Dashboard TechNews -> Displays tech news from techradars site
+ Validation and Easy Editing -> Uses state to make validation and editing easier
+ APIs -> Uses utility apis and model based apis to make dev more modular

## Independent learning.

Third party libraries like firebase, and zing were used to improve the user experience.
Used clickable glyphs, select lists and minimal bootstrap css. Used promises to 
load data in the correct order, made nesting ajax calls much neater.



[image1]: ./public/images/model.png
[image2]: ./public/images/design.png
[image3]: ./public/images/db_empty.PNG
[image4]: ./public/images/firebase_a.PNG
[image5]: ./public/images/firebase_b.PNG
[image6]: ./public/images/firebase_c.PNG
[image7]: ./public/images/firebase_sockets.PNG
[image8]: ./public/images/firebase_sockets_web.PNG
[image9]: ./public/images/issue_a.PNG
[image10]: ./public/images/issue_b.PNG
[image11]: ./public/images/manage_sprints_a.PNG
[image12]: ./public/images/news.PNG
[image13]: ./public/images/search.PNG
[image14]: ./public/images/sort.PNG
[image15]: ./public/images/sprint_a.PNG
[image16]: ./public/images/sprint_b.PNG
[image17]: ./public/images/sprint_c.PNG
[image18]: ./public/images/sprint_d.PNG
[image19]: ./public/images/sprint_create.PNG
[image20]: ./public/images/validation_a.PNG
[image21]: ./public/images/validation_b.PNG
[image22]: ./public/images/home.PNG


