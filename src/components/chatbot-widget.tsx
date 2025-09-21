import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Bot, Send, X, MessageCircle, Lightbulb } from 'lucide-react';

interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: 'Hi! I\'m your AI assistant for scaling your art business. Ask me about marketing strategies, pricing your art, or growing your audience!',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickSuggestions = [
    'How do I price my artwork?',
    'Tips for social media marketing',
    'Best hashtags for art posts',
    'How to improve ad performance?'
  ];

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      const botMessage: Message = {
        id: messages.length + 2,
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputMessage('');
  };

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('price') || lowerInput.includes('pricing')) {
      return '💰 Art pricing tips:\n\n1. Calculate materials + time + profit margin\n2. Research similar artists\' prices\n3. Factor in your experience level\n4. Consider the size and complexity\n5. Don\'t undervalue your work!';
    }
    
    if (lowerInput.includes('social media') || lowerInput.includes('marketing')) {
      return '📱 Social media marketing strategies:\n\n1. Post consistently (3-5 times/week)\n2. Share your process, not just final pieces\n3. Engage with art communities\n4. Use relevant hashtags (#art #handmade)\n5. Collaborate with other artists\n6. Tell stories behind your art';
    }
    
    if (lowerInput.includes('hashtag')) {
      return '🏷️ Effective art hashtags:\n\n• #art #artist #artwork #painting\n• #handmade #original #creative\n• #artforsale #commission #gallery\n• #[yourstyle]art (e.g., #abstractart)\n• #[yourcity]artist\n• Use 5-15 hashtags per post';
    }
    
    if (lowerInput.includes('ad') || lowerInput.includes('performance')) {
      return '📈 Improve ad performance:\n\n1. Use high-quality, bright images\n2. Write compelling captions with stories\n3. Post at optimal times (evenings/weekends)\n4. Include clear call-to-actions\n5. Track engagement and adjust\n6. A/B test different formats';
    }
    
    return '🎨 Great question! Here are some general tips for growing your art business:\n\n• Build an authentic brand story\n• Engage genuinely with your audience\n• Offer multiple price points\n• Document your creative process\n• Network with other artists and collectors\n\nWhat specific aspect would you like to explore further?';
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 sm:w-96 h-[500px] max-h-[80vh] flex flex-col shadow-2xl z-50 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-base sm:text-lg">
            <Bot className="w-5 h-5 mr-2" />
            <span className="truncate">Art Business Assistant</span>
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20 h-8 w-8 p-0 flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        <ScrollArea className="flex-1 p-4 min-h-0">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg whitespace-pre-line break-words ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        {messages.length === 1 && (
          <div className="p-4 border-t flex-shrink-0">
            <p className="text-sm text-gray-600 mb-2 flex items-center">
              <Lightbulb className="w-4 h-4 mr-1" />
              Quick suggestions:
            </p>
            <div className="space-y-2">
              {quickSuggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left justify-start h-auto py-2 px-3 whitespace-normal"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        <div className="p-4 border-t flex-shrink-0">
          <div className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me anything about growing your art business..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1"
            />
            <Button
              onClick={sendMessage}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}