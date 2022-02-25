setInterval(() => {
    Array.from(document.getElementsByTagName('*')).forEach(async element => {
        element.tagName === 'IMG' &&
            element.src === defaultImageURL &&
            (element.src = chrome.runtime.getURL('cud_plus_logo_dark.svg'))

        if (element.style.color === 'windowtext' && !element.inverted) {
            element.style.color = 'white'
            element.inverted = true
        }

        if (element.tagName === 'SPAN' && !element.inverted) {
            invert(element)
            element.inverted = true
        }
    })
})

const invert = element => {
    element.style.color &&
        (element.style.color = invertColor(element.style.color))
    element.style['background-color'] &&
        (element.style['background-color'] = invertColor(
            element.style['background-color']
        ))
}

const invertColor = inputColor => {
    if (inputColor === 'transparent') return 'transparent'
    const color = getColor(inputColor)
    color[0] = map(color[0], 0x0, 0xff, 0xff, 0x20)
    color[1] = map(color[1], 0x0, 0xff, 0xff, 0x20)
    color[2] = map(color[2], 0x0, 0xff, 0xff, 0x24)
    return `rgba(${color})`
}

const map = (value, start1, stop1, start2, stop2) =>
    ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2

const getColor = color => {
    if (color.match(/rgba?/)) return rgbaExpand(color)
    else if (color.match(/#/)) return hexExpand(color)
    else return hexExpand(cssColors[color])
}

const rgbaExpand = rgba =>
    rgba
        .match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/)
        .slice(1)
        .map(n => (n === undefined ? 1 : parseFloat(n)))

const hexExpand = hex => {
    const a = hex
        .match(
            /^#(?:(?:([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])?)|(?:([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})(?:([0-9a-f]){2})?))$/i
        )
        .slice(1)
        .filter(n => n !== undefined)
    a[3] === undefined && (a[3] = 'ff')
    const b = a.map(n => parseInt(n, 16))
    b[3] /= 0xff
    return b
}

let defaultImageURL
chrome.storage.local.get(
    ['defaultImageURL'],
    data => (defaultImageURL = data.defaultImageURL)
)
