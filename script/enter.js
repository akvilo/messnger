const btnEnter = document.getElementById('buttonEnter')
const btnRememberMe = document.getElementById('btnRememberMe')
const btnRegistration = document.getElementById('buttonRegistration')
const chapterLoginSocials = document.querySelector('.login-socials')
const registrationData = document.querySelectorAll('.registration-data')

class UserData {
    constructor(name, surname, age, mail, password) {
    this.id = users.length+1
    this.name = name,
    this.surname = surname,
    this.age = age,
    this.mail = mail,
    this.password = password
    }
}

users = []

btnRememberMe.onclick = function() {
    btnRememberMe.classList.toggle('active')
}

btnRegistration.onclick = function() {
    function toggleRegistrationDisplay(el, reg, btnEnter) {
        el.style.display = el.style.display === ('none') ? 'flex' : 'none'
        reg.textContent = reg.textContent === ('Войти') ? 'Зарегистрироваться' : 'Войти'
        btnEnter.textContent = reg.textContent === ('Зарегистрироваться') ? 'Войти' : 'Зарегистрироваться'
    }
    toggleRegistrationDisplay(chapterLoginSocials, btnRegistration, btnEnter)

    registrationData.forEach(i => {
        i.classList.toggle('active')
    })
}


btnEnter.onclick = function() {
    const UserInputName = document.getElementById('userInputName').value
    const UserInputSurname = document.getElementById('userInputSurname').value
    const UserInputAge = document.getElementById('userInputAge').value
    const UserInputPassword = document.getElementById('userInputPassword').value
    const UserInputMail = document.getElementById('userInputMail').value

    if (this.textContent === 'Войти') {
        console.log('continue')
    }
    
    else if (this.textContent === 'Зарегистрироваться') {
        const user = new UserData(UserInputName, UserInputSurname, UserInputAge, UserInputPassword, UserInputMail)
        users.push(user)
    }
    renderUsers()
}

function renderUsers() {
    for(let i = 0; i<users.length; i++) {
        console.log(`users ${i}`)
    }
}