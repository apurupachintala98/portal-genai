import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, TextField, Button, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input) {
            setMessages([...messages, { text: input, sender: "self", time: "Now" }]);
            setInput('');
        }
    };

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <List sx={{ maxHeight: '70vh', overflow: 'auto' }}>
                    {messages.map((message, index) => (
                        <ListItem key={index} sx={{ 
                            flexDirection: message.sender === 'self' ? 'row-reverse' : 'row', 
                            backgroundColor: message.sender === 'self' ? '#e0f7fa' : '#fce4ec',
                            borderRadius: '10px', 
                            p: 1, 
                            my: 1 
                        }}>
                            <ListItemText primary={message.text} secondary={message.time} />
                        </ListItem>
                    ))}
                </List>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Type a Message"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <IconButton onClick={handleSend} color="primary">
                        <SendIcon />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default Chat;
