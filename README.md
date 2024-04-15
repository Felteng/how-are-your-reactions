# How Are Your Reactions
The purpose of How Are Your Reactions is to provide some tools for anyone interested in testing and or enhancing their reaction times. It can also serve as a minigame competition for a user and their friends to see who can score the best score, or even beat the highscore in our grid clicking game. 

Upon opening the site the user will be met with a fairly minimalistic design to allow the user to more easily gauge what functions the page has to offer.

Website live link: [How are your reactions](https://felteng.github.io/how-are-your-reactions/)

![image](readme-assets/images/am-i-responsive.png)


## User stories


## Features

### Welcome to How Are Your Reactions. 
- Test your reaction time with our **Reaction Game**.  

    - Simply wait and react as the big window turns green. And see how you did.
    
- Additionally you can test and hone your skills when it comes to continous reactions with our **Grid Game**.
    - Features the same start procedure as the Reaction Game but here you will click multiple small green tiles as they appear.

    - Keep track of your score and your highscore.

    - Modify the difficulty yourself to increase the score you gain. But also decrease your window of reaction where you lost points if you fail to click in time!


### Wireframes and initial js function planning

- Wireframes \
![image](readme-assets/images/reaction-wireframe.png) \
![image](readme-assets/images/precision-wireframe.png)

- Base functions
    - gameStartTimer()

    - startGame()

    - reactionGame()

    - speedTimer()

    - gridGame()

    - accuracyTracker()

### Features and look after development
- **Color, contrast, and background**
    - The site features a fairly minimalistic combination of light grey, white, and black text to make it easy on the eyes for the user.

    - It also allows for the green and the red colors within the games to provide a higher grade of clarity as to what is happening.

- **Navigation bar**
    - The navigation bar is featured at the top of the page as any visiting user would expect. \
    ![image](readme-assets/images/site-navbar.png)
    - It allows for quick navigation between the 2 game pages, and any potential future pages.

    - If a user is visitng the site from a smaller device the navigation bar is togglable through a conventional "burger menu" icon. \
    ![image](readme-assets/images/site-navbar-toggled.png)

- **Landing page and Grid Game**
    - The homepage of the site features the first of the 2 currently available games, the *Grid Game*.

    - The user should quickly be able to spot the difficulty selection menu, as well as the current highscore held for the Grid Game.

    - This should lead to encouragement for the user to give the game a try and see how they can compare. \
    ![image](readme-assets/images/index-page.png)

    - When the Grid Game is started there will be a tile in the window highlighted in green to let the user know it should be clicked. \
    ![image](readme-assets/images/grid-game-tile.png)

    - When the game ends the whole window will turn green and after 2 seconds the user may restart the game if they wish. \
    ![image](readme-assets/images/grid-game-done.png)

- **Reaction Game** 
    - As the user lands on the reaction game page it should feel even more straightforward than the first page.

    - The user will be met with a similar looking window to press, with the neccessary information above. \
    ![image](readme-assets/images/reaction-page.png)

    - When the user completes the reaction game there will be prompt in the middle of the game area informing the user how they reacted. \
    ![image](readme-assets/images/reaction-page-done.png)

- **The Footer**
    - The footer hold no specific information other than a watermark and the year the page was created.




## Testing

### Bugs
| Bug    | Status      | Description | Solution |
| --- | ------ | ----------- | -------- |
| Multiple games being ran at once | Resolved | If the user clicks the start box multiple times the start timer will trigger each time and end up with a lot of games being ran simultaneously | Add a boolean that prevents the start timer being called if true |
| Game timer inaccurate | Resolved | When running the game the timer is going a lot slower than the setInterval. There's a built in delay of 4ms in modern browsers | Multiply the time by 4 for better result
| Game timer can only count every 4ms | Expired | The game will only display the users times in results divisible by 4 as product of the bug fix above | *PROPOSAL*: Rewrite the function to not only rely on setInterval. Possibly a for loop inside the interval? | 
| Game timer result always divisble by 9 | ACTIVE | The result of the timer for the reaction game is always divisble by 9 thanks to the new interval of 11s with a for loop nested inside for *9* iterations. This provdided a bit better accuracy but the timer is still not 1ms precise | *PROPASAL*: Revisit the problem at a later stage and prioritize other elements of the site first |
|        |              |                        |                  |
|        |              |                        |                  |

## Deployment

### Web
- The web deployment was made using GitHub Pages.

    - To deploy the project using GitHub; head to the project repository and go to settings.

    - Under Code and automation you'll want to head to "pages".

    - Once on pages you'll need to set the source to *Deploy from a branch*.

    - Under branch you'll want to set the branch to *main* and set the folder to *root*.

    - Once all of that is done give GitHub a few minutes and refresh the page. The link to the website should now be visible at the top of GitHub Pages.

### Local
- The project was deoployed locally multiple times for the purpose of live testing code.

    - To deploy locally, open a terminal in your development environment.

    - In the terminal you want to type: "python3 -m http.server" and press enter.

    - On the pop up window that appears you'll want to click Open Browser to open a new window of your project.
        - There is also the option to click Open Preview if you'd like to have the deployed project displayed within your IDE.