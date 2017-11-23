import React, {Component} from 'react';
import {List, Image} from 'semantic-ui-react';
import avatars from '../assets/avatars'



class Message extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {avatarKey, username, text} = this.props.messageDetails;
        const own = this.props.username === username;
        return (
                <List.Item className={(own ? 'own-message' : '')}>
                    <Image floated='left' className='message-image' avatar src={avatars[avatarKey]} />
                    <List.Content floated='left'>
                        <List.Header as='a'>{username}</List.Header>
                        <List.Description as='a'>{text}</List.Description>
                    </List.Content>
                </List.Item>
          );
    }
}

export default Message;