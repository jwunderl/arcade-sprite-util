/**
 * Utility blocks for sprites
 */
//% weight=99 color="#4B7BEC" icon="\uf2bd"
//% block="Sprite Utils"
//% groups='["Sprite", "General"]'
namespace spriteutils {
    export enum NullConsts {
        //% block="undefined"
        Undefined,
        //% block="null"
        Null,
    }

    export enum Consts {
        //% block="undefined" blockHidden=1
        Undefined,
        //% block="null" blockHidden=1
        Null,
        //% block="NaN"
        NaN,
        //% block="π"
        Pi,
        //% block="e"
        E,
        //% block="LN2"
        LN2,
        //% block="LN10"
        LN10,
        //% block="√1/2"
        SQRT1_2,
        //% block="√2"
        SQRT2
    }
    export enum UpdatePriority {
        //% block="updates the controller"
        Controller = scene.CONTROLLER_PRIORITY,
        //% block="updates the controller extension"
        UpdateController = scene.UPDATE_CONTROLLER_PRIORITY,
        //% block="updates following sprites"
        FollowSprite = scene.FOLLOW_SPRITE_PRIORITY,
        //% block="updates controller sprites"
        ControllerSprites = scene.CONTROLLER_SPRITES_PRIORITY,
        //% block="runs physics"
        Physics = scene.PHYSICS_PRIORITY,
        //% block="updates animations"
        Animation = scene.ANIMATION_UPDATE_PRIORITY,
        //% block="runs on game update interval"
        UpdateInterval = scene.UPDATE_INTERVAL_PRIORITY,
        //% block="runs on game update"
        Update = scene.UPDATE_PRIORITY,
        //% block="updates the camera"
        Camera = scene.PRE_RENDER_UPDATE_PRIORITY,
        //% block="renders background image"
        RenderBackground = scene.RENDER_BACKGROUND_PRIORITY,
        //% block="renders all sprites"
        RenderSprites = scene.RENDER_SPRITES_PRIORITY,
        //% block="renders diagnostics"
        RenderDiagnostics = scene.RENDER_DIAGNOSTICS_PRIORITY,
        //% block="updates the screen"
        UpdateScreen = scene.UPDATE_SCREEN_PRIORITY
    }

    export enum UpdatePriorityModifier {
        //% block="before"
        Before,
        //% block="after"
        After
    }

    let stateStack: SpriteUtilState[];

    class SpriteUpdateHandler {
        timer: number;
        constructor(
            public sprite: Sprite,
            public update: (sprite: Sprite) => void,
            public interval: number
        ) {
            this.timer = 0;
        }
    }

    class SpriteKindUpdateHandler {
        timer: number
        constructor(
            public kind: number,
            public update: (sprite: Sprite) => void,
            public interval: number
        ) {
            this.timer = 0;
        }
    }

    class SpriteUtilState {
        updatingKinds: SpriteKindUpdateHandler[];
        updatingSprites: SpriteUpdateHandler[];

        constructor() {
            this.updatingSprites = [];
            this.updatingKinds = [];

            game.currentScene().eventContext.registerFrameHandler(scene.UPDATE_PRIORITY + 1, () => {
                this.updateSprites(game.currentScene().eventContext.deltaTimeMillis);
                this.updateSpriteKinds(game.currentScene().eventContext.deltaTimeMillis);
            });
        }

        protected updateSprites(dtMillis: number) {
            let cleanupDestroyed = false;
            for (const handler of this.updatingSprites) {
                if (handler.sprite.flags & sprites.Flag.Destroyed) {
                    cleanupDestroyed = true;
                    continue;
                }

                if (handler.interval) {
                    handler.timer -= dtMillis;
                    while (handler.timer <= 0) {
                        handler.timer += handler.interval;
                        handler.update(handler.sprite);
                    }
                }
                else {
                    handler.update(handler.sprite);
                }
            }

            if (cleanupDestroyed) {
                this.updatingSprites = this.updatingSprites.filter(handler => !(handler.sprite.flags & sprites.Flag.Destroyed))
            }
        }

        protected updateSpriteKinds(dtMillis: number) {
            for (const handler of this.updatingKinds) {
                if (handler.interval) {
                    handler.timer -= dtMillis;
                    while (handler.timer <= 0) {
                        handler.timer += handler.interval;
                        for (const sprite of sprites.allOfKind(handler.kind)) {
                            handler.update(sprite);
                        }
                    }
                }
                else {
                    for (const sprite of sprites.allOfKind(handler.kind)) {
                        handler.update(sprite);
                    }
                }

            }
        }
    }

