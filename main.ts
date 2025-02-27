namespace SpriteKind {
    export const Roomba = SpriteKind.create()
    export const Target = SpriteKind.create()
    export const Excavator = SpriteKind.create()
    export const Shovel = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (currentControlledEntity == null) {
        return
    }
    if (currentControlledEntity.kind() == SpriteKind.Excavator) {
        frameIntervel = 50
        attackSprite2 = sprites.readDataSprite(currentControlledEntity, "attackSprite")
        // if(characterAnimations.matchesRule(currentControlledEntity, Predicate.FacingLeft)){
        // animation.runImageAnimation(attackSprite, SpriteSheet.ecavatorAttackAnimation[0], frameIntervel,false)
        // } else if (characterAnimations.matchesRule(currentControlledEntity, Predicate.FacingUp)){
        // animation.runImageAnimation(attackSprite, SpriteSheet.ecavatorAttackAnimation[1], frameIntervel, false)
        // } else if (characterAnimations.matchesRule(currentControlledEntity, Predicate.FacingRight)){
        // animation.runImageAnimation(attackSprite, SpriteSheet.ecavatorAttackAnimation[2], frameIntervel, false)
        // }else{
        // animation.runImageAnimation(attackSprite, SpriteSheet.ecavatorAttackAnimation[3], frameIntervel, false)
        // }
        runAnimation(attackSprite2, SpriteSheet.ecavatorAttackAnimation[2])
        // animation.runImageAnimation(attackSprite, SpriteSheet.ecavatorAttackAnimation[0], frameIntervel, false)
        // rotsprite.rotSprite(attackSprite,currentAngle)
        timer.after(frameIntervel * SpriteSheet.ecavatorAttackAnimation[0].length + 1, function () {
            attackSprite2.setImage(img`
                ........................................
                ........................................
                ........................................
                ........................................
                ........................................
                ........................................
                ........................................
                ........................................
                ........................................
                ........................................
                ........................................
                ........................................
                ........................................
                ........................................
                ........................................
                ........................................
                ........................................
                ........................................
                ........................................
                ........................................
                ........................................
                ........................................
                ........................................
                ........................................
                ........................................
                ........................................
                ........................................
                ........................................
                ........................................
                ........................................
                ........................................
                ........................................
                `)
        })
        return
    }
    let directionX: number = Math.sign(currentControlledEntity.vx)
let directionY: number = Math.sign(currentControlledEntity.vy)
isDashing = true
    controller.moveSprite(currentControlledEntity, 0, 0)
    timer.after(100, function () {
        if (currentControlledEntity == null) {
            return
        }
        spriteutils.moveTo(currentControlledEntity, spriteutils.pos(currentControlledEntity.x + 50 * directionX, currentControlledEntity.y + 50 * directionY), 250)
        timer.after(250, function () {
            if (currentControlledEntity != null) {
                controller.moveSprite(currentControlledEntity, 50, 50)
            }
            isDashing = false
        })
    })
})
function slimeExplodeAnimation (sprite: Sprite) {
    effectsSprite2 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Food)
    effectsSprite2.setPosition(effectsSprite2.x = sprite.x, effectsSprite2.y = sprite.y)
    animation.runImageAnimation(
    effectsSprite2,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    100,
    false
    )
    effectsSprite2.lifespan = 301
}
// keyboard input
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let nearestEntity:Sprite[] = spriteutils.getSpritesWithin(SpriteKind.Roomba,40,playerSprite).concat(spriteutils.getSpritesWithin(SpriteKind.Excavator, 40, playerSprite))
if (nearestEntity.length > 0 && !(currentControlledEntity)) {
        info.startCountdown(15)
        scene.cameraFollowSprite(nearestEntity[0])
        controller.moveSprite(nearestEntity[0], 50, 50)
        controller.moveSprite(playerSprite, 0, 0)
        currentControlledEntity = nearestEntity[0]
    }
})
function setRandomVelocity (sprite: Sprite, maxSpeed: number, directionX: number, directionY: number) {
    speed = maxSpeed
    if (Math.random() <= 0.5) {
        directionX = -1
    }
    if (Math.random() <= 0.5) {
        directionY = -1
    }
    sprite.setVelocity(directionX * speed, directionY * speed)
}
function createTargetSprite () {
    targetSprite = sprites.create(assets.image`target`, SpriteKind.Target)
}
function generateTileMapSlime () {
    enemyAmount = randint(1, 4)
    for (let j = 0; j <= enemyAmount; j++) {
        createRandomEnemy(tiles.getRandomTileByType(assets.tile`floorTile`))
    }
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(currentControlledEntity)) {
        return
    }
    if (currentControlledEntity.kind() == SpriteKind.Excavator) {
        transformSprites.changeRotation(currentControlledEntity, 5)
    }
})
function placePlayerOnTileMap () {
    createPlayer()
    tiles.placeOnTile(playerSprite, tiles.getTileLocation(7, 7))
    playerSprite.z = 50
}
function createAttackSprite (sprite: Sprite) {
    attackSprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Shovel)
    sprites.setDataSprite(sprite, "attackSprite", attackSprite)
    game.forever(function(){
            attackSprite.setPosition(sprite.x,sprite.y)
        })
}
info.onCountdownEnd(function () {
    resetControlAbility()
})
function generateTileMapExcavator () {
    for (let index = 0; index < 1; index++) {
        createExcavator(tiles.getRandomTileByType(assets.tile`floorTile`))
    }
}
function setTileMap () {
    tiles.setTilemap(tilemap`test`)
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(currentControlledEntity)) {
        return
    }
    if (currentControlledEntity.kind() == SpriteKind.Excavator) {
    	
    }
})
// creating sprites on tilemap
function placeRoombaOnTileMap () {
    roombaAmount2 = randint(1, 10)
    for (let index = 0; index < roombaAmount2; index++) {
        createRoomba(tiles.getRandomTileByType(assets.tile`floorTile`))
    }
}
function onStart () {
    setTileMap()
    placePlayerOnTileMap()
    createTargetSprite()
    // placeRoombaOnTileMap()
    generateTileMapSlime()
    // generateTileMapExcavator()
    placeEntityOnTileMap()
}
function createPlayer () {
    playerSprite = sprites.create(assets.image`player`, SpriteKind.Player)
    controller.moveSprite(playerSprite)
    scene.cameraFollowSprite(playerSprite)
}
function placeEntityOnTileMap () {
    roombaAmount = randint(1, 5)
    excavatorAmount = randint(1, 2)
    for (let k = 0; k <= roombaAmount; k++) {
        let roomba: Sprite = entityObject[0].createSprite()
tiles.placeOnRandomTile(roomba, entityObject[0].tileImage)
    }
    for (let l = 0; l <= excavatorAmount; l++) {
        let excavtor: Sprite = entityObject[1].createSprite()
createAttackSprite(excavtor)
        tiles.placeOnRandomTile(excavtor, entityObject[1].tileImage)
    }
}
function resetControlAbility () {
    info.stopCountdown()
    controller.moveSprite(playerSprite)
    scene.cameraFollowSprite(playerSprite)
    controller.moveSprite(currentControlledEntity, 0, 0)
    setRandomVelocity(currentControlledEntity, sprites.readDataNumber(currentControlledEntity, "speed"), randint(-1, 1), randint(-1, 1))
    currentControlledEntity = null
}
function runAnimation (sprite: Sprite, animation2: Image[]) {
    frameIntervel2 = 50
    for (let image2 of animation2) {
        sprite.setImage(image2)
        rotsprite.rotSprite(sprite,currentAngle)
pause(frameIntervel2)
    }
}
function roombaExplodeAnimation (sprite: Sprite) {
    effectsSprite = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Food)
    effectsSprite.setPosition(effectsSprite.x = sprite.x, effectsSprite.y = sprite.y)
    animation.runImageAnimation(
    effectsSprite,
    [img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `],
    50,
    false
    )
    effectsSprite.lifespan = 251
}
let effectsSprite: Sprite = null
let frameIntervel2 = 0
let excavatorAmount = 0
let roombaAmount = 0
let roombaAmount2 = 0
let attackSprite: Sprite = null
let enemyAmount = 0
let targetSprite: Sprite = null
let speed = 0
let effectsSprite2: Sprite = null
let attackSprite2: Sprite = null
let frameIntervel = 0
let currentAngle: number = 0
let isDashing = false
let currentControlledEntity: Sprite = null
let leverPushed = false
let playerSprite:Sprite = null
namespace OverlapEvents{
    sprites.onOverlap(SpriteKind.Roomba, SpriteKind.Enemy, function (sprite, otherSprite) {
        if (currentControlledEntity == null) {
            sprite.destroy()
            roombaExplodeAnimation(sprite)

            return

        }




        if (!isDashing) {
            if (sprite.id == currentControlledEntity.id) {
                resetControlAbility()
                scene.cameraShake(40, 500)
            }
            sprite.destroy()
            roombaExplodeAnimation(sprite)

            return
        }
        if (sprite.id == currentControlledEntity.id) {
            otherSprite.destroy()
            slimeExplodeAnimation(otherSprite)

            return
        }

    })
    sprites.onOverlap(SpriteKind.Shovel, SpriteKind.Enemy, function(sprite,otherSprite){
        otherSprite.destroy()
        slimeExplodeAnimation(otherSprite)
    })
    sprites.onOverlap(SpriteKind.Excavator, SpriteKind.Enemy, function (sprite, otherSprite) {
        otherSprite.destroy()
        slimeExplodeAnimation(otherSprite)
    })
}

let enemyObjects = [new Enemy(2,[assets.image`slime`],5,SpriteKind.Enemy)]
let entityObject = [new Entity(20, assets.image`roomba`,1,1,assets.tile`floorTile`, SpriteKind.Roomba), new Entity(0,assets.image `excavator`, 20,30,assets.tile `floorTile`, SpriteKind.Excavator)]
entityObject[1].addAnimation([
    [ 
        assets.image`excavatorLeft`

    ],
    [
        assets.image`excavatorUp`
    ],
    [
        assets.image`excavatorRight`
    ],
    [
        assets.image`excavatorDown`
    ]
])
function createExcavator(tileLocation: tiles.Location){
    let excavatorSprite: Sprite = sprites.create(assets.image`excavator`,SpriteKind.Excavator)
    tiles.placeOnTile(excavatorSprite, tileLocation)
}
function createRandomEnemy(tileLocation: tiles.Location){

    let enemySprite2: Sprite = enemyObjects._pickRandom().createSprite()
    tiles.placeOnTile(enemySprite2, tileLocation)
}
// entry point to game
onStart()
function createRoomba(tileLocation:tiles.Location){
    let roombaSprite:Sprite = sprites.create(assets.image`roomba`,SpriteKind.Roomba)
    tiles.placeOnTile(roombaSprite,tileLocation)
    setRandomVelocity(roombaSprite,15,randint(-1,1),randint(-1,1))
    roombaSprite.z = 30
}
// game updates
game.onUpdate(function () {
    let targetSpriteLocation = spriteutils.getSpritesWithin(SpriteKind.Roomba,40,playerSprite).concat(spriteutils.getSpritesWithin(SpriteKind.Excavator, 40, playerSprite))
targetSprite.setFlag(SpriteFlag.Invisible, true)
    if (targetSpriteLocation.length > 0 && currentControlledEntity == null) {
        targetSprite.setFlag(SpriteFlag.Invisible, false)
        targetSprite.x = targetSpriteLocation[0].x
        targetSprite.y = targetSpriteLocation[0].y - 10
        targetSprite.z = 10
    }
    for (let roomba2 of sprites.allOfKind(SpriteKind.Roomba)) {
        if (roomba2.isHittingTile(CollisionDirection.Left)) {
            setRandomVelocity(roomba2, 15, 1, randint(-1, 1))
        }
        if (roomba2.isHittingTile(CollisionDirection.Right)) {
            setRandomVelocity(roomba2, 15, -1, randint(-1, 1))
        }
        if (roomba2.isHittingTile(CollisionDirection.Top)) {
            setRandomVelocity(roomba2, 15, randint(-1, 1), 1)
        }
        if (roomba2.isHittingTile(CollisionDirection.Bottom)) {
            setRandomVelocity(roomba2, 15, randint(-1, 1), -1)
        }
    }
})
forever(function () {
    if (!(currentControlledEntity)) {
        return
    }
    if (currentControlledEntity.kind() != SpriteKind.Excavator) {
        return
    }
    controller.moveSprite(currentControlledEntity, 0, 0)
    currentControlledEntity.setImage(assets.image`excavator`)
    if (controller.left.isPressed()) {
        currentAngle += 0 - 3 * control.eventContext().deltaTime
    } else if (controller.right.isPressed()) {
        currentAngle += 3 * control.eventContext().deltaTime
    }
    rotsprite.rotSprite(currentControlledEntity,currentAngle)
if (controller.up.isPressed()) {
        spriteutils.setVelocityAtAngle(currentControlledEntity, currentAngle, 50)
    } else if (controller.down.isPressed()) {
        spriteutils.setVelocityAtAngle(currentControlledEntity, currentAngle, -50)
    } else {
        currentControlledEntity.setVelocity(0, 0)
    }
})
