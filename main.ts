namespace SpriteKind {
    export const Arrow = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    music.beamUp.play()
    input2.count = 0
    blockSettings.clear()
    max = 2
    generateArrayOfHASH()
    randomEquation()
    firstView.count = first
    secondView.count = second
    signView.setText(signToText)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (solution == input2.count) {
        music.powerUp.play()
        input2.setDigitColor(7)
        pause(500)
        blockSettings.writeNumberArray(randomHASHtoText, [level + 1, 2 ** (level + 1)])
        updateStatsView()
        input2.count = 0
        input2.setDigitColor(11)
        info.changeScoreBy(1)
        randomEquation()
        firstView.count = first
        secondView.count = second
        signView.setText(signToText)
    } else {
        music.powerDown.play()
        input2.setDigitColor(2)
        pause(500)
        input2.setDigitColor(11)
    }
})
function drawArrowSprite (x: number, y: number) {
    arrows = [sprites.create(assets.image`up`, SpriteKind.Arrow), sprites.create(assets.image`down`, SpriteKind.Arrow)]
    arrows[0].x += x
    arrows[0].y += y + -26
    arrows[1].x += x
    arrows[1].y += y + 26
    return arrows
}
function drawSevenseg (x: number, y: number, color2: number, num: number, seg: number) {
    myCounter = sevenseg.createCounter(SegmentStyle.Thick, SegmentScale.Full, seg)
    myCounter.count = num
    myCounter.setDigitColor(color2)
    myCounter.x += x
    myCounter.y += y
    return myCounter
}
function parseInputNumber (inputValue: number, currentOrder: number) {
    inputValues = [0, 0, 0]
    inputValues[0] = Math.floor(inputValue / 100)
    inputValues[1] = Math.floor(inputValue % 100 / 10)
    inputValues[2] = inputValue % 100 % 10
    return inputValues[currentOrder]
}
function randomEquation () {
    leftToRepeat = 1
    while (leftToRepeat > 0) {
        sign = randint(0, 1)
        if (sign == 0) {
            signToText = "-"
            while (first <= second) {
                first = randint(1, max)
                second = randint(1, max)
            }
            solution = first - second
        } else {
            signToText = "+"
            first = randint(1, max)
            second = randint(1, max)
            solution = first + second
        }
        randomHASH = first * second + 10000 ** sign
        randomHASHtoText = convertToText(randomHASH)
        HASH = blockSettings.readNumberArray(randomHASHtoText)
        level = HASH[0]
        leftToRepeat = HASH[1]
        if (leftToRepeat > 0) {
            blockSettings.writeNumberArray(randomHASHtoText, [level, leftToRepeat - 1])
        }
    }
}
function generateArrayOfHASH () {
    for (let first = 0; first <= max; first++) {
        for (let second = 0; second <= max; second++) {
            for (let sign = 0; sign <= 1; sign++) {
                if (first > 0 && second > 0 && !(first == second && sign == 0)) {
                    randomHASHtoText = convertToText(first * second + 10000 ** sign)
                    if (!(blockSettings.exists(randomHASHtoText))) {
                        blockSettings.writeNumberArray(randomHASHtoText, [0, 0])
                    }
                }
            }
        }
    }
    updateStatsView()
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (currentOrder > 0) {
        music.footstep.play()
        currentOrder += -1
        arrows_2[0].setPosition(60 + 20 * currentOrder, 64)
        arrows_2[1].setPosition(60 + 20 * currentOrder, 116)
    } else {
        music.knock.play()
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    music.footstep.play()
    if (parseInputNumber(input2.count, currentOrder) < 9) {
        input2.count += 1 * 10 ** (2 - currentOrder)
    } else {
        input2.count += -9 * 10 ** (2 - currentOrder)
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (currentOrder < 2) {
        music.footstep.play()
        currentOrder += 1
        arrows_2[0].setPosition(60 + 20 * currentOrder, 64)
        arrows_2[1].setPosition(60 + 20 * currentOrder, 116)
    } else {
        music.knock.play()
    }
})
function drawTextSprite (x: number, y: number, color2: number, text: string, fontSize: number) {
    textSprite = textsprite.create(text, 0, color2)
    textSprite.setMaxFontHeight(fontSize)
    textSprite.left = x
    textSprite.top = y
    return textSprite
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    music.footstep.play()
    if (parseInputNumber(input2.count, currentOrder) > 0) {
        input2.count += -1 * 10 ** (2 - currentOrder)
    } else {
        input2.count += 9 * 10 ** (2 - currentOrder)
    }
})
function updateStatsView () {
    counter = [0]
    listOfHASH = blockSettings.list()
    countOfHASHes = listOfHASH.length - 1
    DEBUG = []
    DEBUG2 = []
    for (let index = 0; index <= countOfHASHes; index++) {
        HASH = blockSettings.readNumberArray(listOfHASH[index])
        level = HASH[0]
        while (counter.length - 1 < level) {
            counter.push(0)
        }
        counter[level] = counter[level] + 1
        if (level == 0) {
            DEBUG.push(listOfHASH[index])
            DEBUG2.push(HASH)
        }
    }
    stats = convertToText(counter[0])
    for (let index = 0; index <= counter.length - 1; index++) {
        if (index > 0) {
            stats = "" + stats + "|" + counter[index]
        }
    }
    if (lastCountOfHASHes < countOfHASHes) {
        stats = "" + stats + " +" + counter[0]
        lastCountOfHASHes = countOfHASHes
    }
    statsSpriteToArray.setText(stats)
    if (counter[0] == 0) {
        max = max + 1
        generateArrayOfHASH()
    }
}
let stats = ""
let DEBUG2: number[][] = []
let DEBUG: string[] = []
let listOfHASH: string[] = []
let counter: number[] = []
let textSprite: TextSprite = null
let leftToRepeat = 0
let inputValues: number[] = []
let myCounter: DigitCounter = null
let arrows: Sprite[] = []
let level = 0
let currentOrder = 0
let statsSpriteToArray: TextSprite = null
let arrows_2: Sprite[] = []
let input2: DigitCounter = null
let signView: TextSprite = null
let secondView: DigitCounter = null
let firstView: DigitCounter = null
let HASH: number[] = []
let solution = 0
let signToText = ""
let sign = 0
let second = 0
let first = 0
let randomHASHtoText = ""
let randomHASH = 0
let max = 0
let lastCountOfHASHes = 0
let countOfHASHes = 0
info.setScore(0)
countOfHASHes = blockSettings.list().length - 1
lastCountOfHASHes = countOfHASHes
max = Math.sqrt(parseFloat(blockSettings.list()[lastCountOfHASHes]) - 10000)
randomHASH = 0
randomHASHtoText = ""
first = 0
second = 0
sign = 0
signToText = "+"
solution = 0
HASH = []
randomEquation()
firstView = drawSevenseg(-40, -20, 7, first, 2)
secondView = drawSevenseg(40, -20, 7, second, 2)
signView = drawTextSprite(70, 30, 5, signToText, 20)
input2 = drawSevenseg(0, 30, 11, 0, 3)
arrows_2 = drawArrowSprite(-1, 30)
statsSpriteToArray = drawTextSprite(0, 0, 5, "", 0)
updateStatsView()
currentOrder = 1
signView = drawTextSprite(70, 30, 5, signToText, 20)