    function init() {
        if (stateStack) return;

        stateStack = [new SpriteUtilState()];

        game.addScenePushHandler(() => {
            stateStack.push(new SpriteUtilState());
        });

        game.addScenePopHandler(() => {
            stateStack.pop();
            if (stateStack.length === 0) stateStack.push(new SpriteUtilState());
        });
    }

    function state() {
        init();
        return stateStack[stateStack.length - 1];
    }

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
    export function distanceBetween(a: Sprite | tiles.Location | Position, b: Sprite | tiles.Location | Position): number {
        if (!a || !b) return 0;
        return Math.sqrt(((a.x - b.x) ** 2) + ((a.y - b.y) ** 2));
    }

    /**
     * Returns the angle of movement of a sprite in radians.
     */
    //% blockId=spriteutilheading
    //% block="$sprite velocity angle"
    //% help=github:arcade-sprite-util/docs/heading
    //% sprite.shadow=variables_get
    //% sprite.defl=mySprite
    //% weight=75
    //% group=Sprite
    export function heading(sprite: Sprite): number {
        return Math.atan2(sprite.vy, sprite.vx);
    }

    /**
     * Returns the scalar speed of the sprite in pixels per second.
     */
    //% blockId=spriteutilspeed
    //% block="$sprite speed"
    //% help=github:arcade-sprite-util/docs/speed
    //% sprite.shadow=variables_get
    //% sprite.defl=mySprite
    //% weight=73
    //% group=Sprite
    export function speed(sprite: Sprite): number {
        return Math.sqrt(sprite.vx * sprite.vx + sprite.vy * sprite.vy);
    }

    /**
     * Moves a sprite to the given location over a given amount of time.
     * The location can be either a sprite, position, or tile location.
     * If the target location is a moving sprite, the sprite will move
     * to its location at the time this function is called
     */
    //% blockId=spriteutilmoveto
    //% block="$sprite move to $location over $time ms||and pause $doPause"
    //% help=github:arcade-sprite-util/docs/move-to
    //% sprite.shadow=variables_get
    //% sprite.defl=mySprite
    //% location.shadow=spriteutilpos
    //% time.shadow=timePicker
    //% time.defl=100
    //% inlineInputMode=inline
    //% weight=55
    //% group=Sprite
    export function moveTo(sprite: Sprite, location: Sprite | tiles.Location | Position, time: number, doPause = false) {
        moveToAtSpeed(sprite, location, distanceBetween(sprite, location) / (time / 1000), doPause);
    }

