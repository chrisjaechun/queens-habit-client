# Queens Habit

Queens Habit is my love letter (love app? - no, wait) to the most beautifully diverse place in the world (at least, the States)! This is an app that lets you share your favorite memories and tips for Queens! By signing-up/signing-in, feel free to stop by to share any memorable experiences or to check out what to do next.

## Important Links

- [API Repo](https://github.com/chrisjaechun/queens-habit-api)
- [Deployed API](https://queens-habit.herokuapp.com/)
- [Deployed Client](https://chrisjaechun.github.io/queens-habit-client/#/)


## Installation

1. Fork and clone this repository.
2. Change into the new directory.
3. Create and checkout to a new branch.
4. Run `npm install` to install dependencies.
5. Run the development server with `npm start`.


## Technologies Used

- React
- HTML/CSS
- JavaScript
- React-Bootstrap
- AXIOS
- Sass

## User Stories

- As a user, I'd like to sign-up
- As a user, I'd like to sign-in
- As a user, I'd like to change my password
- As a user, I'd like to sign out
- As a user, I'd like to submit a new experience
- As a user, I'd like to update any of my submitted experiences
- As a user, I'd like to view a single experience
- As a user, I'd like to see all experiences (regardless of owner)
- As a user, I'd like to see all my experiences
- As a user, I'd like to be able to delete a submitted experience

## Planning

After building out the API, I built out my routes for the CRUD actions. Everything went as smoothly as expected, but I did run into a blocker for my Index All route - it was indirectly triggering my Show route so I changed the URL in the API and reflected the changes in the client.

I went back and forth regarding the overall styling. I, at first, thought it would be neat to have a carousel as an unauthenticated landing page but favored a background image instead and figured photos on a background photo would not be ideal UI.

I set the "Home" Nav.Link as my authenticated route for IndexAll - this "Home" link is not accessbile without a token so it's only visible to authenticated users.

## Wireframes

![Wireframe](https://i.imgur.com/fjBUPfR.png)

## Future of Queens Habit

I'd love to move forward with a like button feature and eventually move along towards refactoring my code to implement hooks.

## Screenshots

![Landing Page](https://i.imgur.com/yZxuY69.png)
![Home Page](https://i.imgur.com/d2mG5vg.png)
