An application coded in Angular 6 that generates random jokes of Chuck Norris.
The application is obtained merging two different exercises: 
 - A login interface with several custom validation rules
 - The main application used to fetch, collect and organize jokes about Chuck Norris.

## Local setup

- Install the dependencies with `npm install`
- Start in local with `npm start`
- Build with `npm run build`
- Build in prod with `npm run build-prod`

## Design choices 
I've used Angular Material in order to standardize the user interface, and the app is structured considering the minimum requirements of responsiveness. 
   
## Login
The login component is made using a modal of angular material, and the password validation depends on the triggering of several custom validators, implemented using some regex and custom logic. The /login route is the default if the user session is invalid (on init or logout). 

## Joke list application
The main application is made of several components and services. 
In the routing the authenticated routes are logically separated from the others, they have dedicated outlets and they are guarded by some Auth Guard services which check the session in order to decide if the user is authorized to follow a specific route.
The page components JokeList and Favorites list display the different lists of jokes, while the Joke Service contains the logic that manages every action (adds to favorites, deletes, manages the auto-fill timer, etc).
Two additional services are Authentication (manages login and logout) and Session (reads and writes in the app session): for implementation choice, the favorites list in the session is not deleted if the user log outs.
The other components represent smaller parts of the template. In general, the communication between components and services is made using observables and BehaviorSubjects, which create communication streams re-usable several times.

