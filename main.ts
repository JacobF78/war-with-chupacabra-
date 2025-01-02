namespace SpriteKind{
    export const Roomba = SpriteKind.create()
    export const Target = SpriteKind.create()
    export const Excavator = SpriteKind.create()
}
class Enemy {
    health:number
    spriteImage:Image[]
    attackPower:number
    kind:number

    constructor(health:number, spriteImage:Image[], attackPower:number,kind:number){
        this.health = health
        this.spriteImage = spriteImage
        this.attackPower = attackPower
        this.kind = kind
    }
    addSpriteImage(image:Image){
        this.spriteImage.push(image)
    }
    createSprite(){
        return sprites.create(this.spriteImage[0],this.kind)
    }

    
}
let enemyObjects: Enemy[] = [
    new Enemy(2,[assets.image`slime`],555,SpriteKind.Enemy)
]
let playerSprite:Sprite = null
let targetSprite: Sprite = null
let leverPushed = false
let currentControlledEntity: Sprite = null
let isDashing = false


function setTileMap(){
    tiles.setTilemap(tilemap`test`)
}

function placePlayerOnTileMap(){
    createPlayer()
    tiles.placeOnTile(playerSprite, tiles.getTileLocation(7, 7))
    playerSprite.z = 50
}
function createPlayer() {
    playerSprite = sprites.create(assets.image`player`, SpriteKind.Player)

    controller.moveSprite(playerSprite)
    scene.cameraFollowSprite(playerSprite)
}
function createExcavator(tileLocation: tiles.Location){
    let excavatorSprite: Sprite = sprites.create(img`
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
        ..ffffffffffffffffffff..................
        ..ffff5555f5555fffffff..................
        ..fff55555f55111ffffff..................
        ..ff555555f55111ffffff..................
        ....555555f55111........................
        ....555555f5555.........................
        ....555555f555555555555555555555555555..
        ....fffffffffffbbbbbbbbbbbbbbbbbbbbbb5..
        ....555555f5555555555555555555555555b5..
        ....555555f5555...............fff5bbb5..
        ....555555f5555...............fffff.....
        ..ff555555f5555fffffff........fffff.....
        ..fff55555f5555fffffff........fffff.....
        ..ffff5555f5555fffffff..................
        ..ffffffffffffffffffff..................
        ........................................
        ........................................
        ........................................
    `,SpriteKind.Excavator)
    tiles.placeOnTile(excavatorSprite, tileLocation)
}
function generateTileMapExcavator(){
    for(let i = 0; i < 1; i++){
        createExcavator(tiles.getRandomTileByType(assets.tile`floorTile`))
    }
}
function generateTileMapSlime(){
    let enemyAmount = randint(1,4)
    for(let i = 0; i <= enemyAmount;i++){
        createRandomEnemy(tiles.getRandomTileByType(assets.tile`floorTile`))

        
    }
}
function createRandomEnemy(tileLocation: tiles.Location){

    let enemySprite: Sprite = enemyObjects._pickRandom().createSprite()
    tiles.placeOnTile(enemySprite, tileLocation)
}

function createTargetSprite(){
    targetSprite = sprites.create(assets.image`target`, SpriteKind.Target)
}

function onStart(){
    setTileMap()
    placePlayerOnTileMap()
    createTargetSprite()
    placeRoombaOnTileMap()
    generateTileMapSlime()
    generateTileMapExcavator()
}
 //entry point to game
onStart()
//creating sprites on tilemap
function placeRoombaOnTileMap() {
    let roombaAmount: number = randint(1, 10)
    for (let i = 0; i < roombaAmount; i++) {
        createRoomba(tiles.getRandomTileByType(assets.tile`floorTile`))
    }
}

