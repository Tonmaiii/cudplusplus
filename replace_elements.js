const defaultImageURL =
    'https://oss-cudplus-own.s3.ap-southeast-1.amazonaws.com/FQsvhVlPNMbq8tdgCs0m_3_2020_05_03_033743/cud_plus_logo.svg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA5OEOOMBR3OZRLCT6%2F20211125%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20211125T075231Z&X-Amz-SignedHeaders=host&X-Amz-Expires=600000&X-Amz-Signature=f6add907710f89919c29c5dd406417a74f6a1404356a0fc4171da988e44ae869'

setInterval(() => {
    Array.from(document.getElementsByTagName('*')).forEach(element => {
        element.tagName === 'IMG' &&
            element.src === defaultImageURL &&
            (element.src = chrome.runtime.getURL('cud_plus_logo_dark.svg'))

        element.style.color === 'windowtext' &&
            (element.style.color = '#ffffff')
    })
})
