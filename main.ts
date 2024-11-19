namespace SpriteKind{
    export const Roomba = SpriteKind.create()
}
let playerSprite:Sprite = null
let leverPushed = false

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

function onStart(){
    setTileMap()
    placePlayerOnTileMap()
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
    if(nearestEntity.length > 0){
        info.startCountdown(5)
        scene.cameraFollowSprite(nearestEntity[0])
        controller.moveSprite(nearestEntity[0])
        controller.moveSprite(playerSprite, 0, 0)
    }
    
})
info.onCountdownEnd(function(){
    controller.moveSprite(playerSprite)
    scene.cameraFollowSprite(playerSprite)
})
// game updates
game.onUpdate(function(){
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