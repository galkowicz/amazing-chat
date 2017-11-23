import React, {Component} from 'react';
import {List} from 'semantic-ui-react';
import Message from './Message';

class MessagesList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {messages, username} = this.props;
        return (
            <List divided relaxed className='messages-list'>
                {messages.map((message, index) => {
                    return <Message messageDetails={message} username={username} key={index}/>
                })};
            </List>
        );
    }
}

export default MessagesList;