function createRoomba(tileLocation:tiles.Location){
    let roombaSprite:Sprite = sprites.create(assets.image`roomba`,SpriteKind.Roomba)
    tiles.placeOnTile(roombaSprite,tileLocation)
    setRandomVelocity(roombaSprite,15,randint(-1,1),randint(-1,1))
    roombaSprite.z = 30
}
function setRandomVelocity(sprite:Sprite,maxSpeed:number,directionX:number,directionY:number){
    let speed: number = maxSpeed
  

    if (Math.random() <= 0.5) {
        directionX = -1
    }
    if (Math.random() <= 0.5) {
        directionY = -1
    }
    sprite.setVelocity(directionX * speed, directionY * speed)
}

//keyboard input
controller.A.onEvent(ControllerButtonEvent.Pressed, function(){
    let nearestEntity:Sprite[] = spriteutils.getSpritesWithin(SpriteKind.Roomba,40,playerSprite).concat(spriteutils.getSpritesWithin(SpriteKind.Excavator, 40, playerSprite))
    if(nearestEntity.length > 0&& !currentControlledEntity ){
        info.startCountdown(15)
        scene.cameraFollowSprite(nearestEntity[0])
        controller.moveSprite(nearestEntity[0],50,50)
        controller.moveSprite(playerSprite, 0, 0)
        currentControlledEntity = nearestEntity[0]
    }
    
})
info.onCountdownEnd(function(){
    resetControlAbility()
})
function resetControlAbility(){
    info.stopCountdown()
    controller.moveSprite(playerSprite)
    scene.cameraFollowSprite(playerSprite)
    controller.moveSprite(currentControlledEntity, 0, 0)
    setRandomVelocity(currentControlledEntity, 15, randint(-1, 1), randint(-1, 1))
    currentControlledEntity = null
}
// game updates
game.onUpdate(function(){
    let targetSpriteLocation = spriteutils.getSpritesWithin(SpriteKind.Roomba,40,playerSprite).concat(spriteutils.getSpritesWithin(SpriteKind.Excavator, 40, playerSprite))
        targetSprite.setFlag(SpriteFlag.Invisible,true)
    if(targetSpriteLocation.length > 0 && currentControlledEntity == null){
        targetSprite.setFlag(SpriteFlag.Invisible,false)
        targetSprite.x = targetSpriteLocation[0].x
        targetSprite.y = targetSpriteLocation[0].y - 10
        targetSprite.z = 10
    }

    for(let roomba of sprites.allOfKind(SpriteKind.Roomba)){

        if(roomba.isHittingTile(CollisionDirection.Left)){
            setRandomVelocity(roomba,15,1,randint(-1,1))

        }
        if (roomba.isHittingTile(CollisionDirection.Right)) {
            
            setRandomVelocity(roomba, 15,-1,randint(-1,1))

        }
        if (roomba.isHittingTile(CollisionDirection.Top)) {

            setRandomVelocity(roomba, 15, randint(-1,1), 1)

        }
        if (roomba.isHittingTile(CollisionDirection.Bottom)) {

            setRandomVelocity(roomba, 15, randint(-1,1),-1)

        }
        
        
        
    }
})
sprites.onOverlap(SpriteKind.Roomba, SpriteKind.Enemy,function(sprite,otherSprite){
    if(currentControlledEntity == null){
        sprite.destroy()
        roombaExplodeAnimation(sprite)
        
            return
        
    }




    if(!isDashing){
        if (sprite.id == currentControlledEntity.id) {
            resetControlAbility()
            scene.cameraShake(40, 500)
        }
        sprite.destroy()
        roombaExplodeAnimation(sprite)
        
        return
    }
    if(sprite.id == currentControlledEntity.id){
        otherSprite.destroy()
        slimeExplodeAnimation(otherSprite)
        
        return
    }
    
})
function roombaExplodeAnimation(sprite: Sprite){
    let effectsSprite: Sprite = sprites.create(img`
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
    animation.runImageAnimation(effectsSprite, [
        img`
                . . . . . . . . . . . . . . . .
                . . . . f f f f f f f . . . . .
                . . f f 1 1 1 1 1 1 1 f f . . .
                . f f 1 f f f f f f f 1 f f . .
                . f 1 f f f f f f f f f 1 f . .
                f 1 f f f f f f f f f f f 1 f .
                f 1 f f b b b b b f f f f 1 f .
                f 1 f f b f f f b f f f f 1 f .
                f 1 f f b f f f b f f f f 1 f .
                f 1 f f b b b b b f f f f 1 f .
                f 1 f f f f f f f f f f f 1 f .
                f 1 f f 2 2 f f f f f f f 1 f .
                . f 1 f 2 2 f f f f f f 1 f . .
                . f f 1 f f f f f f f 1 f f . .
                . . f f 1 1 1 1 1 1 1 f f . . .
                . . . . f f f f f f f . . . . .
            `,
        img`
                . . . . . . . . . . . . . . . .
                . . . . f f f f f f f . . . . .
                . . f f 1 1 1 1 1 1 1 f f . . .
                . f f 1 f f f f f f f 1 f f . .
                . f 1 f f f f f f f f f 1 f . .
                f 1 f f f f f 2 2 2 f f f 1 f .
                f 1 f f b 2 2 2 2 2 f f f 1 f .
                f 1 f f b 2 2 2 2 2 f f f 1 f .
                f 1 f f b 2 2 2 2 2 f f f 1 f .
                f 1 f f b b 2 2 2 f f f f 1 f .
                f 1 f f f f f f f f f f f 1 f .
                f 1 f f 2 2 f f f f f f f 1 f .
                . f 1 f 2 2 f f f f f f 1 f . .
                . f f 1 f f f f f f f 1 f f . .
                . . f f 1 1 1 1 1 1 1 f f . . .
                . . . . f f f f f f f . . . . .
            `,
        img`
                . . . . . . . . . . . . . . . .
                . . . . f f f f f f f . . . . .
                . . f f 4 4 1 1 1 1 1 f f . . .
                . f f 1 4 4 4 4 f f f 1 f f . .
                . f 1 4 4 4 4 4 4 4 4 4 1 f . .
                f 1 f 4 4 4 f 2 2 2 4 4 4 1 f .
                f 1 f 4 4 2 2 2 2 2 4 4 4 4 f .
                f 1 f 4 4 2 2 2 2 2 4 f 4 1 f .
                f 1 f 4 4 4 2 2 2 2 4 4 4 1 f .
                f 1 f 4 4 4 2 2 2 4 4 4 f 1 f .
                f 1 f 4 4 4 4 4 4 4 4 f f 1 f .
                f 1 f f 4 4 4 4 4 f f f f 1 f .
                . f 1 f 2 2 f f f f f f 1 f . .
                . f f 1 f f f f f f f 1 f f . .
                . . f f 1 1 1 1 1 1 1 f f . . .
                . . . . f f f f f f f . . . . .
            `,
        img`
                . . . . . 5 5 5 . . . . . . . .
                . . . . 5 5 f 5 5 f f . . . . .
                . . f 5 4 4 1 5 5 5 5 5 f . . .
                . f 5 1 4 4 4 4 f f f 5 5 f . .
                . f 5 4 4 4 4 4 4 4 4 4 5 5 . .
                f 1 5 4 4 4 f 2 2 2 4 4 4 5 5 .
                f 1 f 4 4 2 2 2 2 2 4 4 4 5 5 .
                f 5 5 4 4 2 2 2 2 2 4 f 4 5 f .
                f 5 5 4 4 4 2 2 2 2 4 4 5 5 f .
                f 5 5 4 4 4 2 2 2 4 4 4 5 5 f .
                f 5 5 5 4 4 4 4 4 4 5 5 5 1 f .
                f 1 5 5 4 4 4 4 5 5 5 5 5 1 f .
                . f 5 5 5 5 5 5 5 f f 5 1 f . .
                . f f 5 5 5 5 5 5 5 5 5 f f . .
                . . f f 1 1 1 1 1 1 1 f f . . .
                . . . . f f f f f f f . . . . .
            `,
        img`
                . . . . . 5 2 2 2 2 2 2 2 2 . .
                2 2 2 2 2 2 2 2 2 2 2 . . 2 2 .
                2 . f 5 2 2 2 5 5 5 5 2 2 . . 2
                2 f 5 2 2 4 2 2 f f f 5 2 2 . 2
                2 f 5 2 4 4 4 4 2 4 4 4 5 2 . 2
                2 1 2 2 4 4 f 2 2 2 4 4 4 5 2 2
                2 1 2 2 4 2 2 2 2 2 4 4 4 5 2 2
                2 5 2 2 4 2 2 2 2 2 4 f 4 5 2 2
                2 2 5 2 4 4 2 2 2 2 4 4 5 2 f 2
                2 2 5 2 4 4 2 2 2 4 4 4 5 2 f 2
                2 2 5 5 4 4 4 4 4 4 5 5 2 2 2 .
                f 2 2 5 4 4 4 4 5 5 5 2 2 2 f .
                . f 2 2 5 5 5 5 2 2 2 2 2 f . .
                . f 2 2 2 2 2 2 2 2 2 2 f f . .
                . . f 2 2 2 2 2 2 2 1 f f . . .
                . . . . f f f f f f f . . . . .
            `
    ], 50, false)
    effectsSprite.lifespan = 251

    
}
function slimeExplodeAnimation(sprite: Sprite){
    let effectsSprite: Sprite = sprites.create(img`
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
    animation.runImageAnimation(effectsSprite, [
        img`
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . 7 7 7 7 7 7 . . . . .
                . . . . . 7 7 7 7 7 7 7 7 . . .
                . . . . . 7 7 7 7 7 7 7 7 7 . .
                . . 7 7 7 7 7 7 7 7 7 7 7 7 . .
                . 7 7 f f f 7 7 7 7 7 f f f 7 .
                . 7 7 f f f 7 7 7 7 7 f f f 7 7
                7 7 7 f f f 7 7 7 7 7 f f f 7 7
                7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
                7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
                7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
                7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            `,
        img`
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . 7 . . . . .
                . . . . 7 . . 7 . . . 7 . . 7 .
                . . . . . . . . 7 7 . . . . 7 .
                . . 7 . . 7 . 7 7 . 7 . . . 7 .
                . . . . . . 7 7 . . 7 7 7 . 7 .
                7 . . 7 7 . 7 . . . . 7 7 7 7 .
                . . 7 7 . . . 7 . . 7 . . 7 7 7
                . 7 7 . . . . . . . . . . . . .
                . 7 . . . f . . . . . . f . . .
                7 . 7 f . . . 7 . . . f . . 7 .
                7 7 7 7 7 7 7 7 7 7 . . . 7 7 7
                7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
                7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
                7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            `,
        img`
                . . . . . . . . . . 7 . . . . .
                . . . . . . 7 . . . . . . 7 . 7
                . . 7 . . . . . . . 7 . . . . .
                . . . . 7 . . 7 . . . 7 . . 7 .
                . 7 . . . . . . . . . . . . 7 .
                . . 7 . . 7 . . 7 . . . . . 7 .
                . . . . . . . 7 . . . . 7 . 7 .
                7 . . 7 . . . . . . . . . 7 7 .
                . . . . . . . 7 . . . . . . . .
                . . . . . . . . . . . . . . . .
                . 7 . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                7 . . . . . . . . . . . . . . 7
                7 . . . . . . . . . . . . . . .
                7 7 7 7 7 . . . 7 . . . . 7 7 .
            `
    ], 100, false)
    effectsSprite.lifespan = 301
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function(){
    if(currentControlledEntity == null){
        return
    }
    let directionX: number = Math.sign(currentControlledEntity.vx)
    let directionY: number = Math.sign(currentControlledEntity.vy)
    isDashing = true
    controller.moveSprite(currentControlledEntity,0,0)
    timer.after(100,function(){
        if(currentControlledEntity == null){
            return
        }
        spriteutils.moveTo(currentControlledEntity, spriteutils.pos(currentControlledEntity.x+ 50*directionX,currentControlledEntity.y + 50*directionY),250)
        timer.after(250,function(){
            if(currentControlledEntity != null){
                controller.moveSprite(currentControlledEntity, 50, 50)

            }
            isDashing = false
            
        })
    })
    
    
   
    
}) 