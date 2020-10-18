/**
 * Utility blocks for sprites
 */
//% weight=99 color="#4B7BEC" icon="\uf2bd"
//% block="Sprite Utils"
namespace spriteutils {

    /**
     * Returns true of the given sprite does not exist,
     * or is destroyed, and false otherwise.
     */
    //% block="$sprite is destroyed"
    //% blockId=spriteutilextisdestroyed
    //% sprite.shadow=variables_get
    //% sprite.defl=mySprite
    export function isDestroyed(sprite: Sprite): boolean {
        return !sprite || !!(sprite.flags & sprites.Flag.Destroyed);
    }

    /**
     * Returns the distance between the center of two sprites in pixels.
     * If either sprite is undefined returns 0.
     */
    //% block="distance between $a and $b"
    //% blockId=spriteutilextdistbw
    //% a.shadow=variables_get
    //% a.defl=mySprite
    //% b.shadow=variables_get
    //% b.defl=myEnemy
    export function distanceBetween(a: Sprite, b: Sprite): number {
        if (!a || !b) return 0;
        return Math.sqrt(((a.x - b.x) ** 2) + ((a.y - b.y) ** 2));
    }
}