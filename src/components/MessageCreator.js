import React, {Component} from 'react';
import {Form, Button, Image} from 'semantic-ui-react'
import avatars from '../assets/avatars'

class MessageCreator extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {username: '', text: '', isEmptyMessage: true};
    }

    componentWillMount() {
        const avatarKey = this.generateUserAvatar();
        this.setState({avatarKey});
        this.checkLocalStorageForUsername();
    }

    render() {
        return (
            <Form className='message-creator'>
                <Image className='avatar'
                       src={avatars[this.state.avatarKey]}/>
                <Form.Field className='username'>
                    <label>Username</label>
                    <input placeholder='Username'
                           name='username'
                           onChange={this.handleChange}
                           value={this.state.username}/>
                </Form.Field>
                <Form.Field>
                    <label>Massage</label>
                    <input placeholder='Massage'
                           name='text'
                           onChange={this.handleChange}
                           value={this.state.text}/>
                </Form.Field>
                <Button onClick={this.handleSubmit}
                        type='submit'>Send</Button>
            </Form>);
    }

    generateUserAvatar() {
        return Math.floor((Math.random() * 5) + 1);
    }

    checkLocalStorageForUsername() {
        const username = localStorage.getItem('spotim-username');
        let avatarKey = localStorage.getItem('spotim-avatarKey');
        if (!username) {
            avatarKey = this.generateUserAvatar();
        }
        this.setState({username, avatarKey});
    }

    handleChange(event) {
        const field = event.target.name;
        this.setState({[field]: event.target.value});
        if (field === 'username') {
            localStorage.setItem('spotim-username', event.target.value);
            localStorage.setItem('spotim-avatarKey', this.state.avatarKey);
        }
    }

    handleSubmit() {
        if (this.isEmptyMessage()) {
            this.setState({isEmptyMessage: true});
            return false;
        }
        else {
            this.setState({isEmptyMessage: false, text: ''});
            const {isEmptyMessage, ...message}  = this.state; // send only needed parts of message
            this.props.onSendMessage(message);
        }
    }

    isEmptyMessage() {
        return this.state.username === '' || this.state.text === '';
    }

}

export default MessageCreator;