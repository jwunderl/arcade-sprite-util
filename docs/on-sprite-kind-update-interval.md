# on Sprite Kind Update Interval

Runs code for all sprites of a specific kind on a regular interval. The code runs every specified number of milliseconds for each sprite of the given kind.

## Parameters

* **kind**: the sprite kind to run the code for
* **interval**: the time interval in milliseconds between executions
* **sprite**: the sprite parameter passed to the handler code

## Example

This example makes all enemy sprites change direction every 1000 milliseconds:

```blocks
for (let i = 0; i < 5; i++) {
    let enemy = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 2 2 . . . . . . . . 
        . . . . 2 2 . . 2 2 . . . . . . 
        . . . 2 . 2 . . . . 2 . . . . . 
        . . 2 . 2 2 . . . . . 2 . . . . 
        . . 2 . 2 . . . . . . 2 . . . . 
        . 2 . . 2 . . . . . . 2 . . . . 
        . 2 . . 2 . . . . . . 2 . . . . 
        . . . . 2 . . . . . 2 . . . . . 
        . . . . . 2 2 . 2 2 2 . . . . . 
        . . . . . . 2 2 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    enemy.setPosition(randint(10, 150), randint(10, 110))
    enemy.vx = 30
}
spriteutils.onSpriteKindUpdateInterval(SpriteKind.Enemy, 1000, function (sprite) {
    sprite.vx = sprite.vx * -1
})
```

```package
spriteutils=github:jwunderl/arcade-sprite-util
```
