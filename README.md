# Forum
Thank you for viewing my project! In this ReadMe you will find an overview of what I built and how you can run it via Docker.

![Image of the Forum login screen](https://drive.google.com/uc?export=view&id=1X2u3D9Ky0T3MHLoz-OJ3EBZY2H4kj-96)

![Image of the Forum home screen](https://drive.google.com/uc?export=view&id=1Qhsec6J6XyaknI7j867U61axe2CaXbFq)

## About the App
The app I made is called Forum. It's a fullstack app made with React.js for the frontend, Node.js for the backend API, and MySQL for the database. This app is inspired by Reddit and is intended to be a place for people to discuss interesting topics. Once you create an account, you will be taken to the main screen which I call the homescreen. There, you can perform CRUD operations on two related resources: posts and comments. All users can create and view posts and comments, but only the user who is an author of a post or comment can edit or delete it. You can view a walkthrough recording here if you'd like to see it in action:

https://www.awesomescreenshot.com/video/30082827?key=e24ec81e8d85a560bd7b05ea959a599e

## How to Run the App
I have set up Docker files and tested it can be run from Docker on my computer. I had an issue running it from Docker on a different computer, but these steps may work for you:
1. Install Docker Desktop (if not already installed) and run it
2. Clone the repo from Github to your local computer
3. Open the repo in VS Code, go to the /api subfolder, add a .env file there. Paste the info I shared with you in the .env file and save it.
4. In a terminal, go to the root level of the repo and run the command `docker-compose up --build`
5. You should then see logs verifying the application is running locally via Docker, including 'Server is running at port:3001'
6. You can now open a browser to localhost (or click the link for the client mapped port 80:80 in Docker Desktop) and you should see the React frontend and be able to use the app.

If you have any trouble using the app, please reach out. I am also happy to show it from my computer.

Thank you for viewing this app, I hope you like it!
