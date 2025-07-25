const chatList = document.querySelector('.chats__list')
const inactiveChats = document.querySelector('.inactive-chat')
const activeChats = document.querySelector('.chat')
const chatPanel = document.querySelector('.chats')
const chatStatus = document.querySelector('.chat-info__interlocutor-status')
chats = [
    {
        name: 'Злата',
        avatar: '/image/photo_2025-06-26_20-37-19.jpg',
        id: 0,
        type: 'local'
    },
    {
        name: 'Владос',
        avatar: null,
        id: 1,
        type: 'local'

    },
    {
        name: 'akvilo',
        avatar: '/image/photo_2024-11-23_00-24-52.jpg',
        id: 2,
        type: 'local'
    }
    
]



function renderChats() {
    chatList.innerHTML = ''
    for(let i = 0; i<chats.length; i++) {
        chatList.insertAdjacentHTML('beforeend', `
        <div class="chats__user" data-index = ${i}>
            <div class="chats__user-avatar">
                <img 
                class = "chats__user-avatar-image"
                src="${returnAvatar(i)}" 
                alt="user avatar"
                >
            </div>
            <div class="chats__user-info">
                <span class="chats__user-name">${chats[i].name}</span>
                <span class="chats__last-user-message"></span>
            </div>        
            <span class="chats__last-user-time">13:37</span>
        </div>
        `       
        )
        returnAvatar(i)
    }
}

function returnAvatar(index) {
    if(chats[index].avatar !== null || undefined) {
        return chats[index].avatar
    }
    else {
        return 'icon/avatar.svg'
    }
}


renderChats()
chatsClick()





function chatsClick() {
    chatListUser = document.querySelectorAll('.chats__user')
    chatListUser.forEach(user => {
        user.addEventListener('click', function(){
            chatListUser.forEach(all => {
                all.classList.remove('active')
            })
            user.classList.add('active')
            
            localStorage.setItem('activeChatId', user.dataset.index)
            const userId = localStorage.getItem('activeChatId')

            const activeNameChat = document.querySelector('.chat-info__interlocutor-name')
            const activeAvatarChat = document.querySelector('.chat-info__interlocutor-icon')
            activeNameChat.textContent = chats[userId].name
            activeAvatarChat.src = returnAvatar(userId)
            
            renderMessages()
            checkingActiveChats()
            returnChatStatus()
            function returnChatStatus() {
                if (chats[userId].type === 'group') {
                    chatStatus.textContent = ''
                }
                else if (chats[userId].type === 'local') {
                    chatStatus.textContent = 'Был(а) в сети'
                    // returnTimeInterlocutor() <--- в будущем
                }
            }
            
        })
    })
}

function renderMessages() {
    chatUserMsg.innerHTML = ''
    const filteredMessage = userMessages.filter((msg) => msg.chatId === localStorage.getItem('activeChatId'))

    for(let i = 0; i<filteredMessage.length; i++) {
        chatUserMsg.insertAdjacentHTML('beforeend', `
        <div class = "chat__messages-user-wrapper">
            <div class="chat__messages-user-msg">
                <span class = "chat__user-msg">${filteredMessage[i].text}</span>
            </div>
            <span class="chat__user-messages-time">${filteredMessage[i].date}</span>
        </div>`) 
    }
}


function checkingActiveChats() {
    const activeChat = Array.from(chatListUser).filter(chat => chat.classList.contains('active'))
    if (activeChat.length === 0) {
        inactiveChats.style.display = 'flex'
        activeChats.style.display = 'none'
    }
    else {
        inactiveChats.style.display = 'none'
        activeChats.style.display = 'flex'   
    }
}
checkingActiveChats()





addNewChat = document.querySelector('.chats-header__new-chat-btn')
panelNewChat = document.querySelector('.chats-header__panel-new-chat')

addNewChat.onclick = function() {
    addNewChat.classList.toggle('active')
    if (addNewChat.classList.contains("active")) {
        panelNewChat.style.display = 'flex'
    }
    else {
        panelNewChat.style.display = 'none'
    }
}


const createGroupPanel = document.querySelector('.create-group')
const btnLeftPanelBack = document.querySelector('.left-panel__back')

btnLeftPanelBack.onclick = () => backLeftPanel()

backLeftPanel = function() {
    panelTab.forEach(el => {
        el.classList.remove('active')
    })
    createGroupPanel.classList.add('animateLeftSidePanelClose')

    setTimeout(function() {
        createGroupPanel.style.display = 'none'
        chatPanel.style.display = 'flex'
        createGroupPanel.classList.remove('animateLeftSidePanelClose')
    }, 300)
}


panelTab = document.querySelectorAll('.chats-header__panel-tab')

panelTab.forEach(el => {
    el.addEventListener('click', () => {
        chatPanel.style.display = 'none'
        el.classList.add('active')

        if (el.dataset.id === '1') {
        }
        else if (el.dataset.id === '2') {
            createGroupPanel.style.display = 'flex'
        }
        else if (el.dataset.id === '3') {
        }
    })
})




const createGroupContinue = document.getElementById('createGroupContinue')

createGroupContinue.onclick = () => createGroup()

function createGroup() {
    const name = document.getElementById('createGroupName').value.trim()
    const desc = document.getElementById('createGroupDescription').value.trim()
    if (name !== '') {
        const newGroup = {
            name: name,
            avatar: null,
            id: chats.length,
            type: 'group'
        }
        chats.push(newGroup)
        renderChats()
        chatsClick()
        backLeftPanel()
    }

}

const loadGroupAvatar = document.querySelector('.create-group__load-avatar')
const groupAvatarImage = document.querySelector('.create-group__set-avatar-circle')
groupAvatarImage.onclick = () => loadGroupAvatar.click()


const btnNotif = document.querySelector('.chat-info__notification-button')
const notifPanel  = document.querySelector('.notification')
const notifOut = document.querySelector('.notification__out')

btnNotif.onclick = function() {
    notifPanel.style.display = 'flex'
}

notifOut.onclick = function() {
    notifPanel.classList.add('animateRightSidePanelClose')
    setTimeout(function() {
        notifPanel.style.display = 'none'
        notifPanel.classList.remove('animateRightSidePanelClose')
    }, 500)
}
