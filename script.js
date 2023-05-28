const parantTag = document.querySelector('.profileRow')
const chatSectDiv = document.querySelector('.chatSide')
const chatSession = document.querySelector(".chatSessions_Section")
const CloseButton = document.querySelector('closeChat');
const chatSection = document.querySelector('.chatDetails_Section')
const StyleElem = document.getElementById('css');

function getComponents(){
    Userdetails.map((i,idx) => {
        var s = `<div>
                    <div>
                    <img src="${i.profilePic}" alt="pimg" />
                    </div>
                    <div class="profileNameAndStatus">
                    <p>${i.name}</p>
                    <p>
                    ${i.description}
                    </p>
                    </div>
                </div>
                <span>${i.active}</span>`

            let htmlDiv = document.createElement('div');
            htmlDiv.innerHTML = s;
            htmlDiv.classList.add('profileSection')
            parantTag.appendChild(htmlDiv)

            getRightComponents(Userdetails[0],0)
            ChatDetails(Userdetails[0].chat)
            StyleElem.innerHTML = `.profileSection:nth-child(${1}) { background-color: #F5F6FA;  }`;
            
            htmlDiv.addEventListener("click", function(){
                StyleElem.innerHTML = `.profileSection:nth-child(${idx+1}) { background-color: #F5F6FA;  }`;
                getRightComponents(i,idx)
                ChatDetails(i.chat)
                chatSession.classList.add("CloseMobileviewChatSession")
                chatSection.classList.add("closeRight")
                chatSession.classList.remove("OpenMobileviewChatSession")
            });
    })
}

function getRightComponents(obj,id){
        var s = `
        <div class="chatDetails_Section_Profile">
        <div>
          <img src="${obj.profilePic}" alt="profileImage" />
          <span></span>
        </div>
        <div>
          <p>${obj.name}</p>
          <p>
          ${obj.status}
          </p>
        </div>
      </div>
      <div id="scrollArea" class="chatArea">
      </div>
      <div class="sendMessage">
          <div class="messageSection">
              <textarea id="textArea" placeholder="Type your message here…"></textarea>
              <span onClick="onSubmitFunc(${id})">Send</span>
          </div>
      </div>`
      chatSectDiv.innerHTML = s;
}

function ChatDetails(chatArr){
    const wraper = document.querySelector('.chatArea')
    wraper.innerHTML='';
    chatArr.map((ch) => {
        const para = document.createElement('p')
        para.innerHTML = ch.msg;
        para.classList.add(ch.from)
        wraper.appendChild(para)
    })
}

function onSubmitFunc(id){
        let inputVal = document.getElementById("textArea").value;
        let nobj = {
            from: 'user',
            msg: inputVal
        }
        Userdetails[id].chat = [...Userdetails[id].chat, nobj];
        ChatDetails(Userdetails[id].chat)
        document.getElementById("textArea").value="";
        scrollBottom();
}

getComponents();

function toggleframe(){
    chatSession.classList.add("OpenMobileviewChatSession")
    chatSection.classList.remove("closeRight")
    
}
function scrollBottom() {
    var objDiv = document.getElementById("scrollArea");
    objDiv.scrollTop = objDiv.scrollHeight;
}