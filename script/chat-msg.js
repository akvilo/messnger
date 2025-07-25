const inputMsg = document.querySelector('.chat__panel-input')
const btnSendMsg = document.querySelector('.chat__panel-send-msg')
const chatMsg = document.querySelector('.chat__messages')
const chatUserMsg = document.querySelector('.chat__messages-user')
let userMsg = document.querySelectorAll('.chat__messages-user-wrapper')

userMessages = []

class Message {
    constructor(id, chatId, text, date) {
        this.id = id
        this.chatId = chatId
        this.text = text
        this.date = date
    }
}

sendMsg = function() {

    const date = new Date()  

    function getMsgTime() {
        const hours = date.getHours()
        const minutes = date.getMinutes() <10 ? `0${date.getMinutes()}` : date.getMinutes()
        return `${hours}:${minutes}`
    }

    const userSendText = inputMsg.value
    if (userSendText.trim() !== '') {
        chatUserMsg.insertAdjacentHTML('beforeend', `
        <div class = "chat__messages-user-wrapper">
            <div class="chat__messages-user-msg">
                <span class = "chat__user-msg">${userSendText}</span>
            </div>
            <span class="chat__user-messages-time">${getMsgTime()}</span>
        </div>`) 
        inputMsg.value = ''

        const messageData = new Message(userMessages.length, localStorage.getItem('activeChatId'), userSendText, getMsgTime())
        const lastUserMsg = document.querySelectorAll('.chats__last-user-message')
        const lastUserTime = document.querySelectorAll('.chats__last-user-time')
        lastUserTime[localStorage.getItem("activeChatId")].textContent = getMsgTime()

        if (userSendText.length<24) {
            lastUserMsg[localStorage.getItem("activeChatId")].textContent = userSendText
            userMessages.push(messageData)
        }
        else {
            lastUserMsg[localStorage.getItem("activeChatId")].textContent = 'Сообщение'
        }
    }
    userMsg = document.querySelectorAll('.chat__messages-user-msg')
}

btnSendMsg.onclick = () => sendMsg()


document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && event.shiftKey !== true) {
        sendMsg()
    }
    else if (event.key === 'Escape') {
        chatListUser.forEach(chats => {
            chats.classList.remove('active')
        })
    }

    checkingActiveChats()
})


userMsg.forEach(msg => {
    msg.addEventListener('click', () => {
        console.log('Клик по сообщению:', msg.textContent)
    })
})