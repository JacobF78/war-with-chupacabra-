class Enemy {
    health: number
    spriteImage: Image[]
    attackPower: number
    kind: number
    spriteType: string = ""
    target: Sprite = null

    constructor(health: number, spriteImage: Image[], attackPower: number, kind: number) {
        this.health = health
        this.spriteImage = spriteImage
        this.attackPower = attackPower
        this.kind = kind
    }
    addSpriteImage(image: Image) {
        this.spriteImage.push(image)
    }
    createSprite() {
        let enemySprite = sprites.create(this.spriteImage[0], this.kind)
        sprites.setDataNumber(enemySprite, "health", this.health)
        sprites.setDataNumber(enemySprite, "attackPower", this.attackPower)
        sprites.setDataString(enemySprite, "type", this.spriteType)
        sprites.setDataSprite(enemySprite, "target", this.target)

        return enemySprite
    }
    setSpriteType(newType: string){
        this.spriteType = newType
    }

}
class Entity {
    speed: number
    health: number
    spriteImage: Image
    attackPower: number
    tileImage: Image
    kind: number
    spriteAnimation: Image[][] = null

    constructor(speed: number, spriteImage: Image, health: number, attackPower: number, tileImage: Image, kind: number) {
        this.speed = speed
        this.health = health
        this.spriteImage = spriteImage
        this.attackPower = attackPower
        this.tileImage = tileImage
        this.kind = kind
    }

    createSprite() {
        let entitySprite = sprites.create(this.spriteImage, this.kind)
        sprites.setDataNumber(entitySprite, "health", this.health)
        sprites.setDataNumber(entitySprite, "attackPower", this.attackPower)
        sprites.setDataImage(entitySprite, "tileImage", this.tileImage)
        sprites.setDataNumber(entitySprite, "speed", this.speed)
        setRandomVelocity(entitySprite, this.speed, randint(-1, 1), randint(-1, 1))
        // if(this.spriteAnimation){
        //     characterAnimations.loopFrames(
        //         entitySprite, this.spriteAnimation[0],0,
        //         Predicate.FacingLeft
        //     )
        //     characterAnimations.loopFrames(
        //         entitySprite, this.spriteAnimation[1], 0,
        //         Predicate.FacingUp
        //     )
        //     characterAnimations.loopFrames(
        //         entitySprite, this.spriteAnimation[2], 0,
        //         Predicate.FacingRight
        //     )
        //     characterAnimations.loopFrames(
        //         entitySprite, this.spriteAnimation[3], 0,
        //         Predicate.FacingDown
        //     )
        // }

        return entitySprite
    }
    addAnimation(animation: Image[][]) {
        this.spriteAnimation = (animation)
    }
}


class Human{
    speed: number
    health: number
    kind: number
    spriteImage: Image
    animation: Image[][]

    constructor(speed:number, health:number, kind:number, spriteImage:Image){
        this.speed = speed
        this.health = health
        this.kind = kind
        this.spriteImage = spriteImage
    }

    createSprite(){
        let humanSprite:Sprite = sprites.create(this.spriteImage, this.kind)
        sprites.setDataNumber(humanSprite, "health", this.health)
        sprites.setDataNumber(humanSprite, "speed", this.speed)
        sprites.setDataBoolean(humanSprite, "beingChased", false)
        let destinationSprite: Sprite = sprites.create(img`
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
        sprites.setDataSprite(humanSprite, "destinationSprite", destinationSprite)
        tiles.placeOnRandomTile(destinationSprite, assets.image `floorTile`)
        spriteutils.onSpriteUpdate(humanSprite, function(sprite: Sprite){

            if(spriteutils.distanceBetween(destinationSprite, humanSprite) >= 12 && sprites.readDataBoolean(humanSprite, "beingChased")){
                sprite.follow(destinationSprite,120)
            }else{
                //tiles.placeOnRandomTile(destinationSprite, assets.image `floorTile`)
                tiles.placeOnTile(destinationSprite, tiles.getTilesByType(assets.tile `floorTile`)._pickRandom())
                sprite.follow(null)
            }
        })
        return humanSprite
    }
}