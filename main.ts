namespace SpriteKind {
    export const Arrow = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (parseInputNumber(input2.count, currentOrder) < 9) {
        music.footstep.play()
        input2.count += 1 * 10 ** (2 - currentOrder)
    } else {
        music.knock.play()
        input2.count += -9 * 10 ** (2 - currentOrder)
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    music.beamUp.play()
    input2.count = 0
    blockSettings.clear()
    updateStatsView()
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
function generateArrayOfHASH () {
    for (let first = 0; first <= max; first++) {
        for (let second = 0; second <= max; second++) {
            for (let sign = 0; sign <= 1; sign++) {
                randomHASHtoText = convertToText(first * second + 10000 ** sign)
                if (!(blockSettings.exists(randomHASHtoText))) {
                    blockSettings.writeNumberArray(randomHASHtoText, [0, 0])
                }
            }
        }
    }
    updateStatsView()
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (parseInputNumber(input2.count, currentOrder) > 0) {
        music.footstep.play()
        input2.count += -1 * 10 ** (2 - currentOrder)
    } else {
        music.knock.play()
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
    for (let index = 0; index <= listOfHASH.length - 1; index++) {
        HASH = blockSettings.readNumberArray(listOfHASH[index])
        level = HASH[0]
        while (counter.length - 1 < level) {
            counter.push(0)
        }
        counter[level] = counter[level] + 1
        if (level > 3) {
        	
        }
    }
    stats = convertToText(counter[0])
    if (counter[0] == 0) {
        max = max + 1
        generateArrayOfHASH()
    }
    for (let index = 0; index <= counter.length - 1; index++) {
        if (index > 0) {
            stats = "" + stats + "|" + counter[index]
        }
    }
    statsSpriteToArray.setText(stats)
}
let stats = ""
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
info.setScore(0)
max = 5
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