    /**
     * Moves a sprite to the given location at a given speed.
     * The location can be either a sprite, position, or tile location.
     * If the target location is a moving sprite, the sprite will move
     * to its location at the time this function is called
     */
    //% blockId=spriteutilmovetoatspeed
    //% block="$sprite move to $location at speed $speed||and pause $doPause"
    //% help=github:arcade-sprite-util/docs/move-to-at-speed
    //% sprite.shadow=variables_get
    //% sprite.defl=mySprite
    //% speed.defl=100
    //% location.shadow=spriteutilpos
    //% inlineInputMode=inline
    //% weight=53
    //% group=Sprite
    export function moveToAtSpeed(sprite: Sprite, location: Sprite | tiles.Location | Position, speed: number, doPause = false) {
        setVelocityAtAngle(sprite, angleFrom(sprite, location), speed);

        const time = 1000 * (distanceBetween(sprite, location) / speed);

        const x = location.x;
        const y = location.y;

        if (doPause) {
            pause(time);
            sprite.vx = 0;
            sprite.vy = 0;
            sprite.x = x;
            sprite.y = y;
        }
        else {
            setTimeout(() => {
                sprite.vx = 0;
                sprite.vy = 0;
                sprite.x = x;
                sprite.y = y;
            }, time);
        }
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
    export function getSpritesWithin(kind: number, distance: number, sprite: Sprite | tiles.Location | Position): Sprite[] {
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
    export function angleFrom(a: Sprite | tiles.Location | Position, b: Sprite | tiles.Location | Position): number {
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
    export function placeAngleFrom(spriteToMove: Sprite, angleInRadians: number, distance: number, fromSprite: Sprite | tiles.Location | Position) {
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

    export function onSpriteUpdate(target: Sprite, callback: (sprite: Sprite) => void) {
        state().updatingSprites.push(new SpriteUpdateHandler(target, callback, 0))
    }

    export function onSpriteKindUpdate(kind: number, callback: (sprite: Sprite) => void) {
        state().updatingKinds.push(new SpriteKindUpdateHandler(kind, callback, 0))
    }

    //% blockId=spriteutilonspriteupdateinterval
    //% block="on $target update $sprite every $interval ms"
    //% handlerStatement
    //% draggableParameters=reporter
    //% target.shadow=variables_get
    //% target.defl=mySprite
    //% interval.shadow=timePicker
    //% interval.defl=500
    //% group=Sprite
    //% weight=4
    export function onSpriteUpdateInterval(target: Sprite, interval: number, callback?: (sprite: Sprite) => void) {
        state().updatingSprites.push(new SpriteUpdateHandler(target, callback, Math.max(interval || 0, 0)))
    }

    //% blockId=spriteutilonspritekindupdateinterval
    //% block="on $sprite of kind $kind update every $interval ms"
    //% draggableParameters=reporter
    //% kind.shadow=spritekind
    //% interval.shadow=timePicker
    //% interval.defl=500
    //% group=Sprite
    //% weight=9
    export function onSpriteKindUpdateInterval(kind: number, interval: number, callback: (sprite: Sprite) => void) {
        state().updatingKinds.push(new SpriteKindUpdateHandler(kind, callback, Math.max(interval || 0, 0)))
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
    export function roundWithPrecision(x: number, digitsAfterDecimal: number): string {
        let rounded = "" + Math.roundWithPrecision(x, digitsAfterDecimal);
        if (digitsAfterDecimal > 0) {
            const indDec = rounded.indexOf(".");
            let padZeros = 0;
            if (indDec === -1) {
                padZeros = digitsAfterDecimal;
                rounded += ".";
            } else {
                const currDecimals = rounded.length - 1 - indDec;
                if (currDecimals > digitsAfterDecimal) {
                    rounded = rounded.slice(0, indDec + 1 + digitsAfterDecimal);
                } else if (currDecimals < digitsAfterDecimal) {
                    padZeros = digitsAfterDecimal - currDecimals;
                }
            }
            for (let i = 0; i < padZeros; ++i) {
                rounded += "0";
            }
        }
        return rounded;
    }

    //% blockId=spriteutiladdeventhandler
    //% block="run code $modifier game engine $priority"
    //% group=General
    //% weight=10
    //% help=github:arcade-sprite-util/docs/add-event-handler
    export function addEventHandler(modifier: UpdatePriorityModifier, priority: UpdatePriority, callback: () => void) {
        const handlerPriority = priority + (modifier === UpdatePriorityModifier.Before ? -0.5 : 0.5);
        game.currentScene().eventContext.registerFrameHandler(handlerPriority, callback);
    }



    /**
     * TODO: add help docs
     * pixels > 0
     */
    //% blockId=spriteutiljumpimpulse
    //% block="make $sprite jump $pixels pixels"
    //% pixels.defl=34
    //% pixels.min=0
    //% pixels.max=120
    //% sprite.shadow=variables_get
    //% sprite.defl=mySprite
    //% group=Sprite
    //% weight=70
    export function jumpImpulse(sprite: Sprite, pixels: number) {
        const g = Math.abs(sprite.ay) || 200;
        const dir = sprite.ay > 0 ? -1 : 1;
        sprite.vy = dir * Math.sqrt(2 * Math.abs(pixels) * g);
    }

    /**
     * TODO: add help docs
     */
    //% blockId=spriteutilmathconsts
    //% block="$constType"
    //% group="General"
    //% weight=10
    export function consts(constType: spriteutils.Consts): number {
        switch (constType) {
            case Consts.Undefined: return undefined;
            case Consts.Null: return null;
            case Consts.NaN: return NaN;
            case Consts.Pi: return Math.PI;
            case Consts.E: return Math.E;
            case Consts.LN2: return Math.LN2;
            case Consts.LN10: return Math.LN10;
            case Consts.SQRT1_2: return Math.SQRT1_2;
            case Consts.SQRT2: return Math.SQRT2;
            default: return 0;
        }
    }

    /**
     * TODO: add help docs
     */
    //% blockId=spriteutilnullconsts
    //% block="$constType"
    //% group="General"
    //% weight=10
    export function nullConsts(constType: spriteutils.NullConsts): undefined {
        switch (constType) {
            case NullConsts.Undefined: return undefined;
            case NullConsts.Null: return null;
            default: return null;
        }
    }

    //% blockId=spriteutilpos
    //% block="x $x y $y"
    //% help=github:arcade-sprite-util/docs/pos
    //% weight=1
    //% group=General
    export function pos(x: number, y: number) {
        return new Position(x, y);
    }

    export class Position {
        constructor(public x: number, public y: number) {
        }
    }
}
