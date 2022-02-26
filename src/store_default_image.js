const url = document.querySelector('.ss-profile-img:nth-child(2)').src
url.match(/cud_plus_logo_dark/) ||
    chrome.storage.local.set({ defaultImageURL: url })
