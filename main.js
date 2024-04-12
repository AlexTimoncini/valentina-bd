const duck = document.querySelector('.duck'),
      more = document.getElementById('more'),
      less = document.getElementById('less'),
      counterDom = document.getElementById('counter')

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
    duck.src = 'assets/ducks/duck-'+counter+'.png'
    if(document.getElementById('quack-'+counter))
        document.getElementById('quack-'+counter).play()
    counterDom.innerText = counter
    localStorage.setItem('duckCounter', counter)
}

/* INSTALLER */
let installPrompt = null;
const installButton = document.querySelector("#install");
window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installPrompt = event;
    installButton.removeAttribute("hidden");
});
installButton.addEventListener("click", async () => {
    if (!installPrompt) {
        return;
    }
    const result = await installPrompt.prompt();
    console.log(`Install prompt was: ${result.outcome}`);
    disableInAppInstallPrompt();
});
function disableInAppInstallPrompt() {
    installPrompt = null;
    installButton.setAttribute("hidden", "");
}
window.addEventListener("appinstalled", () => {
    disableInAppInstallPrompt();
});
function disableInAppInstallPrompt() {
    installPrompt = null;
    installButton.setAttribute("hidden", "");
}