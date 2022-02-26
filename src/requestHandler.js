const onResponseReceive = async (url, headers, body) => {
    if (url.match(/\/ajax\/lms\/userhomeworks\//)) {
        const newUrl = url.replace(
            /\/ajax\/lms\/userhomeworks\/(\d+)/,
            '/ajax/lms/userhomeworks/1000000'
        )
        const { data } = await (await fetch(newUrl)).json()
        const homeworks = data.homeworks.data
        const language = data.user.language_id
        makeHomeworkTable(homeworks, language)
    }
}
