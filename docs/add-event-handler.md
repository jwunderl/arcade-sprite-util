# add event handler

Runs some code before or after a specific step in the game engine's update logic.

```blocks
spriteutils.addEventHandler(spriteutils.UpdatePriorityModifier.After, spriteutils.UpdatePriority.Update, function () {
    console.log("after update for step " + index)
    index += 1
})
spriteutils.addEventHandler(spriteutils.UpdatePriorityModifier.Before, spriteutils.UpdatePriority.Update, function () {
    console.log("before update for step " + index)
})
let index = 0
game.onUpdate(function () {
    console.log("on update for step " + index)
})
```