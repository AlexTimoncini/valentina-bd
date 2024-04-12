const duck = document.querySelector('.duck'),
      more = document.getElementById('more'),
      less = document.getElementById('less'),
      counterDom = document.getElementById('counter'),
      installButton = document.querySelector("#install");

for(let i = 0; i < 18; i++){
    let html = `
    <audio id="quack-${i}" preload="auto">
        <source src="assets/audio/quack-${i}.mp3" type="audio/mpeg">
    </audio>`
    document.querySelector('body').insertAdjacentHTML('afterbegin', html)
}

const audios = document.querySelectorAll('audio')

let counter = localStorage.getItem('duckCounter')

if(counter){
    setDuck()
} else {
    counter = 0
    setDuck()
}

more.addEventListener('click', ()=>{
    if(counter < 17){
        counter++
        setDuck()
    }
})
less.addEventListener('click', ()=>{
    if(counter > 0){
        counter--
        setDuck()
    }
})

function setDuck(){
    pauseAllAudios()
    duck.src = 'assets/ducks/duck-'+counter+'.png'
    if(document.getElementById('quack-'+counter))
        document.getElementById('quack-'+counter).play()
    counterDom.innerText = counter
    localStorage.setItem('duckCounter', counter)
}

function pauseAllAudios() {
    audios.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
}

// INSTALLER
// Check if app is installed
const isAppInstalled = () => {
    return (window.matchMedia('(display-mode: standalone)').matches) || (navigator.standalone) || (window.innerWidth <= 800 && window.innerHeight <= 600);
}

let appClass = document.getElementById("app").classList
if (isAppInstalled()) {
    installButton.setAttribute("hidden", "")
    
    if (appClass.contains('d-none'))
        appClass.remove('d-none')
} else {
    installButton.removeAttribute("hidden")
    if (!appClass.contains('d-none'))
        appClass.add('d-none')
}

window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault()
    installButton.removeAttribute("hidden")
})

installButton.addEventListener("click", async () => {
    const result = await installPrompt.prompt();
    console.log(`Install prompt was: ${result.outcome}`);
    disableInAppInstallPrompt()
})

function disableInAppInstallPrompt() {
    installButton.setAttribute("hidden", "")
}

window.addEventListener("appinstalled", () => {
    disableInAppInstallPrompt()
})