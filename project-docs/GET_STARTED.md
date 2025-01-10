# Simply Books Template

1. [PROJECT REQUIREMENTS](#project-requirements)
1. [PROJECT Resources](#project-resources)
2. [GET STARTED](#get-started)
___

## PROJECT Core REQUIREMENTS
[See the FULL EXPECTED MVP](https://github.com/Repped-School/simply-books-official?tab=readme-ov-file#mvp-guidelines)

These are required functionality your app should have by the end of the week.

_**All Books CRUD and functionality is done for you, so that is not a part of the assessment**_

1. READ Authors - [VIDEO EXAMPLE](https://www.reppedflix.com/shows/intro-to-react?id=0ArXC9tcf44)
1. CREATE Authors - [VIDEO EXAMPLE](https://www.reppedflix.com/shows/intro-to-react?id=REZ-oMxk4Fw)
1. UPDATE Authors - [VIDEO EXAMPLE](https://www.reppedflix.com/shows/intro-to-react?id=uhtRy-YW34w)
1. DELETE Authors - [VIDEO EXAMPLE](https://www.reppedflix.com/shows/intro-to-react?id=pLuJPl0xLok)
1. VIEW Author DETAILS
1. [Deploy on Netlify](#deploying-on-netlify)
1. UPDATE README

## Project Resources
- [ERD LINK](https://dbdiagram.io/d/Almost-Amazon-60315ba6fcdcb6230b20bbaa?utm_source=dbdiagram_embed&utm_medium=bottom_open)

## Get Started
In this project, we want to get acclimated with the project template. Below is a list of the items that you should complete prior to beginning the project:

### 1. Google Authentication with Firebase
- Complete [Starting the Project](#starting-the-project)

### 2. Folder based routes ([Routing Docs](https://nextjs.org/docs/app/building-your-application/routing))

Remember: 
- In the `src/app` directory, create a new folder named the path specified.(e.g. contact)
- In order for that route to not produce a 404, it must have a `page.js` file in it
- You may have nested routes by creating directories/folders

Create the following new folder based routes and add filler code **(IMPORTANT: make sure ALL of the functions names start with a capital letter)**
   - `src/app/authors/page.js`
   - `src/app/profile/page.js`
   - `src/app/author/new/page.js`

### 3. DYNAMIC routes ([Routing Docs](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes))

Remember: 
- DYNAMIC routes are determined by naming a folder with square brackets and then the name of the dynamic key - between: [dynamicKey]’
- The folder name MUST have square brackets if the route is using a dynamic route
- You can only have one dynamic folder per directory level
- You can name the dynamic key ANYTHING. It is a taco.

Create the following new folder based DYNAMIC routes **(IMPORTANT: make sure ALL of the functions names start with a capital letter)**
- `src/app/author/[firebaseKey]/page.js`
- `src/app/author/edit/[firebaseKey]/page.js`

### 4. [Links & Navigation](https://nextjs.org/docs/api-reference/next/link)

- Update the `NavBar.js` component to include the following links. Link the pages to the relevant pages you created in the routing activity
   - Authors
   - Create Author
   - Profile

### 5. [Extracting Dynamic Route Data](https://nextjs.org/docs/routing/dynamic-routes)
- Now that you have some pages/routes set up, let's grab the data from the dynamic routes.
- The actual value for *DYNAMIC_KEY* is whatever you named your file. In this instance it is **firebaseKey**, so make sure to update the code below inside of your component

```js

export default function PageName({ params }) {
    // inside component use
    const { DYNAMIC_KEY } = params;
}

```

### 6. Working with components
- **Create User component:** a component that accepts the user object and uses the image, name, email, and last login
    - For any images be sure to use the `<img/>` tag instead of the `<Image/>` component from Next/Image.
    - An eslint error: **Do not use <img>. Use Image from 'next/image' instead. See [https://nextjs.org/docs/messages/no-img-element.](https://nextjs.org/docs/messages/no-img-element)** Just disable this error for the entire file.
    
    - If you do use Next/Image component you will need to add your image domain in to the `config.next.js` file. 
        - ```images: { domains: ['lh3.googleusercontent.com'], },```
        - Next/Image also requires the `width` & `height` props.
- **Create AuthorCard component:** a component that accepts the author data and displays it.
- Setup PropTypes and use default props to give default values to the component so you can test it

### 7. User specific data

- Relevant files
   - `utils/context/authContext.js`
- useAuth custom hook
   - Use the following code anywhere inside your components to get access to the user details

```js
const { user } = useAuth();
```

- In the `src/app/profile/page.js` file, use the **User component** you created to display the user information.
- Add the Sign Out button below the user component
- Use the code above inside of your component to get access to the useAuth hook **_(Make sure to import the dependency located in `utils/context/authContext.js`)_**

### 8. Bring over the data

Go to your old Almost Amazon project and bring copy/paste the author, books and merged data API calls you created into the relevant files. **DO NOT OVERWRITE ANY FUNCTIONS** that currently are in those files unless yours are different.


## Starting the Project
1. Clone your new repo to your local machine
1. Create a Firebase project and set up authentication. Use [these videos](https://vimeo.com/showcase/codetracker-firebase) as a refresher if needed.
1. Create a `.env` file at the root of the project
1. Copy/Paste the contents of the `.env.sample` file to your newly created `.env` file.
1. Copy over all of your Firebase values into the `.env` file.
1. Open the `package.json` file and change the `name` property to the name of your application, and `author` to  your name.
1. From your command line, be in the root directory and run `npm install` OR `npm i` for short.
1. Next, run `npm run prepare`. This command sets up husky to track eslint errors on commit that will make your deploy fail on Netlify.
1. Run `npx eslint . --ext .js,.jsx`
1. To start your application, run `npm run dev`. THIS IS THE COMMAND YOU WILL USE TO RUN YOUR DEVELOPMENT SERVER FROM NOW ON.
1. Open [http://localhost:3000](http://localhost:3000) with your browser.

### If you see this, you are set to go!
<img width="450" alt="Screen Shot 2022-07-06 at 1 07 27 PM" src="https://github.com/user-attachments/assets/deae25f0-01d5-44b4-be60-7297b0f6f0ef">

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

**NOTES:** 
- If you see the following error, you did not follow all the setup steps correctly and failed to add your Firebase creds. Go back and do that NOW.

<img width="1043" alt="Screen Shot 2022-07-06 at 11 18 45 AM" src="https://user-images.githubusercontent.com/29741570/177612501-c2628f18-4bbd-4de9-aae6-27ffba1172d6.png">

### Deploying on Netlify
Netlify will automatically detect your project and prepopulate the settings, but should something go wrong and it does not, here are the commands:

- Build Command: `npm run build`
- Publish directory: `.next`

#### Additional Steps to Take on Netlify
- Add Environmental Variables
    - Any Enviromental variables you are using in your `.env` file should be added to Netlify. 
        - Go to Site settings > Build & deploy > Environment > Environment variables and the keys and values there if you did not add them when you were deploying your site

- Update Firebase URL Settings
    - In Firebase under Authentication select sign in methods, scroll to Authorized domains. Add your Netlify URL.
        
## Learn More about Next.js
To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
