const btnChangeTheme = document.querySelector('.settings__button-theme')

btnChangeTheme.onclick = function() {
    document.body.className = document.body.classList.contains('light') ? 'dark' : 'light'

    // if (document.body.classList.contains('dark')) {
    //     document.body.classList.remove('light')
    //     document.body.classList.add('dark')
    // }
    
    // else {
    //     document.body.classList.remove('light')
    //     document.body.classList.add('dark')
    // }
}
