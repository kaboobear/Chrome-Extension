console.log("Page script start");




chrome.runtime.onMessage.addListener(msgFun);

function msgFun(message,sender,sendResponse){
    if(message.msg === "turnOn"){
        replaceText(document.body);
        function replaceText(elem){
            if(elem.classList && elem.classList.contains('toReplace')){
                const parElem = elem.parentNode;
                elem.replaceWith(document.createTextNode(elem.textContent));
                parElem.normalize();
                replaceText(parElem);
            }
            else if(elem.hasChildNodes()){
                elem.childNodes.forEach(replaceText);
            } 
            else if(elem.nodeType === Text.TEXT_NODE){
                const regexp = new RegExp(message.text,"g");
                if(elem.textContent.match(regexp)){
                    const newElem =  document.createElement('span');
                    newElem.innerHTML =  elem.textContent.replace(regexp,`<span class="toReplace" style="background-color:#a8324a;color:#fff">${message.text}</span>`)
                    elem.replaceWith(newElem);
                }
            }
        }
    }
    else if(message.msg === "images"){
        // Replace images
        let images = document.querySelectorAll('img');
        for(imgElem of images){
            const url = chrome.extension.getURL('images/one.png');
            imgElem.src = url;
        }
    }
    else if(message.msg === "text"){
        // Replace text
        replaceText(document.body);
        function replaceText(elem){
            if(elem.hasChildNodes()){
                elem.childNodes.forEach(replaceText);
            } else if(elem.nodeType === Text.TEXT_NODE){
                console.log(elem);
                if(elem.textContent !== "") elem.textContent = "No Text"
            }
        }

        //Replace inputs
        let inputs = document.querySelectorAll('input');
        for(input of inputs){
            input.value = "No Text";
            input.placeholder = "No Text";
        }
    }
}

