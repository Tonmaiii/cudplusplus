const scripts = [
    'src/networkMonitor.js',
    'src/requestHandler.js',
    'src/makeHomeworkTable.js'
]

scripts.forEach(script => {
    const scriptElement = document.createElement('script')
    scriptElement.src = chrome.runtime.getURL(script)
    document.body.appendChild(scriptElement)
})
