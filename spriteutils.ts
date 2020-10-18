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
    export function isDestroyed(sprite: Sprite) {
        return !sprite || (sprite.flags & sprites.Flag.Destroyed);
    }
}