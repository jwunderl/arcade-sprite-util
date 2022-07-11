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

myEnemy.say(spriteutils.roundWithPrecision(16 / 3, 5))
controller.moveSprite(myEnemy)

controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
    const myProjectile = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . 3 . . . . . . . . . . . . 3 .
        . . 3 . . . . . . . . . 3 3 . .
        . . . 3 . . . . . . . 3 . . . .
        . . . . 3 3 . . . 3 3 . . . . .
        . . . . . . 3 . 3 . . . . . . .
        . . . . . . . 3 . . . . . . . .
        . . . . . . 3 . 3 . . . . . . .
        . . . . . 3 3 . . 3 . . . . . .
        . . . . . 3 . . . . 3 3 . . . .
        . . . . 3 . . . . . . . 3 3 . .
        . . . 3 3 . . . . . . . . . 3 .
        . . . 3 . . . . . . . . . . 3 .
        . . . . . . . . . . . . . . . 3
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, SpriteKind.Player);
    myProjectile.setFlag(SpriteFlag.AutoDestroy, true);
    spriteutils.placeAngleFrom(myProjectile, 0, 0, mySprite);
    d = spriteutils.distanceBetween(mySprite, myEnemy)
    a = spriteutils.angleFrom(mySprite, myEnemy)
    spriteutils.setVelocityAtAngle(myProjectile, a, d)
})
function testRoundWPrecision(inp: number, roundTo: number, expected: string) {
    // console.log("" +inp + ", " + "")
    const res = spriteutils.roundWithPrecision(inp, roundTo);
    console.log(`rwp(${inp}, ${roundTo}): ${res}`);
    console.log(res == expected ? "worked" : `does not match expected ${expected}`);
}
let consoleVisible = true;
game.consoleOverlay.setVisible(consoleVisible);
testRoundWPrecision(3.14159, 2, "3.14");
testRoundWPrecision(3.14159, 5, "3.14159");
testRoundWPrecision(3.1, 2, "3.10");
testRoundWPrecision(3, 2, "3.00");
testRoundWPrecision(3.1, 15, "3.100000000000000");
controller.B.onEvent(ControllerButtonEvent.Pressed, () => {
    consoleVisible = !consoleVisible;
    game.consoleOverlay.setVisible(consoleVisible)
})