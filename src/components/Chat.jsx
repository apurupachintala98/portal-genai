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
        <Box sx={{ display: 'flex', height: '85vh', backgroundColor: '#f0f0f0' }}>
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{ flexGrow: 1, p: 3, backgroundColor: "#fff", height: '80vh', display: "flex", flexDirection: "column" }}>

                    <List sx={{ height: '70vh', overflow: 'auto', bgcolor: 'background.paper' }}>
                        {messages.map((message, index) => (
                            <ListItem key={index} sx={{
                                flexDirection: message.sender === 'self' ? 'row-reverse' : 'row',
                                bgcolor: message.sender === 'self' ? '#3333ff' : '#8888ff',
                                borderRadius: '10px',
                                p: 1,
                                my: 1,
                                color: 'white',
                            }}>
                                <ListItemText primary={message.text} sx={{ textAlign: message.sender === 'self' ? 'right' : 'left' }} />
                            </ListItem>
                        ))}
                    </List>

                    <Box sx={{
                        position: 'sticky',
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        mt: 1,
                        backgroundColor: '#fff', // Ensures the input area matches the overall chat background
                    }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Type a Message"
                            value={input}
                            rows={4}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            sx={{ flexGrow: 1, mr: 1, borderRadius: '20px', backgroundColor: 'white', '& .MuiInputBase-input': { padding: "8.5px 14px" } }}
                        />
                        <IconButton onClick={handleSend} color="primary" sx={{ bgcolor: '#1a3673', '&:hover': { bgcolor: 'darkblue' }, color: "#fff" }}>
                            <SendIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Chat;
