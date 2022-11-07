namespace SpriteKind {
    export const arrow = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (result[curDigit].value < 9) {
        result[curDigit].value += 1
        result_val += 1 * 10 ** (2 - curDigit)
        console.logValue("inputResult: ", convertToText(result_val))
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    for (let index = 0; index <= result.length - 1; index++) {
        result[index].value = 0
    }
    result_val = 0
    first_val = randint(1, 20)
    first.count = first_val
    second_val = randint(1, 20)
    second.count = second_val
    console.logValue("correctResult: ", convertToText(first.count + second.count))
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    console.logValue("inputResult: ", convertToText(result_val))
    if (first.count + second.count == result_val) {
        info.changeScoreBy(1)
        for (let index = 0; index <= result.length - 1; index++) {
            result[index].setDigitColor(7)
        }
        pause(500)
        for (let index = 0; index <= result.length - 1; index++) {
            result[index].value = 0
            result[index].setDigitColor(11)
        }
        result_val = 0
        first_val = randint(1, 20)
        first.count = first_val
        second_val = randint(1, 20)
        second.count = second_val
        console.logValue("correctResult: ", convertToText(first.count + second.count))
    } else {
        info.changeScoreBy(-1)
        for (let index = 0; index <= result.length - 1; index++) {
            result[index].setDigitColor(2)
        }
        pause(500)
        for (let index = 0; index <= result.length - 1; index++) {
            result[index].setDigitColor(11)
        }
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (curDigit > 0) {
        curDigit += -1
        up.setPosition(60 + 20 * curDigit, 64)
        down.setPosition(60 + 20 * curDigit, 116)
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (curDigit < 2) {
        curDigit += 1
        up.setPosition(60 + 20 * curDigit, 64)
        down.setPosition(60 + 20 * curDigit, 116)
    }
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (result[curDigit].value > 0) {
        result[curDigit].value += -1
        result_val += -1 * 10 ** (2 - curDigit)
        console.logValue("inputResult: ", convertToText(result_val))
    }
})
let result_val = 0
let result: SevenSegDigit[] = []
let curDigit = 0
let down: Sprite = null
let up: Sprite = null
let second_val = 0
let second: DigitCounter = null
let first_val = 0
let first: DigitCounter = null
first = sevenseg.createCounter(SegmentStyle.Thick, SegmentScale.Full, 2)
first_val = randint(1, 20)
first.count = first_val
first.setDigitColor(7)
first.x += -40
first.y += -20
second = sevenseg.createCounter(SegmentStyle.Thick, SegmentScale.Full, 2)
second_val = randint(1, 20)
second.count = second_val
second.setDigitColor(7)
second.x += 40
second.y += -20
let textSprite = textsprite.create("+", 15, 5)
textSprite.setPosition(73, 34)
textSprite.setMaxFontHeight(20)
up = sprites.create(assets.image`up`, SpriteKind.arrow)
down = sprites.create(assets.image`down`, SpriteKind.arrow)
up.setPosition(60, 64)
down.setPosition(60, 116)
curDigit = 0
result = [sevenseg.createDigit(), sevenseg.createDigit(), sevenseg.createDigit()]
for (let index = 0; index <= result.length - 1; index++) {
    result[index].setDigitColor(11)
    result[index].y += 30
    result[index].x += -20 + 20 * index
}
info.setScore(0)
result_val = 0
console.logValue("correctResult: ", convertToText(first.count + second.count))
