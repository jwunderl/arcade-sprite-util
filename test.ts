spriteutils.createRenderable(20, function (target) {
    d = spriteutils.distanceBetween(mySprite, myEnemy)
    a = spriteutils.angleFrom(mySprite, myEnemy)
    target.drawLine(mySprite.x, mySprite.y, mySprite.x + Math.cos(a) * d, mySprite.y + Math.sin(a) * d, 5)
})
let a = 0
let d = 0
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
myEnemy.setPosition(156, 112)
controller.moveSprite(myEnemy)
