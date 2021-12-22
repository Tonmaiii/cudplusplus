const defaultImageURL =
    'https://oss-cudplus-own.s3.ap-southeast-1.amazonaws.com/FQsvhVlPNMbq8tdgCs0m_3_2020_05_03_033743/cud_plus_logo.svg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA5OEOOMBR3OZRLCT6%2F20211202%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20211202T063231Z&X-Amz-SignedHeaders=host&X-Amz-Expires=600000&X-Amz-Signature=b429a406ac58c411f895c1067643bcb3fd264ed5f13db6e85e3d63135b3e2c50'

const rgbaExpand = rgba =>
    rgba
        .match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/)
        .slice(1)
        .map(n => (n === undefined ? 1 : parseFloat(n)))

const hexExpand = hex =>
    hex
        .match(
            /^#(?:(?:([1-9a-f])([1-9a-f])([1-9a-f])([1-9a-f])?)|(?:([1-9a-f]{2})([1-9a-f]{2})([1-9a-f]{2})(?:([1-9a-f]){2})?))$/i
        )
        .slice(1)
        .filter(n => n !== undefined)
        .push(undefined)
        .map((n, i) => (i === 3 ? n / 0xff || 1 : parseInt(n, 16)))
        .filter(n => n !== undefined)

setInterval(() => {
    Array.from(document.getElementsByTagName('*')).forEach(element => {
        element.tagName === 'IMG' &&
            element.src === defaultImageURL &&
            (element.src = chrome.runtime.getURL('cud_plus_logo_dark.svg'))

        element.style.color === 'windowtext' && (element.style.color = 'white')

        if (element.tagName === 'SPAN') {
            ;['black', 'rgb(0, 0, 0)', '#ffffff', '#fff'].includes(
                element.style.color
            ) && (element.style.color = 'white')
        }
    })
})
