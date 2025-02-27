namespace SpriteSheet {
    export const ecavatorAttackAnimation: Image[][] = [
        [
            assets.image`shovelLeft`,
            assets.image`shovelLeft1`,
            assets.image`shovelLeft2`,
            assets.image`shovelLeft3`
        ],
        [
            assets.image`shovelUp`,
            assets.image`shovelUp1`,
            assets.image`shovelUp2`,
            assets.image`shovelUp3`
        ],
        [
            assets.image`shovelRight`,
            assets.image`shovelRight1`,
            assets.image`shovelRight2`,
            assets.image`shovelRight3`
        ],
        [
            assets.image`shovelDown`,
            assets.image`shovelDown1`,
            assets.image`shovelDown2`,
            assets.image`shovelDown3`
        ]
    ]
    export const slimeExplodeAnimation: Image[] = [
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
    ]
    export const roombaExplodeAnimation: Image[] = [
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
    ]
}
