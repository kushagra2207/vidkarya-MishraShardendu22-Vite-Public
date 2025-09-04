# Welcome to the contributing guide

The vidkarya project has two separate repos for its Website:

1. [Frontend](https://github.com/Vidkarya-Team/Vidkarya-client)
2. [Backend](https://github.com/Vidkarya-Team/Vidkarya-backend)

### Project Setup

1. <b> Fork the repo </b> you want to contribute to.
2. Run the following commands:

```
$ git clone https://github.com/<your-username>/<forked-repo-name>
$ cd <forked-repo-name>
$ npm install
```

3. Start the server.

```
Frontend:
$ npm start

Backend:
$ nodemon server.js
```

### Guidelines 📜

1. Before working on any <b> new fix/feature/update</b>, make sure you create an issue with appropriate title and description. Then get yourself assigned to start contributing.

2. Always create your <b> separate branch </b> for contribution. Branch name must be in the format: "YourName/featureName"

> for eg. if your name is John & you're working on profile page, branch name should be "john/profilePage"

3. Write clean and readable code, add comments, linespaces wherever required.

4. Avoid making unnecessary changes (e.g., extra whitespace or formatting) unrelated to your current feature/fix/update.

5. Use a consistent commit message format:

> Examples:
>
> - fix: Navbar alignment
> - add: Blog Page
> - update: Navbar

6. When you raise a PR, please make sure that you mention <b> #issue (issue number) </b> in PR description.

7. Ensure that at least one maintainer reviews the PR. They will merge it once it meets all requirements.

 </br>
 
 #### Note: Please maintain professionalism in all communications, including comments and PR discussions. Avoid vulgarity, and ensure respectful interactions.
