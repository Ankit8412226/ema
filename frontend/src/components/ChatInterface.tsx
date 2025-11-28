"use client";

import React, { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon, SparklesIcon } from '@heroicons/react/24/solid';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const ChatInterface: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Hello! I am your EMA assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:8000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage.content }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const botMessage: Message = { role: 'assistant', content: data.response };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error connecting to the backend.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="flex flex-col h-full bg-white overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-border bg-secondary/50 flex items-center gap-2">
                <SparklesIcon className="w-5 h-5 text-accent" />
                <h3 className="font-semibold text-foreground">EMA Assistant</h3>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-secondary/30">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[85%] rounded-2xl px-5 py-3 shadow-sm ${msg.role === 'user'
                                ? 'bg-accent text-white rounded-br-none'
                                : 'bg-white text-foreground rounded-bl-none border border-border'
                                }`}
                        >
                            <p className="text-sm leading-relaxed">{msg.content}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white text-foreground rounded-2xl rounded-bl-none px-5 py-3 border border-border">
                            <div className="flex space-x-2">
                                <div className="w-2 h-2 bg-accent/50 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-accent/50 rounded-full animate-bounce delay-75"></div>
                                <div className="w-2 h-2 bg-accent/50 rounded-full animate-bounce delay-150"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-border">
                <div className="flex items-center gap-2 bg-secondary rounded-xl border border-border px-4 py-2 focus-within:border-accent/50 focus-within:ring-1 focus-within:ring-accent/50 transition-all shadow-inner">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask about this claim..."
                        className="flex-1 bg-transparent text-foreground placeholder-muted focus:outline-none text-sm"
                        disabled={isLoading}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={isLoading || !input.trim()}
                        className="p-2 text-accent hover:text-accent-hover disabled:text-muted transition-colors"
                    >
                        <PaperAirplaneIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;
