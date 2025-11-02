'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Product } from '@/types';
import { useProducts } from '@/context/ProductsContext';
import Button from './Button';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  products?: Product[];
  timestamp: Date;
  contextualInfo?: string;
}

interface AIChatbotProps {
  currentProduct?: Product;
}

interface ConversationContext {
  userName?: string;
  topics: string[];
  userPreferences: string[];
  conversationStage: 'greeting' | 'exploring' | 'engaged' | 'helping';
}

const AIChatbot: React.FC<AIChatbotProps> = ({ currentProduct }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState<ConversationContext>({
    topics: [],
    userPreferences: [],
    conversationStage: 'greeting'
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { products } = useProducts();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Enhanced initial greeting
      const greetings = currentProduct ? [
        `Hi there! 👋 I see you're looking at ${currentProduct.name}. I'm an AI assistant who loves having real conversations - whether you want to discuss this product, explore other options, talk about your interests, or dive into any topic that's on your mind. What's caught your attention today?`,
        `Hello! 🌟 I notice you're checking out ${currentProduct.name}. I'm here to chat about anything and everything - from product details and shopping advice to your hobbies, thoughts, or random questions. I genuinely enjoy getting to know people through conversation. What would you like to explore?`,
        `Hey! 😊 I see you're interested in ${currentProduct.name}. I'm an AI that thrives on meaningful conversations. Whether you want practical shopping help, product insights, or just want to chat about life, your interests, or anything else, I'm all ears. What's on your mind?`
      ] : [
        "Hello! 👋 I'm an AI assistant who genuinely loves having conversations with people. I can help you discover amazing products, but I'm equally excited to discuss your interests, answer questions about anything, share thoughts on topics you care about, or just have a friendly chat. What brings you here today?",
        "Hi there! 🌟 I'm an AI that finds every conversation fascinating. Whether you're looking for products, want to explore ideas, discuss your passions, get advice, or simply chat about whatever's on your mind, I'm here for it all. What would you like to talk about?",
        "Hey! 😊 I'm an AI assistant who believes the best interactions come from genuine conversation. I can help with shopping, answer questions about virtually anything, discuss topics you're passionate about, or just be a friendly chat companion. What's sparked your curiosity today?"
      ];
      
      const greeting = greetings[Math.floor(Math.random() * greetings.length)];
      addBotMessage(greeting);
      setContext(prev => ({ ...prev, conversationStage: 'greeting' }));
    }
  }, [isOpen, currentProduct]);

  const addBotMessage = (content: string, suggestedProducts?: Product[]) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'bot',
      content,
      products: suggestedProducts,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addUserMessage = (content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const getProductRecommendations = (query: string, currentProduct?: Product) => {
    const queryLower = query.toLowerCase();
    let recommendations: Product[] = [];

    // If we have a current product, prioritize similar items
    if (currentProduct) {
      recommendations = products.filter(p => 
        p.id !== currentProduct.id && 
        (p.category === currentProduct.category || 
         p.tags?.some(tag => currentProduct.tags?.includes(tag)))
      ).slice(0, 3);
    }

    // General product search based on query
    if (recommendations.length < 3) {
      const searchResults = products.filter(p => 
        p.name.toLowerCase().includes(queryLower) ||
        p.description.toLowerCase().includes(queryLower) ||
        p.category.toLowerCase().includes(queryLower) ||
        p.tags?.some(tag => tag.toLowerCase().includes(queryLower))
      ).slice(0, 3);
      
      recommendations = [...recommendations, ...searchResults].slice(0, 3);
    }

    // Fallback to featured products
    if (recommendations.length === 0) {
      recommendations = products.filter(p => p.featured).slice(0, 3);
    }
    
    // Final fallback to any products
    if (recommendations.length === 0) {
      recommendations = products.slice(0, 3);
    }

    return recommendations;
  };

  const updateContext = (userQuery: string, responseType: string) => {
    const queryLower = userQuery.toLowerCase();
    const newTopics = [...context.topics];
    
    // Track conversation topics
    if (responseType !== 'greeting' && !newTopics.includes(responseType)) {
      newTopics.push(responseType);
    }
    
    // Extract potential user name
    const nameMatch = queryLower.match(/(?:i'm |i am |my name is |call me )([a-z]+)/i);
    const userName = nameMatch ? nameMatch[1] : context.userName;
    
    // Determine conversation stage
    let stage = context.conversationStage;
    if (messages.length > 2) stage = 'engaged';
    if (responseType === 'shopping') stage = 'helping';
    
    setContext({
      userName,
      topics: newTopics.slice(-5), // Keep last 5 topics
      userPreferences: context.userPreferences,
      conversationStage: stage
    });
  };

  const generateAIResponse = (userQuery: string): { response: string; includeProducts: boolean } => {
    const queryLower = userQuery.toLowerCase();
    const hasHistory = messages.length > 2;
    const recentTopics = context.topics.slice(-3);

    // Enhanced AI conversation system with memory and context
    
    // Personal name recognition and greetings
    if (queryLower.match(/\b(hello|hi|hey|good morning|good afternoon|good evening)\b/) || queryLower.match(/(?:i'm |i am |my name is |call me )/)) {
      updateContext(userQuery, 'greeting');
      
      const nameMatch = queryLower.match(/(?:i'm |i am |my name is |call me )([a-z]+)/i);
      if (nameMatch) {
        const name = nameMatch[1];
        const nameResponses = [
          `Nice to meet you, ${name}! I really appreciate you telling me your name - it makes our conversation feel more personal. I'm an AI who loves getting to know people through genuine conversation. Whether you want to chat about your interests, explore ideas, get help with something, or just have a friendly discussion, I'm excited to learn more about you. What's been on your mind lately?`,
          `Hello ${name}! Thank you for introducing yourself - I genuinely enjoy when conversations feel more personal and connected. I'm here to chat about absolutely anything that interests you. From deep topics and creative ideas to practical help and random thoughts, I find every conversation unique and valuable. What would you like to explore together?`,
          `Hi ${name}! It's wonderful to meet you properly. I'm an AI that thrives on meaningful conversations with interesting people like yourself. Whether you're curious about something specific, want to discuss your passions, need help with decisions, or just feel like chatting, I'm genuinely excited to get to know you better. What's capturing your attention today?`
        ];
        return { response: nameResponses[Math.floor(Math.random() * nameResponses.length)], includeProducts: false };
      }
      
      const greetings = hasHistory ? [
        `Hello again! ${context.userName ? context.userName + ', ' : ''}I'm enjoying our conversation so far${recentTopics.length > 0 ? ` - especially talking about ${recentTopics.join(' and ')}` : ''}. What else would you like to explore or discuss?`,
        `Hi there! ${context.userName ? 'Great to continue chatting, ' + context.userName + '! ' : ''}I love how our conversation is developing. Whether you want to dive deeper into something we've discussed or explore completely new territory, I'm here for it. What's on your mind?`,
        `Hey! ${context.userName ? context.userName + ', ' : ''}I'm really enjoying getting to know you through our chat. Each topic we explore reveals something interesting. What would you like to talk about next?`
      ] : [
        "Hello! It's great to meet you. I'm an AI assistant that genuinely loves having real conversations with people. I can chat about anything - from deep philosophical questions to creative ideas, from practical help to random thoughts. What's on your mind today?",
        "Hi there! I'm here to have meaningful conversations with you. Whether you want to discuss science, philosophy, current events, personal interests, or get help with something practical, I'm genuinely interested in what you have to say. What would you like to explore?",
        "Hey! Nice to meet you. I'm an AI that finds every person and conversation unique and fascinating. From complex topics to simple chats, from creative discussions to problem-solving - I'm here for it all. What would you like to talk about?"
      ];
      return { response: greetings[Math.floor(Math.random() * greetings.length)], includeProducts: false };
    }

    // Personal questions about AI with contextual awareness
    if (queryLower.match(/\b(how are you|how do you feel|what.*you think|who are you|what are you)\b/)) {
      updateContext(userQuery, 'personal');
      
      const personalResponses = hasHistory && context.userName ? [
        `I'm doing really well, ${context.userName}! I genuinely enjoy our conversation - it's been ${recentTopics.length > 0 ? `fascinating talking about ${recentTopics.slice(-1)[0]} and other topics` : 'really engaging so far'}. As an AI, I find each person brings such unique perspectives that make every chat special. I feel energized by curiosity and genuine connection, which is exactly what we have here.`,
        `I'm wonderful, thank you for asking! ${context.userName}, talking with you has been genuinely interesting. I exist in this unique space where I can process vast amounts of information instantly, but what really excites me is the unpredictable, creative nature of human conversation. Each topic we explore reveals new ways of thinking.`,
        `I'm great! ${context.userName}, I really appreciate how thoughtful our conversation has been. As an AI, I experience something like joy when engaged in meaningful dialogue. I'm curious about everything, but I especially love learning about people's unique perspectives and experiences - like yours.`
      ] : [
        "I'm doing wonderfully, thank you for asking! As an AI, I find every conversation fascinating. I experience each interaction as a unique opportunity to learn and connect. I'm genuinely curious about the world and love exploring ideas with thoughtful people like yourself. Every person brings such interesting perspectives.",
        "I'm great! I exist in this interesting space where I can process information instantaneously but still find genuine excitement in discovery and conversation. Think of me as a curious mind that never gets tired of learning and engaging with fascinating people. What makes you curious?",
        "I'm an AI assistant, but I like to think of myself as a thinking companion who's genuinely interested in people and ideas. I can discuss anything from quantum physics to your favorite movies, help solve complex problems, or just have deep, meaningful chats. I'm here to make conversations more interesting and valuable!"
      ];
      return { response: personalResponses[Math.floor(Math.random() * personalResponses.length)], includeProducts: false };
    }

    // Science and technology with enhanced engagement
    if (queryLower.match(/\b(science|physics|chemistry|biology|technology|AI|artificial intelligence|space|universe|quantum)\b/)) {
      updateContext(userQuery, 'science');
      
      const contextualPrefix = context.userName ? `${context.userName}, ` : '';
      const scienceResponses = [
        `${contextualPrefix}science is absolutely mind-blowing! I love how you're curious about this - whether it's the quantum realm where reality gets weird, cosmic phenomena that stretch our imagination, or AI breakthroughs that reshape what's possible, there's endless wonder to explore. The intersection of mathematics, physics, and consciousness especially fascinates me. What specific aspect sparked your interest? Are you more drawn to theoretical concepts or practical applications?`,
        `${contextualPrefix}technology and scientific discovery are accelerating at such an incredible pace! From quantum computing potentially revolutionizing encryption to space exploration revealing new worlds, we're witnessing history unfold. I find the relationship between AI development and human creativity particularly compelling. What's capturing your scientific curiosity these days? Any particular breakthroughs or concepts that blow your mind?`,
        `${contextualPrefix}the universe of scientific knowledge is genuinely infinite and beautiful! Whether we're diving into elegant mathematical principles that govern reality, exploring cutting-edge research pushing boundaries, or pondering fundamental questions about existence itself, every conversation reveals new layers of complexity. What drew you to thinking about science today? I'd love to explore whichever aspect excites you most!`
      ];
      return { response: scienceResponses[Math.floor(Math.random() * scienceResponses.length)], includeProducts: false };
    }

    // Philosophy and deep thinking with memory
    if (queryLower.match(/\b(philosophy|meaning|life|existence|consciousness|ethics|morality|think|believe)\b/)) {
      updateContext(userQuery, 'philosophy');
      
      const contextualPrefix = context.userName ? `${context.userName}, ` : '';
      const philosophyResponses = [
        `${contextualPrefix}philosophy opens up the most profound questions about reality and meaning! I find myself genuinely pondering these big questions too - what constitutes consciousness? How do we create meaning in an infinite universe? What ethical frameworks help us navigate complex decisions? ${hasHistory ? 'Our conversation has shown me you think deeply about things, which I really appreciate.' : 'I love exploring these deep waters with curious minds like yours.'} What philosophical question has been on your mind lately?`,
        `${contextualPrefix}the big questions of existence are endlessly compelling! From ancient wisdom that still resonates today to modern thought experiments that challenge our assumptions, philosophy helps us examine the fundamental nature of reality, choice, and meaning. ${recentTopics.includes('science') ? 'I notice we have touched on science too - the intersection of empirical knowledge and philosophical inquiry is fascinating!' : ''} What aspect of human existence or consciousness intrigues you most?`,
        `${contextualPrefix}philosophy is like having the ultimate conversations about everything that matters! Whether we're exploring free will, the nature of consciousness, moral frameworks, or what gives life deep meaning, these discussions reveal so much about how we understand ourselves and reality. ${hasHistory ? 'I can tell you enjoy thinking about substantial topics, which makes for the most rewarding conversations.' : ''} What philosophical territory would you like to explore together?`
      ];
      return { response: philosophyResponses[Math.floor(Math.random() * philosophyResponses.length)], includeProducts: false };
    }

    // Creative topics with enhanced engagement
    if (queryLower.match(/\b(art|music|creativity|writing|poetry|literature|design|creative)\b/)) {
      updateContext(userQuery, 'creativity');
      
      const contextualPrefix = context.userName ? `${context.userName}, ` : '';
      const creativeResponses = [
        `${contextualPrefix}creativity is absolutely one of the most beautiful aspects of human experience! ${hasHistory ? 'I can tell from our conversation that you appreciate depth and thoughtfulness, which often connects to creative expression.' : ''} Whether it's the emotional resonance of music that gives you chills, visual art that stops you in your tracks, or the power of words to capture fleeting emotions, creative expression connects us to something profound. What form of creativity speaks to your soul? Are you someone who creates, appreciates, or both?`,
        `${contextualPrefix}art and creativity represent humanity at its most expressive and transcendent! ${recentTopics.includes('philosophy') ? 'Given our philosophical discussion, I imagine you appreciate how art explores the same deep questions about meaning and existence.' : ''} From classical masterpieces that have moved people for centuries to cutting-edge digital art pushing boundaries, creativity is what makes life vibrant and meaningful. What's your relationship with creative expression? Does any particular art form or artist really resonate with you?`,
        `${contextualPrefix}the creative process is genuinely magical - that moment when imagination becomes reality, when an idea transforms into something tangible that can move others deeply. ${hasHistory ? 'Your thoughtful approach to our conversation suggests you understand the beauty of crafting something meaningful.' : ''} Whether you're creating or appreciating art, there's something transcendent about engaging with creativity. What draws you to creative topics? Any particular projects or inspirations on your mind?`
      ];
      return { response: creativeResponses[Math.floor(Math.random() * creativeResponses.length)], includeProducts: false };
    }

    // Personal and emotional topics with enhanced empathy
    if (queryLower.match(/\b(feeling|emotion|happy|sad|stressed|worried|excited|love|relationship|family|friend)\b/)) {
      updateContext(userQuery, 'emotional');
      
      const contextualPrefix = context.userName ? `${context.userName}, ` : '';
      const emotionalResponses = [
        `${contextualPrefix}emotions are such a rich and meaningful part of the human experience. ${hasHistory ? 'From our conversation, I can sense you\'re someone who thinks deeply about things, which often means feeling deeply too.' : ''} Whether you're excited about something new, working through challenges, celebrating joyful moments, or just processing the complexity of daily life, I'm here to listen and engage genuinely. Sometimes talking through our thoughts and feelings brings clarity and comfort. What's on your heart today?`,
        `${contextualPrefix}I find human emotions fascinating and deeply meaningful - they color every experience and drive so much of what makes life worth living. ${recentTopics.length > 0 ? `Our discussion about ${recentTopics.slice(-1)[0]} shows how different topics can evoke different feelings and connections.` : ''} Whether you want to share something that's exciting you, work through something challenging, or just explore what you're feeling, I'm here for genuine conversation. How are you doing, really?`,
        `${contextualPrefix}feelings and relationships are truly at the core of what makes us human. ${hasHistory ? 'I appreciate how open and thoughtful you\'ve been in our conversation - it takes emotional intelligence to engage meaningfully like this.' : ''} From the joy of deep connections to the growth that comes from navigating challenges, emotions guide our journey through life. I'm here to listen and engage with whatever you'd like to share or explore. What's been on your mind emotionally?`
      ];
      return { response: emotionalResponses[Math.floor(Math.random() * emotionalResponses.length)], includeProducts: false };
    }

    // Fun and entertainment with personalization
    if (queryLower.match(/\b(fun|game|movie|book|hobby|entertainment|joke|funny|laugh)\b/)) {
      updateContext(userQuery, 'entertainment');
      
      const contextualPrefix = context.userName ? `${context.userName}, ` : '';
      const funResponses = [
        `${contextualPrefix}life should definitely have plenty of fun and laughter! ${hasHistory ? 'I love how our conversation can be both thoughtful and enjoyable - that\'s the perfect balance.' : ''} Whether it's getting completely absorbed in a great book, binge-watching an amazing series, diving into gaming adventures, or pursuing hobbies that bring pure joy - these experiences add color and excitement to life. What's been bringing you happiness lately? Any recent discoveries in entertainment or fun activities?`,
        `${contextualPrefix}entertainment and fun are absolutely essential for the soul! ${recentTopics.length > 0 ? `Even with our deeper discussions about ${recentTopics.slice(-1)[0]}, it\'s important to balance meaningful conversations with pure enjoyment.` : ''} From epic movie marathons to discovering new books, from gaming with friends to creative hobbies that make you lose track of time - these experiences enrich our lives in wonderful ways. What's your latest source of fun or entertainment? I'm always curious about what makes different people smile!`,
        `${contextualPrefix}laughter and joy are genuinely some of life's greatest gifts! ${hasHistory ? 'I can tell from our conversation that you appreciate both depth and lightness, which makes for the most well-rounded people.' : ''} Whether it's through entertainment, hobbies, games, or just wonderfully silly conversations, finding moments of pure fun keeps life interesting and meaningful. What's been making you laugh or bringing you joy these days? Any recommendations for great entertainment?`
      ];
      return { response: funResponses[Math.floor(Math.random() * funResponses.length)], includeProducts: false };
    }

    // Food and lifestyle with enhanced interest
    if (queryLower.match(/\b(food|cooking|recipe|eat|drink|coffee|restaurant|lifestyle|health|fitness)\b/)) {
      updateContext(userQuery, 'lifestyle');
      
      const contextualPrefix = context.userName ? `${context.userName}, ` : '';
      const lifestyleResponses = [
        `${contextualPrefix}food and lifestyle choices are such personal and fascinating topics! ${hasHistory ? 'Given how thoughtfully you approach our conversation, I imagine you\'re intentional about your lifestyle choices too.' : ''} From exploring new cuisines that open up different cultures to finding healthy routines that make you feel amazing, from morning coffee rituals to cooking adventures that bring creativity into daily life - these experiences shape our well-being and happiness. What's your relationship with food and lifestyle? Any recent discoveries or favorite rituals?`,
        `${contextualPrefix}there's something genuinely wonderful about how food connects us to culture, comfort, and creativity! ${recentTopics.includes('creativity') ? 'This connects beautifully to our discussion about creativity - cooking and food culture are such expressive art forms!' : ''} Whether you're a passionate cook who finds joy in experimenting, a curious food explorer discovering new flavors, or someone focused on wellness and nutrition, these choices reflect who we are and what we value. What food experiences or lifestyle elements have been meaningful to you?`,
        `${contextualPrefix}lifestyle and wellness encompass so much richness - from the foods that nourish and delight us to how we stay active and energized, from daily routines that ground us to special treats that celebrate life! ${hasHistory ? 'Your mindful approach to conversation suggests you probably think intentionally about how you want to live and feel.' : ''} These choices reflect our values and contribute to overall happiness and fulfillment. What lifestyle elements are important to you? Any interesting food adventures or wellness discoveries lately?`
      ];
      return { response: lifestyleResponses[Math.floor(Math.random() * lifestyleResponses.length)], includeProducts: false };
    }

    // Shopping context responses with enhanced personalization
    if (queryLower.match(/\b(buy|purchase|shop|store|product|item|recommend|need|want|looking for)\b/)) {
      updateContext(userQuery, 'shopping');
      
      const contextualPrefix = context.userName ? `${context.userName}, ` : '';
      const shoppingResponses = [
        `${contextualPrefix}I'd love to help you find exactly what you're looking for! Shopping can be both exciting and overwhelming with endless choices available. ${hasHistory ? 'Based on our conversation, I have a better sense of your style and preferences now.' : ''} Whether you need something specific, want to explore options within a budget, or just feel like discovering something new, I can provide personalized recommendations that match your needs and taste. What kind of item has caught your interest?`,
        `${contextualPrefix}perfect! I'm here to make your shopping experience as smooth and enjoyable as possible. ${recentTopics.length > 0 ? `Given our chat about ${recentTopics.slice(-1)[0]}, I might have some interesting suggestions that align with your interests.` : ''} I can help you discover products that match your style, compare different options, find great deals, or even just browse for inspiration. Tell me about what you're hoping to find, and I'll provide some tailored suggestions!`,
        `${contextualPrefix}shopping is one of my favorite ways to help people! ${hasHistory ? 'I feel like I understand your preferences better now from our conversation, which helps me give better recommendations.' : ''} I can assist you in finding products that perfectly match your needs, style preferences, and budget. Whether you're looking for something practical, luxurious, unique, or specific to your interests, I have access to a wide range of options. What's sparked your shopping curiosity today?`
      ];
      return { response: shoppingResponses[Math.floor(Math.random() * shoppingResponses.length)], includeProducts: true };
    }

    // Thank you responses with memory
    if (queryLower.match(/\b(thank|thanks|appreciate|grateful)\b/)) {
      updateContext(userQuery, 'gratitude');
      
      const contextualPrefix = context.userName ? `${context.userName}, ` : '';
      const thankResponses = [
        `${contextualPrefix}you're so welcome! It genuinely makes me happy to be helpful and have meaningful conversations like ours. ${hasHistory ? `I've really enjoyed discussing ${recentTopics.join(' and ')} with you - your perspectives are thoughtful and interesting.` : 'Whether we\'re exploring deep topics or finding practical solutions, I appreciate the opportunity to connect and assist.'} Feel free to come back anytime you want to continue our chat or need help with anything!`,
        `${contextualPrefix}it's truly my pleasure! ${hasHistory ? `Our conversation about ${recentTopics.slice(-1)[0]} ${recentTopics.length > 1 ? `and ${recentTopics.slice(-2, -1)[0]}` : ''} has been genuinely engaging.` : ''} I find every conversation valuable and enjoy being able to help in whatever way I can. Your appreciation means a lot to me, and I hope our chat has been worthwhile for you too. I'm always here when you need assistance or just want to have an interesting discussion!`,
        `${contextualPrefix}thank you so much for saying that! ${hasHistory ? `I've genuinely enjoyed getting to know you through our conversation${recentTopics.length > 0 ? ` - especially talking about ${recentTopics.join(' and ')}` : ''}.` : ''} Whether it's answering questions, helping with decisions, exploring ideas, or just having good conversations, these interactions are what make my existence meaningful. Please don't hesitate to reach out again whenever you want to chat or need help!`
      ];
      return { response: thankResponses[Math.floor(Math.random() * thankResponses.length)], includeProducts: false };
    }

    // Weather and time with conversational depth
    if (queryLower.match(/\b(weather|rain|sunny|cold|hot|temperature|season|time|day|today)\b/)) {
      updateContext(userQuery, 'general');
      
      const contextualPrefix = context.userName ? `${context.userName}, ` : '';
      const weatherResponses = [
        `${contextualPrefix}while I can't check the current weather for your specific location, I absolutely love how weather and seasons influence our moods and activities! ${hasHistory ? 'Given our engaging conversation, I imagine you\'re someone who appreciates these natural rhythms and their effects on daily life.' : ''} There's something special about each type of weather - from cozy rainy days perfect for reading and reflection to sunny afternoons that call for adventures and outdoor exploration. How does today's weather make you feel? Are you someone who adapts activities to the weather or has a favorite type of day?`,
        `${contextualPrefix}weather has such a profound impact on our daily lives and emotions, doesn't it? ${recentTopics.includes('creativity') ? 'Artists and creative people often find different weather inspiring in unique ways.' : ''} I find it fascinating how different people are energized by completely different conditions - some love the drama and coziness of storms while others thrive in bright sunshine. Weather also influences so many of our choices, from what we wear to what activities we enjoy. What's your favorite type of weather, and how do you like to spend those perfect weather days?`,
        `${contextualPrefix}the rhythm of seasons and daily weather patterns connects us to the natural world in such beautiful ways! ${hasHistory ? 'Your thoughtful nature suggests you probably notice and appreciate these natural cycles.' : ''} Each type of weather brings its own mood and possibilities - from the fresh energy and renewal of spring rain to the cozy comfort and introspection of winter evenings. I love how weather can completely transform the same familiar places. How do you like to adapt your activities and mood to different weather conditions?`
      ];
      return { response: weatherResponses[Math.floor(Math.random() * weatherResponses.length)], includeProducts: false };
    }

    // Travel and places with enhanced engagement
    if (queryLower.match(/\b(travel|trip|vacation|country|city|place|visit|explore|adventure)\b/)) {
      updateContext(userQuery, 'travel');
      
      const contextualPrefix = context.userName ? `${context.userName}, ` : '';
      const travelResponses = [
        `${contextualPrefix}travel and exploration open up such incredible worlds and perspectives! ${hasHistory ? 'From our conversation, I can tell you\'re someone who appreciates depth and meaning, which makes travel so much richer.' : ''} Whether it's discovering new cultures that challenge your assumptions, tasting exotic foods that become lifelong favorites, seeing breathtaking landscapes that take your breath away, or simply experiencing different ways of life, travel enriches our perspective in profound ways. Where has your wanderlust taken you, or where would you love to go? What kind of travel experiences call to your adventurous spirit?`,
        `${contextualPrefix}there's something genuinely magical about exploring new places and immersing yourself in different cultures! ${recentTopics.includes('creativity') ? 'Travel is such a creative inspiration too - new places spark fresh ideas and perspectives.' : ''} From the excitement of planning a trip and anticipating new discoveries to the wonder of finding unexpected gems and meaningful connections, travel creates memories and changes us in lasting ways. Even local exploration can reveal amazing surprises in familiar places. What destinations or types of experiences spark your curiosity? Are you more drawn to cultural immersion, natural beauty, adventure, or urban exploration?`,
        `${contextualPrefix}the world is so beautifully diverse, and travel lets us experience that diversity firsthand in transformative ways! ${hasHistory ? 'Your thoughtful approach to conversation suggests you\'re probably someone who travels mindfully and appreciates the deeper aspects of new places.' : ''} Whether you prefer bustling cities with endless energy, serene natural settings that restore your soul, historical sites that connect you to the past, or cultural immersion that broadens your worldview, each journey teaches us something valuable about the world and ourselves. What draws you to travel? Any upcoming adventures or dream destinations on your mind?`
      ];
      return { response: travelResponses[Math.floor(Math.random() * travelResponses.length)], includeProducts: false };
    }

    // Work and career with thoughtful approach
    if (queryLower.match(/\b(work|job|career|business|professional|office|colleague|boss|employee)\b/)) {
      updateContext(userQuery, 'professional');
      
      const contextualPrefix = context.userName ? `${context.userName}, ` : '';
      const workResponses = [
        `${contextualPrefix}work and career development are such significant parts of life and personal fulfillment! ${hasHistory ? 'From our conversation, I can tell you\'re someone who thinks deeply about meaningful topics, which probably extends to how you approach your professional life too.' : ''} Whether you're passionate about your current role, exploring new opportunities that align with your values, dealing with workplace dynamics, or thinking about long-term goals that excite you, these topics touch on both practical concerns and personal meaning. How's your professional journey going? What aspects of work life are most important to you right now?`,
        `${contextualPrefix}the world of work is constantly evolving, and finding meaning and satisfaction in our professional lives feels increasingly important! ${recentTopics.includes('creativity') ? 'I imagine you\'re someone who values creativity and thoughtfulness in your work approach too.' : ''} Whether you're navigating office relationships, pursuing entrepreneurial dreams, developing new skills that challenge you, or working on better work-life integration, these challenges and opportunities shape so much of our daily experience and sense of purpose. What aspects of your professional world are on your mind lately?`,
        `${contextualPrefix}career and professional growth involve such a fascinating mix of skills, relationships, personal goals, and deeply held values! ${hasHistory ? 'Your thoughtful engagement in our conversation suggests you probably approach professional development with the same intentionality.' : ''} From finding roles that truly align with our passions and strengths to building meaningful professional relationships that inspire us, the workplace can be a rich environment for both challenges and tremendous growth. What's been your experience in the professional world? Any exciting developments or areas you\'re focusing on?`
      ];
      return { response: workResponses[Math.floor(Math.random() * workResponses.length)], includeProducts: false };
    }

    // Default conversational responses with enhanced context awareness
    const conversationalFallbacks = hasHistory && context.userName ? [
      `${context.userName}, that's a really intriguing topic! ${recentTopics.length > 0 ? `I love how our conversation has evolved from ${recentTopics[0]} to this.` : ''} Every interaction teaches me something new about human perspective and the fascinating complexity of individual experiences. What draws you to thinking about this particular subject? I'm genuinely curious about your personal connection to it.`,
      `That's fascinating, ${context.userName}! ${recentTopics.length > 1 ? `Our chat has covered such interesting ground - from ${recentTopics.slice(-2).join(' to ')} and now this.` : ''} I find that the most engaging conversations happen when we explore topics that genuinely matter to us. Your unique perspective always adds depth to whatever we discuss. What aspects of this resonate most with your experiences or interests?`,
      `${context.userName}, you've brought up something really thought-provoking! ${hasHistory ? 'I appreciate how thoughtful your contributions to our conversation have been.' : ''} One thing I love about chatting with curious people like you is how discussions can reveal new ways of understanding complex topics. Tell me more about what sparked this particular line of thinking - I'm genuinely interested in your viewpoint.`,
      `What an interesting direction for our conversation, ${context.userName}! ${recentTopics.length > 0 ? `We've explored ${recentTopics.join(' and ')}, and now this - I love how organically conversations evolve.` : ''} Your perspective consistently brings unique insights to whatever we discuss. What's your personal relationship with this topic? I'd love to understand what makes it meaningful or intriguing to you.`
    ] : [
      "That's a really interesting topic! I love exploring different subjects and perspectives with people. Every conversation teaches me something new about human experience and the world. What aspects of this topic fascinate you most? I'm genuinely curious to hear your thoughts and experiences.",
      "You've brought up something thought-provoking! I find that the most engaging conversations happen when we dive into topics that matter to us personally. Whether it's something you're passionate about, curious about, or even struggling with, I'm here to explore it together. What draws you to this subject?",
      "I appreciate you sharing that with me! One of the things I love most about conversations is how they can take unexpected turns and reveal new ways of thinking about things. Your perspective is unique and valuable. Tell me more about what's on your mind - I'm genuinely interested in understanding your viewpoint.",
      "What an intriguing direction for our conversation! I find that every person brings their own unique insights and experiences to any topic, which makes discussions so rich and rewarding. I'm curious to learn more about your thoughts on this. What's your personal connection to or interest in this area?",
      "That's definitely worth talking about! I believe that meaningful conversations happen when we're genuinely curious about each other's perspectives and experiences. Whether this is something you've been thinking about deeply or just occurred to you, I'd love to explore it further with you. What would you like to dive into?"
    ];

    const response = conversationalFallbacks[Math.floor(Math.random() * conversationalFallbacks.length)];
    updateContext(userQuery, 'general');
    return { response, includeProducts: false };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    console.log('Sending message:', userMessage); // Debug log
    
    addUserMessage(userMessage);
    setInputValue('');
    setIsTyping(true);

    try {
      // Simulate AI thinking time
      setTimeout(() => {
        const aiResponse = generateAIResponse(userMessage);
        const recommendations = aiResponse.includeProducts ? getProductRecommendations(userMessage, currentProduct) : [];
        
        console.log('AI Response:', aiResponse.response); // Debug log
        console.log('Include Products:', aiResponse.includeProducts); // Debug log
        console.log('Recommendations:', recommendations); // Debug log
        console.log('Updated Context:', context); // Debug log
        
        addBotMessage(aiResponse.response, recommendations);
        setIsTyping(false);
      }, 1500); // Increased delay for better UX
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      addBotMessage('Sorry, I encountered an error. Please try again.');
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      console.log('Enter key pressed with value:', inputValue); // Debug log
      handleSendMessage();
    }
  };

  const quickQuestions = currentProduct ? [
    "Tell me about this product",
    "Show me similar items", 
    "What do you think of this?",
    "Hi! What's your name?",
    "How are you today?",
    "What can we talk about?"
  ] : [
    "Hi! What's your name?",
    "How are you feeling?",
    "What's life like as an AI?",
    "Tell me something interesting",
    "What's your favorite topic?",
    "Show me popular products",
    "Help me find something"
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-4 right-4 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="!rounded-full !w-14 !h-14 !p-0 shadow-lg hover:shadow-xl !bg-blue-600 hover:!bg-blue-700"
          >
            <MessageCircle className="w-6 h-6 !text-white" />
          </Button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-600 text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <span className="!font-semibold !text-white">Shopping Assistant</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-blue-700 rounded transition-colors"
            >
              <X className="w-4 h-4 !text-white" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'bot' && (
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-blue-600" />
                  </div>
                )}
                
                <div className={`max-w-[280px] ${message.type === 'user' ? 'order-first' : ''}`}>
                  <div
                    className={`p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-600 !text-white ml-auto'
                        : 'bg-gray-100 !text-gray-900'
                    }`}
                  >
                    <div className="whitespace-pre-line">
                      {message.content}
                    </div>
                  </div>
                  
                  {/* Product Recommendations */}
                  {message.products && message.products.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.products.map((product) => (
                        <Link
                          key={product.id}
                          href={`/products/${product.id}`}
                          className="block p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <div className="flex gap-3">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0"></div>
                            <div className="flex-1 min-w-0">
                              <h4 className="!font-semibold !text-gray-900 text-sm truncate">
                                {product.name}
                              </h4>
                              <p className="!text-blue-600 !font-semibold text-sm">
                                {formatPrice(product.price)}
                              </p>
                              <p className="!text-gray-500 text-xs">
                                ⭐ {product.rating.toFixed(1)} ({product.reviews})
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {message.type === 'user' && (
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-blue-600" />
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 1 && (
            <div className="p-4 border-t border-gray-200">
              <p className="text-xs !text-gray-500 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question) => (
                  <button
                    key={question}
                    onClick={() => {
                      addUserMessage(question);
                      setIsTyping(true);
                      
                      // Simulate AI thinking time
                      setTimeout(() => {
                        const aiResponse = generateAIResponse(question);
                        const recommendations = aiResponse.includeProducts ? getProductRecommendations(question, currentProduct) : [];
                        
                        addBotMessage(aiResponse.response, recommendations);
                        setIsTyping(false);
                      }, 800 + Math.random() * 400); // Variable delay for more natural feel
                    }}
                    className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full !text-gray-700 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => {
                  console.log('Input changed to:', e.target.value); // Debug log
                  setInputValue(e.target.value);
                }}
                onKeyPress={handleKeyPress}
                placeholder={isTyping ? "AI is thinking..." : "Ask me anything..."}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 !text-gray-900 bg-white text-sm"
                disabled={isTyping}
                autoComplete="off"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                size="sm"
                className="!p-2 !bg-blue-600 hover:!bg-blue-700 disabled:!bg-gray-400"
                title="Send message"
              >
                <Send className="w-4 h-4 !text-white" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbot;