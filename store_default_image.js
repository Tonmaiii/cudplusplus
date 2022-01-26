const loop = setInterval(() => {
    const url = document.getElementsByClassName('ss-profile-img')[1].src
    if (url && !url.match(/cud_plus_logo_dark\.svg/)) {
        chrome.storage.local.set({ defaultImageURL: url })
        clearInterval(loop)
    }
})
