This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## About the Project

I remember first hearing about John Conway's Game of Life through one of my favorite [YouTube channels](https://www.youtube.com/watch?v=R9Plq-D1gEk) when I was about 15. Ever since then I have enjoyed the simulation because it is incredibly brilliant and incredibly simple.

That is why I decided to use it as the subject of this undertaking. This project is not meant to offer great insight into the Game of Life, or to show off any interesting grids; there are plenty of other [demos out there that already do that](https://bitstorm.org/gameoflife/).

I made this version of the Game of Life because I wanted to see if I could build it using React! I initially wanted to use React and D3, but as I was building it I realized there really wasn't a need to bring D3 into the game. React alongside Redux would work fine.

I used a method from [Swizec Teller](https://swizec.com/) that he introduced in his book [React+D3v4](https://swizec.com/reactd3js/) to create a game loop by calling `window.requestAnimationFrame(ticker)`. When the ticker starts running, I then update the cells by using a few simple functions. I'm attempting to follow a more [functional approach of writing JS](https://medium.com/javascript-scene/why-learn-functional-programming-in-javascript-composing-software-ea13afc7a257), although there is plenty of room for improvement and several times where I mutate an object, rather than creating a new one.

I also used [Material-UI React Components](https://material-ui-1dab0.firebaseapp.com/), mostly because I wanted to get some practice using these tools. I'm absolutely sure I did not implement them nearly as well as I should have, but I'll chalk that up mostly to that not being the purpose of this project.

Reach out to me if you have any questions about the project or the code and I'll be happy to try to provide you the answers. Also, I am not going to pretend that this implementation is the fastest or best version I could have created of the Game of Life using React and Redux, so feel free to send any suggestions you have.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.