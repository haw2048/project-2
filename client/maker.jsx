const helper = require('./helper.js');
const React = require('react');
const {useState, useEffect} = React;
const {createRoot} = require('react-dom/client');

const handleChat = (e, onChatAdded) => {
    e.preventDefault();
    helper.hideError();

    const user1 = e.target.querySelector('#user1').value;
    // const user2 = e.target.querySelector('#user2').value;

    if(!user1){
        helper.handleError('All fields are required!');
        return false;
    } 

    helper.sendPost(e.target.action, {user1}, onChatAdded);

    return false;

}

// const handleDelete = (e, onChatAdded, domo) => {
//     e.preventDefault();
//     helper.hideError();

//     helper.sendDelete(e.target.action, domo, onDomoAdded);

//     return false;

// }

const ChatForm = (props) => {
    return (
        <form id="domoForm"
            onSubmit={(e) => handleChat(e, props.triggerReload)}
            name="domoForm"
            action="/chat"
            method="POST"
            className="domoForm"
        >
            <label htmlFor="name">User: </label>
            <input id="user1" type="text" name="name" placeholder="Username" />
            <input className="makeDomoSubmit" type="submit" value="Find User" />
        </form>
    );
};

const ChatList = (props) => {
    const [chats, setChats] =useState(props.chats);

    useEffect(() => {
        const loadChatsFromServer = async () => {
            const response = await fetch('/getChats');
            const data = await response.json();
            setChats(data.chats);
        };
        loadChatsFromServer();

    }, [props.reloadChats]);

    if(chats.length === 0 ){
        return(
            <div className="domoList">
                <h3 className="emptyDomo">No Chats Yet!</h3>
            </div>
        );
    }

    const chatNodes = chats.map(chat => {
        return(
            <form id="domoDelete"
            name="domoDelete"
            action="/message"
            method="GET"
            className="domoDelete"
            >
                <div key={chat.id} className="domo">
                    <img src="assets/img/domoface.jpeg" alt="domo face" className="domoFace"/>
                    <h3 className="user1">{chat.user1}, {chat.user2}</h3>
                    {/* <input className="makeDomoDelete" type="submit" value="Delete" /> */}

                </div>
            </form>
        );
    });

    return(
        <div className="chatList">
            {chatNodes}
        </div>
    );
};

const App = () => {
    const [reloadChats, setReloadChats] = useState(false);

    return (
        <div>
            <div id="makeDomo">
                <ChatForm triggerReload={() => setReloadChats(!reloadChats)} />
            </div>
            <div id="domos">
                <ChatList chats={[]} reloadChats={reloadChats} />
            </div>
        </div>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<App />);
};

window.onload = init;