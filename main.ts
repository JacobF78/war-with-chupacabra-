namespace SpriteKind{
    export const Roomba = SpriteKind.create()
    export const Target = SpriteKind.create()
}
let playerSprite:Sprite = null
let targetSprite: Sprite = null
let leverPushed = false
let currentControlledEntity: Sprite = null


function setTileMap(){
    tiles.setTilemap(tilemap`test`)
}

function placePlayerOnTileMap(){
    createPlayer()
    tiles.placeOnTile(playerSprite, tiles.getTileLocation(7, 7))
}
function createPlayer() {
    playerSprite = sprites.create(assets.image`player`, SpriteKind.Player)

    controller.moveSprite(playerSprite)
    scene.cameraFollowSprite(playerSprite)
}
function createTargetSprite(){
    targetSprite = sprites.create(assets.image`target`, SpriteKind.Target)
}

function onStart(){
    setTileMap()
    placePlayerOnTileMap()
    createTargetSprite()
    placeRoombaOnTileMap()
}
 //entry point to game
onStart()
//creating sprites on tilemap
function placeRoombaOnTileMap() {
    let roombaAmount: number = randint(1, 3)
    for (let i = 0; i < roombaAmount; i++) {
        createRoomba(tiles.getRandomTileByType(assets.tile`floorTile`))
    }
}

function createRoomba(tileLocation:tiles.Location){
    let roombaSprite:Sprite = sprites.create(assets.image`roomba`,SpriteKind.Roomba)
    tiles.placeOnTile(roombaSprite,tileLocation)
    setRandomVelocity(roombaSprite,15,randint(-1,1),randint(-1,1))
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
    let nearestEntity:Sprite[] = spriteutils.getSpritesWithin(SpriteKind.Roomba,40,playerSprite)
    if(nearestEntity.length > 0&& !currentControlledEntity ){
        info.startCountdown(5)
        scene.cameraFollowSprite(nearestEntity[0])
        controller.moveSprite(nearestEntity[0],25,25)
        controller.moveSprite(playerSprite, 0, 0)
        currentControlledEntity = nearestEntity[0]
    }
    
})
info.onCountdownEnd(function(){
    controller.moveSprite(playerSprite)
    scene.cameraFollowSprite(playerSprite)
    controller.moveSprite(currentControlledEntity, 0, 0)
    setRandomVelocity(currentControlledEntity, 15, randint(-1, 1), randint(-1, 1))
    currentControlledEntity = null
})
// game updates
game.onUpdate(function(){
    let targetSpriteLocation = spriteutils.getSpritesWithin(SpriteKind.Roomba,40,playerSprite)
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
controller.B.onEvent(ControllerButtonEvent.Pressed, function(){
    if(currentControlledEntity == null){
        return
    }

    let directionX:number = Math.sign(currentControlledEntity.vx)
    let directionY: number = Math.sign(currentControlledEntity.vy)
    currentControlledEntity.setVelocity(directionX*50,directionY*50)
    
})