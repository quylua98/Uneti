import React, {Component} from "react";

import {connect} from 'react-redux';

import {
    SafeAreaView,
    StyleSheet,
    FlatList,
    KeyboardAvoidingView
} from "react-native";
import {
    Container,
    Body,
    Content,
    Button,
    Header,
    Icon,
    Left,
    Right,
    List,
    Title,
    ListItem,
    Thumbnail,
    Text
} from 'native-base';
import {GiftedChat, Actions, Send} from 'react-native-gifted-chat';
import {incomingMessage, sendMessage} from "../../store/chat/action";
import {ENDPOINT_SEND_MESSAGE} from "../../constants/Constants";
import Colors from "../../constants/Colors";
import {entityToMessage, messageToEntity} from "../../components/module/chatting/ConvertMessage";
import {getURIAvatarFromUserId} from "./components/Utils";

class ChattingBoxScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        }
    }

    componentDidMount() {
    }

    /**
     status: MessageStatus.PENDING,
     type: MessageType.TEXT,
     content: message.text,
     sendToUserId: userId,
     sendToUsername: username,
     conId: conId,
     createdDate: message.createdAt
     */
    onSend = (messages) => {
        const {userIdReceive, usernameReceive, conId} = this.props.chat;
        this.props.incomingMessage(conId, messages);
        const messageEntity = messageToEntity(messages[0], userIdReceive, usernameReceive, conId);
        this.props.sendMessage(messageEntity, ENDPOINT_SEND_MESSAGE);
    }

    /**
     _id: entity.userSentId,
     text: entity.content,
     createdAt: moment(entity.createdDate),
     user: {
            _id: entity.userSentId,
            avatar: getURIAvatarFromUserId(entity.conId),
        },
     */
    onReceive = (message) => {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, {
                    _id: message._id,
                    text: message.text,
                    createdAt: message.createdAt,
                    user: {
                        _id: message.user._id,
                        avatar: message.user.avatar,
                    },
                }),
            };
        });
    }

    render() {
        const {messages} = this.props.chat;
        const {navigation} = this.props;
        const {userId} = this.props.auth;
        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => {
                                navigation.goBack(null);
                            }}
                        >
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Nguyễn Duy Quý</Title>
                    </Body>
                    <Right>
                        <Icon name="alert" style={{color: Colors.white}}/>
                    </Right>
                </Header>
                <GiftedChat
                    placeholder={"Aa"}
                    alwaysShowSend={true}
                    isAnimated
                    messages={messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: userId,
                        avatar: getURIAvatarFromUserId(userId)
                    }}
                    // renderActions={() => (
                    //     <Text>asdasd</Text>
                    // )}
                    renderSend={(props) => {
                        return <Send
                            {...props}
                            containerStyle={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center',
                                marginRight: 15,
                                marginLeft: 15,
                            }}
                        >
                            <Icon name="send" style={{color: Colors.tintColor}}/>
                        </Send>
                    }}
                />
                <KeyboardAvoidingView/>
            </Container>
        );
    };
};

const mapStateToProps = state => ({
    chat: state.chat,
    auth: state.auth
});
const mapDispatchToProps = {sendMessage, incomingMessage};
export default connect(mapStateToProps, mapDispatchToProps)(ChattingBoxScreen);

const styles = StyleSheet.create({})
