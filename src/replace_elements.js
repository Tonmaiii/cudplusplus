;(async () => {
    const cssColors = await (
        await fetch(chrome.runtime.getURL('assets/colors.json'))
    ).json()

    document.body.addEventListener('DOMNodeInserted', e => {
        e.target.querySelectorAll &&
            e.target.querySelectorAll('*').forEach(element => {
                if (element.style?.color === 'windowtext')
                    element.style.color = 'white'
                element.tagName === 'SPAN' && invert(element)
            })
    })

    const invert = element => {
        if (getColor(element.style.color)?.every((c, i) => c === 0 || i === 3))
            element.style.color = 'white'
        else
            element.style.color &&
                (element.style.color = invertColor(element.style.color))

        if (
            getColor(element.style['background-color'])?.every((c, i) => {
                return c === 0xff || i === 3
            })
        )
            element.style['background-color'] = '#202024'
        else
            element.style['background-color'] &&
                (element.style['background-color'] = invertColor(
                    element.style['background-color']
                ))
    }

    const invertColor = inputColor => {
        if (inputColor === 'transparent') return 'transparent'
        const r = 0x20
        const g = 0x20
        const b = 0x24
        const color = getColor(inputColor)
        color[0] = map(color[0], 0x0, 0xff, 0xff, r)
        color[1] = map(color[1], 0x0, 0xff, 0xff, g)
        color[2] = map(color[2], 0x0, 0xff, 0xff, b)
        return `rgba(${color})`
    }

    const map = (value, start1, stop1, start2, stop2) =>
        ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2

    const getColor = color => {
        if (color.match(/rgba?/)) return rgbaExpand(color)
        else if (color.match(/#/)) return hexExpand(color)
        else
            try {
                return hexExpand(cssColors[color])
            } catch (e) {
                return null
            }
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
})()

let defaultImageURL
chrome.storage.local.get(['defaultImageURL'], data => {
    defaultImageURL = data.defaultImageURL
    const newImageURL = chrome.runtime.getURL('assets/cud_plus_logo_dark.svg')
    let loaded = false
    document.addEventListener('DOMContentLoaded', () => (loaded = true))
    const updater = () => {
        document.querySelectorAll('img').forEach(element => {
            if (element.src === defaultImageURL) element.src = newImageURL
        })
        loaded || requestAnimationFrame(updater)
    }
    requestAnimationFrame(updater)
})
