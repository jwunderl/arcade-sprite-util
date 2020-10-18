# distance between

Returns the distance between the center of two sprites in pixels

```blocks
let mySprite = sprites.create(img`
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
let myEnemy = sprites.create(img`
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
myEnemy.setPosition(156, 112)
console.log(spriteutils.distanceBetween(mySprite, myEnemy))
```

```package
spriteutils=github:jwunderl/arcade-sprite-util
```