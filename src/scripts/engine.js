import { cardData } from "./cardData.js"

const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById('score_points')
    },
    cardSprites: {
        avatar: document.getElementById('card-image'),
        name: document.getElementById('card-name'),
        type: document.getElementById('card-type')
    },
    fieldCards: {
        player: document.getElementById('player-field-card'),
        computer: document.getElementById('computer-field-card')
    },
    playerSides: {
        player1: 'player-cards',
        player1BOX: document.querySelector('#player-cards'),
        computer: 'computer-cards',
        computerBOX: document.querySelector('#computer-cards')
    },
    actions: {
        button: document.getElementById('next-duel'),
        nextImg: document.getElementById('next'),
        previousImg: document.getElementById('previous'),
        checkVolumeInput: document.getElementById('checkVolume')
    }
}

const playerSides = {
    player1: 'player-cards',
    computer: 'computer-cards'
}

async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length)
    return cardData[randomIndex].id
}

async function createCardImage(idCard, fieldSide) {
    const cardImage = document.createElement('img')
    cardImage.setAttribute('height', '100px')
    cardImage.setAttribute('src', './src/assets/icons/card-back.png')
    cardImage.setAttribute('data-id', idCard)
    cardImage.classList.add('card')

    if(fieldSide === playerSides.player1) {
        cardImage.addEventListener('mouseover', () => { 
            document.querySelector('.menu_avatar').style.border = '16px solid #fed900'
            
            drawSelectCard(idCard)
        })

        cardImage.addEventListener('click', () => {
            setCardsField(cardImage.getAttribute('data-id'))
        })
    }
 
    return cardImage
}

async function setCardsField(cardId) {
    await removeAllCardsImages()

    let computerCardId = await getRandomCardId()

    showHiddenCardFieldsImages(true)

    await hiddenCardDetails()

    await drawCardsInField(cardId, computerCardId)

    let duelResults = await checkDuelResults(cardId, computerCardId) 

    await updateScore()
    await drawButton(duelResults)
}

async function drawCardsInField(cardId, computerCardId) {
    state.fieldCards.player.src = cardData[cardId].img
    state.fieldCards.computer.src = cardData[computerCardId].img
}

async function showHiddenCardFieldsImages(value) {
    if(value === true) {
        state.fieldCards.player.style.display = 'block'
        state.fieldCards.computer.style.display = 'block'
    } 
    if(value === false) {
        state.fieldCards.player.style.display = 'none'
        state.fieldCards.computer.style.display = 'none'
    }
}

async function hiddenCardDetails() {
    state.cardSprites.avatar.src = ''
    state.cardSprites.name.innerText = ''
    state.cardSprites.type.innerText = ''
    
    state.actions.nextImg.style.display = 'none'
    state.actions.previousImg.style.display = 'none'
}

async function drawButton(text) {
    document.querySelector('.menu_avatar').style.border = '0px solid #fed900'
    state.actions.button.innerText = text.toUpperCase()
    state.actions.button.style.display = 'block'
}

async function updateScore() {
    state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`
}

async function checkDuelResults(playerCardId, computerCardId) {
    let duelResults = 'draw'
    let playerCard = cardData[playerCardId]

    if(playerCard.WinOf.includes(computerCardId)) {
        duelResults = 'win'
        state.score.playerScore++
    }

    if(playerCard.LoseOf.includes(computerCardId)) {
        duelResults = 'lose'
        state.score.computerScore++
    }

    await playAudio(duelResults)

    return duelResults
}

async function removeAllCardsImages() {
    let { computerBOX, player1BOX } = state.playerSides
    let imgElements = computerBOX.querySelectorAll('img')
    imgElements.forEach((img) => img.remove())

    imgElements = player1BOX.querySelectorAll('img')
    imgElements.forEach((img) => img.remove())
}

async function drawSelectCard(index) {
    state.cardSprites.avatar.src = cardData[index].img
    state.cardSprites.name.innerText = cardData[index].name
    state.cardSprites.type.innerText = 'Atribute: ' + cardData[index].type
}

async function drawCards(cardNumber, fieldSide) {
    for(let i = 0; i < cardNumber; i++) {
        const randomIdCard = await getRandomCardId()
        const cardImage = await createCardImage(randomIdCard, fieldSide)

        document.getElementById(fieldSide).appendChild(cardImage)
    }
}


async function resetDuel() {
    state.cardSprites.avatar.src = ''
    state.actions.button.style.display = 'none'

    state.fieldCards.player.style.display = 'none'
    state.fieldCards.computer.style.display = 'none'

    state.actions.nextImg.style.display = 'block'
    state.actions.previousImg.style.display = 'block'

    init(5)
}

async function playAudio(status) {
    const audio = new Audio(`./src/assets/audios/${status}.wav`)
    try {
        audio.play()
    } catch(error) {
        console.log(error);
    }
}

async function stopAudio() {
    const icon = document.querySelector('label#checkVolumeLabel i')
    const bgm = document.getElementById('bgm')
    if(state.actions.checkVolumeInput.hasAttribute('checked')) {
        icon.classList.remove('fa-volume-high') 
        icon.classList.add('fa-volume-xmark')
        state.actions.checkVolumeInput.removeAttribute('checked')
        bgm.pause()
    } else {
        state.actions.checkVolumeInput.setAttribute('checked', 'checked')
        icon.classList.add('fa-volume-high') 
        icon.classList.remove('fa-volume-xmark')
        bgm.play()
    } 
}

function previousImage() {
    const imgWidth = state.playerSides.player1BOX.offsetWidth
    state.playerSides.player1BOX.scrollLeft -= imgWidth
}

function nextImage() {
    const imgWidth = state.playerSides.player1BOX.offsetWidth
    state.playerSides.player1BOX.scrollLeft += imgWidth
}


function init() {
    showHiddenCardFieldsImages(false)

    drawCards(cardData.length, playerSides.player1)
    drawCards(cardData.length, playerSides.computer)

    const bgm = document.getElementById('bgm')
    bgm.play()
}

init()

state.actions.nextImg.addEventListener('click', nextImage)
state.actions.previousImg.addEventListener('click', previousImage)
state.actions.button.addEventListener('click', resetDuel)
state.actions.checkVolumeInput.addEventListener('click', stopAudio)
