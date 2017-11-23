//This is your top level React component, you may change everything

import React from 'react'
import logo from '../assets/spotim-logo.jpg'
import {Container, Image} from 'semantic-ui-react'
import styled from 'styled-components';
import MessageCreator from './MessageCreator'
import MessagesList from './MessagesList'
import messageUtil from '../utils/messageUtil'

const Logo = styled.div`
      img{
        margin-left: auto;
        margin-right: auto;
        margin-top: 15px;      
      }
      
`;


class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.onMessagesReceived = this.onMessagesReceived.bind(this);
        this.messageUtil = new messageUtil(this.props.socketio);
        this.state = {messages: [], username: ''};
    }

    componentWillMount() {
        this.messageUtil.getMessages(this.onMessagesReceived);
    }

    onMessagesReceived(data) {
        let messages = [...this.state.messages];
        messages.push(data);
        this.setState({messages});
    }

    render() {
        return <Container className={'spotim-header'}>
            <div className={'spotim-title'}>
                Welcome to the Spot.IM Chat app
            </div>
            <div>
                <Logo>
                    <Image size={'tiny'} src={logo}/>
                </Logo>
                <MessageCreator onSendMessage={this.handleSendMessage}/>
                <MessagesList messages={this.state.messages} username={this.state.username}/>
            </div>
        </Container>
    }

    handleSendMessage(message) {
        this.messageUtil.sendMessage(message);
        this.setState({username: message.username});
    }
}

export default App;