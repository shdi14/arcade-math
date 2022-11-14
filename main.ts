namespace SpriteKind {
    export const Arrow = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (parseInputNumber(input2.count, currentOrder) < 9) {
        music.footstep.play()
        input2.count += 1 * 10 ** (2 - currentOrder)
    } else {
        music.knock.play()
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (solution == input2.count) {
        music.powerUp.play()
        info.changeScoreBy(1)
        blockSettings.writeNumber("score", info.score())
        input2.setDigitColor(7)
        pause(500)
        input2.count = 0
        input2.setDigitColor(11)
        solution = updateEquation(equationView, signView)
    } else {
        music.powerDown.play()
        input2.setDigitColor(2)
        pause(500)
        input2.count = 0
        input2.setDigitColor(11)
    }
})
function updateEquation (equationView: DigitCounter[], signView: TextSprite[]) {
    newEquation = randomEquation(20)
    equationView[0].count = newEquation[1]
    equationView[1].count = newEquation[2]
    if (newEquation[0] == 0) {
        sign = "-"
        solution = newEquation[1] - newEquation[2]
    } else {
        sign = "+"
        solution = newEquation[1] + newEquation[2]
    }
    signView[0].setText(sign)
    return solution
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    music.beamUp.play()
    input2.count = 0
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
function randomEquation (maxNumber: number) {
    equation = [0, 0, 0]
    equation[0] = randint(0, 1)
    if (equation[0] == 0) {
        while (equation[1] <= equation[2]) {
            equation[1] = randint(1, maxNumber)
            equation[2] = randint(1, maxNumber)
            console.logValue("equation", "" + convertToText(equation[1]) + "-" + convertToText(equation[2]))
        }
    } else {
        equation[1] = randint(1, maxNumber)
        equation[2] = randint(1, maxNumber)
    }
    return equation
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
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (parseInputNumber(input2.count, currentOrder) > 0) {
        music.footstep.play()
        input2.count += -1 * 10 ** (2 - currentOrder)
    } else {
        music.knock.play()
    }
})
function drawEquation (equation: number[]) {
    equationViewReturn = []
    var1 = drawSevenseg(-40, -20, 7, equation[1], 2)
    equationViewReturn.push(var1)
    var2 = drawSevenseg(40, -20, 7, equation[2], 2)
    equationViewReturn.push(var2)
    return equationViewReturn
}
function drawTextSprite (x: number, y: number, color2: number, text: string) {
    textSprite = [textsprite.create(text, 0, color2)]
    textSprite[0].setMaxFontHeight(20)
    textSprite[0].setPosition(x, y)
    return textSprite
}
let textSprite: TextSprite[] = []
let var2: DigitCounter = null
let var1: DigitCounter = null
let equationViewReturn: DigitCounter[] = []
let inputValues: number[] = []
let myCounter: DigitCounter = null
let arrows: Sprite[] = []
let newEquation: number[] = []
let signView: TextSprite[] = []
let solution = 0
let sign = ""
let currentOrder = 0
let arrows_2: Sprite[] = []
let input2: DigitCounter = null
let equationView: DigitCounter[] = []
let equation: number[] = []
info.setScore(0)
equation = randomEquation(20)
equationView = drawEquation(equation)
input2 = drawSevenseg(0, 30, 11, 0, 3)
arrows_2 = drawArrowSprite(-1, 30)
currentOrder = 1
if (equation[0] == 0) {
    sign = "-"
    solution = equation[1] - equation[2]
} else {
    sign = "+"
    solution = equation[1] + equation[2]
}
signView = drawTextSprite(80, 40, 5, sign)
