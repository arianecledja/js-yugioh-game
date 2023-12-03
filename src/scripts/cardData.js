const pathImages = './src/assets/icons/cards/'

export const cardData = [
    {
        id: 0,
        name: 'Blue Eyes White Dragon',
        type: 'Paper',
        img: `${pathImages}dragon.png`,
        WinOf: [1, 3, 7, 9],
        LoseOf: [2, 6, 8]
    },
    {
        id: 1,
        name: 'Dark Magician',
        type: 'Rock',
        img: `${pathImages}magician.png`,
        WinOf: [2, 6, 8],
        LoseOf: [0, 4, 5]
    },
    {
        id: 2,
        name: 'Exodia',
        type: 'Scissors',
        img: `${pathImages}exodia.png`,
        WinOf: [0, 4, 5],
        LoseOf: [1, 3, 7, 9]
    },
    {
        id: 3,
        name: 'Black Luster Soldier',
        type: 'Rock',
        img: `${pathImages}black-luster.png`,
        WinOf: [2, 6, 8],
        LoseOf: [0, 4, 5]
    }, 
    {
        id: 4,
        name: 'Slifer the Sky Dragon',
        type: 'Paper',
        img: `${pathImages}slifer-the-sky-dragon.png`,
        WinOf: [1, 3, 7, 9],
        LoseOf: [2, 6, 8]
    }, 
    {
        id: 5,
        name: 'Red-Eyes Black Dragon',
        type: 'Paper',
        img: `${pathImages}red-eyes-black-dragon.png`,
        WinOf: [1, 3, 7, 9],
        LoseOf: [2, 6, 8]
    }, 
    {
        id: 6,
        name: 'Tyler the Great Warrior',
        type: 'Scissors',
        img: `${pathImages}tyler-the-great-warrior.png`,
        WinOf: [0, 4, 5],
        LoseOf: [1, 3, 7, 9]
    }, 
    {
        id: 7,
        name: 'Raigeki',
        type: 'Rock',
        img: `${pathImages}raigeki.png`,
        WinOf: [2, 6, 8],
        LoseOf: [0, 4, 5]
    }, 
    {
        id: 8,
        name: 'Cyber-Stein',
        type: 'Scissors',
        img: `${pathImages}cyber-stein.png`,
        WinOf: [0, 4, 5],
        LoseOf: [1, 3, 7, 9]
    },
    {
        id: 9,
        name: 'Minerva, the Exalted Lightsworn',
        type: 'Rock',
        img: `${pathImages}minerva-the-exalted-lightsworn.png`,
        WinOf: [2, 6, 8],
        LoseOf: [0, 4, 5]
    }
]