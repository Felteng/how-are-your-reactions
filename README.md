# How Are Your Reactions
### Welcome to How Are Your Reactions. 
- Test your reaction time with our **Reaction Game**.  
    - Simply wait and react as the big window turns green. And see how you did.
- Additionally you can test and hone your skills when it comes to continous reactions with our **Grid Game**.
    - Features the same start procedure as the Reaction Game but here you will click multiple small green tiles as they appear.
    - Keep track of your score and your highscore.
    - Modify the difficulty yourself to increase the score you gain. But also increase your losses when you fail to click in time!
## Wireframes and initial js function planning

- Wireframes \
![image](readme-assets/images/reaction-wireframe.png) \
![image](readme-assets/images/precision-wireframe.png)

- Base functions
    - gameStartTimer()

    - startGame()

    - reactionGame()

    - speedTimer()

    - precisionGame()

    - accuracyTracker()

## Testing

### Bugs
| Bug    | Status      | Description | Solution |
| --- | ------ | ----------- | -------- |
| Multiple games being ran at once | Resolved | If the user clicks the start box multiple times the start timer will trigger each time and end up with a lot of games being ran simultaneously | Add a boolean that prevents the start timer being called if true |
| Game timer inaccurate | Resolved | When running the game the timer is going a lot slower than the setInterval. There's a built in delay of 4ms in modern browsers. | Multiply the time by 4 for better result
| Game timer can only count every 4ms | ACTIVE | The game will only display the users times in results divisible by 4 as product of the bug fix above | Rewrite the function to not only rely on setInterval. Possibly a for loop inside the interval? |
|        |              |                        |                  |
|        |              |                        |                  |
|        |              |                        |                  |
