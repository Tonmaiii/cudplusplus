const makeHomeworkTable = homeworks => {
    const homeworkTableBody = document.querySelector('.table > tbody')
    homeworkTableBody.innerHTML = ''
    homeworks.forEach(homework => {
        const row = homeworkTableBody.insertRow()

        row.appendChild(newCell()).appendChild(
            profile(homework.course.course_logo)
        )
        row.appendChild(newCell()).appendChild(text(homework.course.name))
        row.appendChild(newCell()).appendChild(text(homework.name))
        row.appendChild(newCell()).appendChild(
            text(formatDate(homework.out_date))
        )
        row.appendChild(newCell()).appendChild(
            text(formatDate(homework.due_date))
        )
        row.appendChild(newCell()).appendChild(
            text(homework.submissions[0]?.created_at || 'Not Submitted')
        )
        row.appendChild(newCell()).appendChild(
            text(
                homework.submissions[0]
                    ? homework.homework_scores[0]?.created_at || 'Not Checked'
                    : '-'
            )
        )
        row.appendChild(newCell()).appendChild(
            clipboardLink(
                `https://cudplus.onsmart.school/lms/homework?page=content&homework=${homework.id}&course=${homework.course_id}`
            )
        )
    })
}

const newCell = () => {
    const cell = document.createElement('td')
    cell.classList.add('text-center')
    return cell
}

const profile = src => {
    const div = document.createElement('div')
    div.classList.add('ss-component')
    div.classList.add('ss-profile-widget')
    const img = document.createElement('img')
    img.classList.add('ss-profile-img')
    img.src = src
    div.appendChild(img)
    return div
}

const text = text => {
    const div = document.createElement('div')
    div.classList.add('py-3')
    div.textContent = text
    return div
}

const clipboardLink = href => {
    const a = document.createElement('a')
    a.href = href
    a.target = '_blank'
    a.title = 'Go to homework'
    a.classList.add('btn')
    a.classList.add('ss-component')
    a.classList.add('ss-fa-button')
    a.classList.add('ss-color-0')
    a.classList.add('ss-text-color-1')
    a.classList.add('ss-circle')
    a.classList.add('ss-lg')
    a.classList.add('m-0')
    const i = document.createElement('i')
    i.classList.add('fa')
    i.classList.add('fa-clipboard-list')
    a.appendChild(i)
    return a
}

const formatDate = (date, includeTime = false, twoDigitYear = true) => {
    const [year, month, day, hour, minute, second] = date
        .match(/(\d\d\d\d)-(\d\d)-(\d\d) (\d\d):(\d\d):(\d\d)/)
        .slice(1)
        .map((n, i) => parseInt(n))
    if (includeTime) {
        return `${day} ${months[month - 1]} ${
            twoDigitYear ? year % 100 : year
        } ${hour}:${minute}:${second}`
    } else {
        return `${day} ${months[month - 1]} ${twoDigitYear ? year % 100 : year}`
    }
}

const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
]
