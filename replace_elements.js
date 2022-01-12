setInterval(() => {
    Array.from(document.getElementsByTagName('*')).forEach(element => {
        element.tagName === 'IMG' &&
            element.src === defaultImageURL &&
            (element.src = chrome.runtime.getURL('cud_plus_logo_dark.svg'))

        if (element.style.color === 'windowtext' && !element.inverted) {
            element.style.color = 'white'
            element.inverted = true
        }

        if (element.tagName === 'SPAN' && !element.inverted) {
            element.style.color &&
                (element.style.color = invertColor(element.style.color))
            element.style['background-color'] &&
                (element.style['background-color'] = invertColor(
                    element.style['background-color']
                ))
            element.inverted = true
        }
    })
})

const defaultImageURL =
    'https://oss-cudplus-own.s3.ap-southeast-1.amazonaws.com/FQsvhVlPNMbq8tdgCs0m_3_2020_05_03_033743/cud_plus_logo.svg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA5OEOOMBR3OZRLCT6%2F20220105%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20220105T235240Z&X-Amz-SignedHeaders=host&X-Amz-Expires=600000&X-Amz-Signature=c6faf6bba5d5eae1cc062852b2d03248d9eb5a91c93c1be6bc2e27d1a6915116'

const rgbaExpand = rgba =>
    rgba
        .match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/)
        .slice(1)
        .map(n => (n === undefined ? 1 : parseFloat(n)))

const hexExpand = hex => {
    const values = hex
        .match(
            /^#(?:(?:([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])?)|(?:([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})(?:([0-9a-f]){2})?))$/i
        )
        .slice(1)
        .filter(n => n !== undefined)
    values[3] = 0xff
    return values
        .map((n, i) => (i === 3 ? n / 0xff : parseInt(n, 16)))
        .filter(n => n !== undefined)
}

const getColor = color => {
    if (color.match(/rgba?/)) return rgbaExpand(color)
    else if (color.match(/#/)) return hexExpand(color)
    else return hexExpand(cssColors[color])
}

const invertColor = inputColor => {
    const color = getColor(inputColor)
    color[0] = map(color[0], 0x0, 0xff, 0xff, 0x20)
    color[1] = map(color[1], 0x0, 0xff, 0xff, 0x20)
    color[2] = map(color[2], 0x0, 0xff, 0xff, 0x24)
    return `rgba(${color})`
}

const map = (value, start1, stop1, start2, stop2) =>
    ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2
