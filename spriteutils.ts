/**
 * Utility blocks for sprites
 */
//% weight=99 color="#4B7BEC" icon="\uf2bd"
//% block="Sprite Utils"
//% groups='["Sprite", "General"]'
namespace spriteutils {

    /**
     * Returns true if the given sprite does not exist,
     * or is destroyed, and false otherwise.
     */
    //% block="$sprite is destroyed"
    //% blockId=spriteutilextisdestroyed
    //% help=github:arcade-sprite-util/docs/is-destroyed
    //% sprite.shadow=variables_get
    //% sprite.defl=mySprite
    //% weight=100
    //% group=Sprite
    export function isDestroyed(sprite: Sprite): boolean {
        return !sprite || !!(sprite.flags & sprites.Flag.Destroyed);
    }

    /**
     * Returns the distance between the center of two sprites in pixels.
     * If either sprite is undefined returns 0.
     */
    //% block="distance between $a and $b"
    //% blockId=spriteutilextdistbw
    //% help=github:arcade-sprite-util/docs/distance-between
    //% a.shadow=variables_get
    //% a.defl=mySprite
    //% b.shadow=variables_get
    //% b.defl=myEnemy
    //% weight=90
    //% group=Sprite
    export function distanceBetween(a: Sprite, b: Sprite): number {
        if (!a || !b) return 0;
        return Math.sqrt(((a.x - b.x) ** 2) + ((a.y - b.y) ** 2));
    }

    /**
     * Returns array of sprites of kind that are within a specified distance.
     */
    //% block="get all sprites of kind $kind within $distance pixels from $sprite"
    //% kind.shadow=spritekind
    //% distance.defl=50
    //% sprite.shadow=variables_get
    //% sprite.defl=mySprite
    //% weight=85
    //% group=Sprite
    export function getSpritesWithin(kind: number, distance: number, sprite: Sprite): Sprite[] {
        let allSprites = sprites.allOfKind(kind);
        let numItems = 0;
        let sortArray = allSprites.filter(function(value: Sprite, index: number) {
            return distanceBetween(value, sprite) <= distance;
        })

        sortArray = sortArray.sort((a, b)=>{
            return (distanceBetween(a, sprite) - distanceBetween(b, sprite));
        })

        return sortArray;
    }

    /**
     * Returns the angle between the center of two sprites in radians.
     * If either sprite is undefined returns 0.
     */
    //% block="angle from $a to $b"
    //% blockId=spriteutilextanglebw
    //% help=github:arcade-sprite-util/docs/angle-from
    //% a.shadow=variables_get
    //% a.defl=mySprite
    //% b.shadow=variables_get
    //% b.defl=myEnemy
    //% weight=80
    //% group=Sprite
    export function angleFrom(a: Sprite, b: Sprite): number {
        if (!a || !b) return 0;
        return Math.atan2(
            b.y - a.y,
            b.x - a.x
        );
    }

    /**
     * Places a sprite (spriteToMove) a given distance away from the other sprite (fromSprite),
     * at the provided angle
     */
    //% block="place $spriteToMove angle $angleInRadians distance $distance from $fromSprite"
    //% blockId=spriteutilextplaceanglefrom
    //% help=github:arcade-sprite-util/docs/place-angle-from
    //% fromSprite.shadow=variables_get
    //% fromSprite.defl=mySprite
    //% spriteToMove.shadow=variables_get
    //% spriteToMove.defl=myEnemy
    //% weight=70
    //% group=Sprite
    export function placeAngleFrom(spriteToMove: Sprite, angleInRadians: number, distance: number, fromSprite: Sprite) {
        if (!fromSprite || !spriteToMove)
            return;

        spriteToMove.setPosition(
            fromSprite.x + Math.cos(angleInRadians) * distance,
            fromSprite.y + Math.sin(angleInRadians) * distance 
        );
    }

    /**
     * Sets the velocity of the given sprite to be at a given speed in the given direction
     */
    //% block="set $target velocity at angle $angleInRadians speed $speed"
    //% blockId=spriteutilextsetspeedanglefrom
    //% help=github:arcade-sprite-util/docs/set-velocity-at-angle
    //% target.shadow=variables_get
    //% target.defl=mySprite
    //% weight=60
    //% group=Sprite
    export function setVelocityAtAngle(target: Sprite, angleInRadians: number, speed: number) {
        if (!target)
            return;

        target.setVelocity(
            Math.cos(angleInRadians) * speed,
            Math.sin(angleInRadians) * speed 
        );
    }

    /**
     * Converts a number from radians to degrees
     */
    //% block="convert $asRadians radians to degrees"
    //% blockId=spriteutilextradtodeg
    //% help=github:arcade-sprite-util/docs/radians-to-degrees
    //% weight=80
    //% group=General
    export function radiansToDegrees(asRadians: number): number {
        return asRadians * 180 / Math.PI;
    }

