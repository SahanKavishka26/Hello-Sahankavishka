// --- chatbot.js ---

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Elements අල්ලා ගැනීම (ID මගින් link කිරීම)
    const chatWindow = document.getElementById('chatWindow');
    const chatToggleBtn = document.getElementById('chatToggleBtn'); // Button එක
    const chatCloseBtn = document.getElementById('chatCloseBtn');
    const chatInput = document.getElementById('chatInput');
    const chatSendBtn = document.getElementById('chatSendBtn');
    const chatMessages = document.getElementById('chatMessages');

    // 2. Chatbot දන්න දේවල් (Knowledge Base)
    const knowledgeBase = [
        { 
            keywords: ["hi", "hello", "hey", "ayubowan"], 
            response: "Hello there! Welcome to Kavi's portfolio. How can I help you?" 
        },
        { 
            keywords: ["who", "kavi", "name"], 
            response: "I am Kavi, a Full-Stack Developer and the founder of SK SOLUTION." 
        },
        { 
            keywords: ["company", "sk"], 
            response: "SK SOLUTION is my IT firm where we build websites and data dashboards." 
        },
        { 
            keywords: ["youtube", "channel"], 
            response: "My channel is 'Simple English Daily'. I create AI-powered English learning content." 
        },
        { 
            keywords: ["project", "work"], 
            response: "I've built the CSE Calculator, LMS Dashboards, and more. Check the 'Projects' section!" 
        },
        { 
            keywords: ["contact", "email"], 
            response: "You can email me at kavi@sksolution.com or use the contact form." 
        },
        { 
            keywords: ["skill", "tech"], 
            response: "I use JavaScript, React, Tailwind CSS, Three.js, and Node.js." 
        }
    ];

    // 3. Button එක Click කළාම Window එක Open වෙන්න (Linking Logic)
    if(chatToggleBtn) {
        chatToggleBtn.addEventListener('click', () => {
            chatWindow.classList.toggle('open'); // 'open' class එක එකතු කරනවා/අයින් කරනවා
            if(chatWindow.classList.contains('open')) {
                setTimeout(() => chatInput.focus(), 300); // Input එකට focus දෙනවා
            }
        });
    }

    if(chatCloseBtn) {
        chatCloseBtn.addEventListener('click', () => {
            chatWindow.classList.remove('open');
        });
    }

    // 4. Message යවන Logic එක
    function handleChat() {
        const userText = chatInput.value.trim();
        if (!userText) return;

        // User Message පෙන්වන්න
        addMessage(userText, 'user-msg');
        chatInput.value = '';

        // Bot උත්තරේ හොයනවා (පොඩි delay එකක් එක්ක)
        setTimeout(() => {
            const botResponse = getResponse(userText.toLowerCase());
            addMessage(botResponse, 'bot-msg');
        }, 600);
    }

    function getResponse(input) {
        for (let item of knowledgeBase) {
            if (item.keywords.some(keyword => input.includes(keyword))) {
                return item.response;
            }
        }
        return "I'm focusing on Web Dev right now. Ask about my 'projects' or 'skills'!";
    }

    function addMessage(text, className) {
        const div = document.createElement('div');
        div.className = `msg ${className}`;
        div.textContent = text;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Send Button සහ Enter Key එකට වැඩ කරන්න
    if(chatSendBtn) chatSendBtn.addEventListener('click', handleChat);
    if(chatInput) chatInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') handleChat(); });
});