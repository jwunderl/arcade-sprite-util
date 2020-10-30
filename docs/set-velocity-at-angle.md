# set velocity at angle

Sets the velocity of the given sprite to be at a given speed at the given angle (in radians)

```blocks
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    spriteutils.setVelocityAtAngle(
    myEnemy,
    spriteutils.angleFrom(mySprite, myEnemy),
    spriteutils.distanceBetween(mySprite, myEnemy) * 1.25
    )
})
let myEnemy: Sprite = null
let mySprite: Sprite = null
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . 4 4 . . . . . . . . 
    . . . . 4 4 . . 4 4 . . . . . . 
    . . . 4 . 4 . . . . 4 . . . . . 
    . . 4 . 4 4 . . . . . 4 . . . . 
    . . 4 . 4 . . . . . . 4 . . . . 
    . 4 . . 4 . . . . . . 4 . . . . 
    . 4 . . 4 . . . . . . 4 . . . . 
    . . . . 4 . . . . . 4 . . . . . 
    . . . . . 4 4 . 4 4 4 . . . . . 
    . . . . . . 4 4 4 . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
myEnemy = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . 3 3 . . . . . . . . 
    . . . . 3 3 . . 3 3 . . . . . . 
    . . . 3 . 3 . . . . 3 . . . . . 
    . . 3 . 3 3 . . . . . 3 . . . . 
    . . 3 . 3 . . . . . . 3 . . . . 
    . 3 . . 3 . . . . . . 3 . . . . 
    . 3 . . 3 . . . . . . 3 . . . . 
    . . . . 3 . . . . . 3 . . . . . 
    . . . . . 3 3 . 3 3 3 . . . . . 
    . . . . . . 3 3 3 . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
myEnemy.setPosition(100, 70)
console.log(spriteutils.angleFrom(mySprite, myEnemy))
```

```package
spriteutils=github:jwunderl/arcade-sprite-util
```