const options = {
    active:true,
    currentWindow:true
}
const inputElem = document.querySelector('.popup-input');

document.querySelector('.popup-btn').addEventListener('click',function(){
    chrome.tabs.query(options,gotTab);

    function gotTab(tabs){
        chrome.tabs.sendMessage(tabs[0].id,{msg:'turnOn',text: inputElem.value})
    }
})


document.querySelector('.img-btn').addEventListener('click',function(){
    chrome.tabs.query(options,gotTab);
    function gotTab(tabs){
        chrome.tabs.sendMessage(tabs[0].id,{msg:'images'})
    }
})

document.querySelector('.text-btn').addEventListener('click',function(){
    chrome.tabs.query(options,gotTab);
    function gotTab(tabs){
        chrome.tabs.sendMessage(tabs[0].id,{msg:'text'})
    }
})