    /**
     * Converts a number from degrees to radians
     */
    //% block="convert $asDegrees degrees to radians"
    //% blockId=spriteutilextdegtorad
    //% help=github:arcade-sprite-util/docs/degrees-to-radians
    //% weight=80
    //% group=General
    export function degreesToRadians(asDegrees: number): number {
        return asDegrees * Math.PI / 180;
    }

    /**
     * Create a renderable that draws on the screen every frame
     */
    //% block="render on z-index $index to $screen"
    //% blockId=spriteutilextcreaterenderable
    //% help=github:arcade-sprite-util/docs/create-renderable
    //% draggableParameters="reporter"
    //% blockAllowMultiple=1
    //% weight=70
    //% group=General
    export function createRenderable(index: number, handler: (screen: Image) => void) {
        scene.createRenderable(index, handler);
    }

    /**
     * Draw an image (src) onto the target (to), with the top left at (x, y)
     */
    //% block="draw $src to $to at x $x y $y"
    //% blockId=spriteutilextdrawtransparentimg
    //% src.shadow=screen_image_picker
    //% to.shadow=variables_get
    //% to.defl=myImage
    //% x.shadow="positionPicker"
    //% y.shadow="positionPicker"
    //% help=github:arcade-sprite-util/docs/draw-transparent-image
    //% weight=65
    //% group=General
    //% inlineInputMode=inline
    export function drawTransparentImage(src: Image, to: Image, x: number, y: number) {
        if (!src || !to) {
            return;
        }
        to.drawTransparentImage(src, x, y);
    }

    /**
     * Draw a circle centered at (cx, cy) with radius r of the given color
     */
    //% block="draw circle in $to at cx $cx cy $cy radius $r color $col"
    //% blockId=spriteutilextdrawcircle
    //% to.shadow=variables_get
    //% to.defl=myImage
    //% col.shadow=colorindexpicker
    //% col.defl=3
    //% cx.min=0 cx.max=160 cx.defl=80
    //% cy.min=0 cy.max=120 cy.defl=60
    //% r.min=0 r.max=40 r.defl=5
    //% help=github:arcade-sprite-util/docs/draw-circle
    //% weight=64
    //% group=General
    export function drawCircle(to: Image, cx: number, cy: number, r: number, col: number) {
        if (!to) {
            return;
        }
        to.drawCircle(cx, cy, r, col);
    }

    /**
     * Draw a filled circle centered at (cx, cy) with radius r of the given color
     */
    //% block="fill circle in $to at cx $cx cy $cy radius $r color $col"
    //% blockId=spriteutilextdrawfilledcircle
    //% to.shadow=variables_get
    //% to.defl=myImage
    //% col.shadow=colorindexpicker
    //% col.defl=3
    //% cx.min=0 cx.max=160 cx.defl=80
    //% cy.min=0 cy.max=120 cy.defl=60
    //% r.min=0 r.max=40 r.defl=5
    //% help=github:arcade-sprite-util/docs/fill-circle
    //% weight=63
    //% group=General
    export function fillCircle(to: Image, cx: number, cy: number, r: number, col: number) {
        if (!to) {
            return;
        }
        to.fillCircle(cx, cy, r, col);
    }


    /**
     * Set whether the console will be displayed on the screen (on) or not (off) 
     */
    //% block="console overlay $on"
    //% on.shadow=toggleOnOff
    //% blockId=spriteutilextsetconsolevisible
    //% help=github:arcade-sprite-util/docs/set-console-overlay
    //% weight=60
    //% group=General
    export function setConsoleOverlay(on: boolean) {
        game.consoleOverlay.setVisible(on);
    }

    /**
     * Set the icon used to display life
     */
    //% block="set life image $im"
    //% blockId=spriteutilextsetlifeimage
    //% im.shadow=life_image_picker
    //% help=github:arcade-sprite-util/docs/set-life-image
    //% weight=55
    //% group=General
    export function setLifeImage(im: Image) {
        info.setLifeImage(im);
    }

    //% blockId=life_image_picker block="%img"
    //% shim=TD_ID
    //% img.fieldEditor="sprite"
    //% img.fieldOptions.taggedTemplate="img"
    //% img.fieldOptions.decompileIndirectFixedInstances="true"
    //% img.fieldOptions.sizes="7,8"
    //% img.fieldOptions.filter="!dialog !background"
    //% weight=100 group="Create"
    //% blockHidden=1 duplicateShadowOnDrag
    export function _lifeImage(img: Image) {
        return img;
    }

    //% blockId=spriteutilextroundwithprecision
    //% block="round $x to $digitsAfterDecimal decimal places"
    //% x.defl=3.14159
    //% digitsAfterDecimal.defl=2
    //% weight=50
    //% group=General
    //% help=github:arcade-sprite-util/docs/round-with-precision
    export function roundWithPrecision(x: number, digitsAfterDecimal: number) {
        return Math.roundWithPrecision(x, digitsAfterDecimal);
    }
}
