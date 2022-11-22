namespace SpriteKind {
    export const Arrow = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    music.footstep.play()
    if (parseInputNumber(input2.count, currentOrder) < 9) {
        input2.count += 1 * 10 ** (2 - currentOrder)
    } else {
        input2.count += -9 * 10 ** (2 - currentOrder)
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    music.beamUp.play()
    input2.count = 0
    blockSettings.clear()
    max = 2
    generateArrayOfHASH()
    randomEquation()
    firstView.count = first2
    secondView.count = second2
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
        firstView.count = first2
        secondView.count = second2
        signView.setText(signToText)
    } else {
        music.powerDown.play()
        input2.setDigitColor(2)
        pause(500)
        input2.setDigitColor(11)
    }
})
function drawArrowSprite (currentOrder: number) {
    up.left = 50 + 21 * currentOrder
    up.top = 51
    down.left = 50 + 21 * currentOrder
    down.top = 103
}
function drawSevenseg (x: number, y: number, color2: number, num: number, seg: number) {
    myCounter = sevenseg.createCounter(SegmentStyle.Thick, SegmentScale.Full, seg)
    myCounter.count = num
    myCounter.setDigitColor(color2)
    myCounter.x += x
    myCounter.y += y
    return myCounter
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (currentOrder > 0) {
        music.footstep.play()
        currentOrder += -1
        drawArrowSprite(currentOrder)
    } else {
        music.knock.play()
    }
})
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
        sign2 = randint(0, 1)
        if (sign2 == 0) {
            signToText = "-"
            while (first2 <= second2) {
                first2 = randint(1, max)
                second2 = randint(1, max)
            }
            solution = first2 - second2
        } else {
            signToText = "+"
            first2 = randint(1, max)
            second2 = randint(1, max)
            solution = first2 + second2
        }
        randomHASH = first2 * second2 + 1000 ** sign2
        randomHASHtoText = convertToText(randomHASH)
        HASH = blockSettings.readNumberArray(randomHASHtoText)
        level = HASH[0]
        leftToRepeat = HASH[1]
        if (leftToRepeat > 0) {
            blockSettings.writeNumberArray(randomHASHtoText, [level, leftToRepeat - 1])
        }
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (currentOrder < 2) {
        music.footstep.play()
        currentOrder += 1
        drawArrowSprite(currentOrder)
    } else {
        music.knock.play()
    }
})
function generateArrayOfHASH () {
    for (let first = 0; first <= max; first++) {
        for (let second = 0; second <= max; second++) {
            for (let sign = 0; sign <= 1; sign++) {
                if (first > 0 && second > 0 && !(first == second && sign == 0)) {
                    randomHASHtoText = convertToText(first * second + 1000 ** sign)
                    if (!(blockSettings.exists(randomHASHtoText))) {
                        blockSettings.writeNumberArray(randomHASHtoText, [0, 0])
                    }
                }
            }
        }
    }
    updateStatsView()
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    music.footstep.play()
    if (parseInputNumber(input2.count, currentOrder) > 0) {
        input2.count += -1 * 10 ** (2 - currentOrder)
    } else {
        input2.count += 9 * 10 ** (2 - currentOrder)
    }
})
function drawTextSprite (x: number, y: number, color2: number, text: string, fontSize: number) {
    textSprite = textsprite.create(text, 0, color2)
    textSprite.setMaxFontHeight(fontSize)
    textSprite.left = x
    textSprite.top = y
    return textSprite
}
function updateStatsView () {
    counter = [0]
    listOfHASH = blockSettings.list()
    countOfHASHes = listOfHASH.length - 1
    for (let index = 0; index <= countOfHASHes; index++) {
        HASH = blockSettings.readNumberArray(listOfHASH[index])
        level = HASH[0]
        while (counter.length - 1 < level) {
            counter.push(0)
        }
        counter[level] = counter[level] + 1
    }
    stats = convertToText(counter[0])
    for (let index2 = 0; index2 <= counter.length - 1; index2++) {
        if (index2 > 0) {
            stats = "" + stats + "|" + counter[index2]
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
let listOfHASH: string[] = []
let counter: number[] = []
let textSprite: TextSprite = null
let leftToRepeat = 0
let inputValues: number[] = []
let myCounter: DigitCounter = null
let level = 0
let currentOrder = 0
let statsSpriteToArray: TextSprite = null
let down: Sprite = null
let up: Sprite = null
let input2: DigitCounter = null
let signView: TextSprite = null
let secondView: DigitCounter = null
let firstView: DigitCounter = null
let max = 0
let lastCountOfHASHes = 0
let countOfHASHes = 0
let HASH: number[] = []
let solution = 0
let signToText = ""
let sign2 = 0
let second2 = 0
let first2 = 0
let randomHASHtoText = ""
let randomHASH = 0
info.setScore(0)
randomHASH = 0
randomHASHtoText = ""
first2 = 1
second2 = 1
sign2 = 1
signToText = "+"
solution = 2
HASH = []
if (blockSettings.list().length - 1 != -1) {
    countOfHASHes = blockSettings.list().length - 1
    lastCountOfHASHes = countOfHASHes
    max = Math.sqrt(parseFloat(blockSettings.list()[lastCountOfHASHes]) - 1000)
} else {
    max = 2
    generateArrayOfHASH()
}
randomEquation()
firstView = drawSevenseg(-40, -20, 7, first2, 2)
secondView = drawSevenseg(40, -20, 7, second2, 2)
signView = drawTextSprite(70, 30, 5, signToText, 20)
input2 = drawSevenseg(0, 25, 11, 0, 3)
up = sprites.create(assets.image`up`, SpriteKind.Arrow)
down = sprites.create(assets.image`down`, SpriteKind.Arrow)
drawArrowSprite(1)
statsSpriteToArray = drawTextSprite(0, 0, 5, "", 0)
updateStatsView()
currentOrder = 1
signView = drawTextSprite(70, 30, 5, signToText, 20)
