let PlayerSprite = null


function setTileMap(){
    tiles.setTilemap(tilemap`test`)
}
function createPlayer(){
    PlayerSprite = sprites.create(assets.image`player`,SpriteKind.Player)
    tiles.placeOnTile(PlayerSprite,tiles.getTileLocation(7,7))
    controller.moveSprite(PlayerSprite)
    scene.cameraFollowSprite(PlayerSprite)
}
function onStart(){
    setTileMap()
    createPlayer()
}

onStart()