# set life image

Set the icon for displaying remaining lives

```blocks
spriteutils.setLifeImage(img`
    . . . . . . . 
    5 5 5 . 5 5 5 
    5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 
    5 5 5 5 5 5 5 
    . 5 5 5 5 5 . 
    . . 5 5 5 5 . 
`)
game.onUpdateInterval(1000, () => {
    info.setLife(randint(0, 500))
})
```

```package
spriteutils=github:jwunderl/arcade-sprite-util
```