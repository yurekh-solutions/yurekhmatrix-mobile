import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@/src/styles/colors';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const suggestedQueries = [
  'Find TMT Bars under ₹50,000/MT',
  'Best stainless steel suppliers in Mumbai',
  'Construction materials for 500 sq.ft.',
  'Bulk cement suppliers with discounts',
  'Compare steel pipe prices',
];

export default function MiloAIScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m Milo, your AI procurement assistant. How can I help you find the right materials today?',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSendMessage = (query: string = inputText) => {
    if (!query.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: query,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    Keyboard.dismiss();

    // Simulate AI response
    setIsLoading(true);
    setTimeout(() => {
      const aiResponses: { [key: string]: string } = {
        'find tmt': 'I found 12 suppliers offering TMT bars below ₹50,000/MT. Would you like me to show you the best deals with fastest delivery?',
        'stainless steel': 'Premium stainless steel suppliers in Mumbai include JSW Steel, Jindal Stainless, and Tata Steel. Shall I get you quotes?',
        'construction materials': 'For 500 sq.ft., you\'ll need cement, sand, aggregates, and bricks. Let me calculate the exact quantities.',
        'cement suppliers': 'Several bulk cement suppliers offer 10-15% discounts on orders above 100 bags. Shall I filter by your location?',
        'compare steel pipe': 'I found price comparisons ranging from ₹8,000 to ₹15,000 per MT. Would you like details by grade or diameter?',
      };

      let response = 'I found several options for you. Would you like to see supplier details or proceed to get quotes?';
      for (const [key, value] of Object.entries(aiResponses)) {
        if (query.toLowerCase().includes(key)) {
          response = value;
          break;
        }
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 800);
  };

  const MessageBubble = ({ message }: { message: Message }) => {
    const isUser = message.type === 'user';
    return (
      <View style={[styles.messageRow, isUser && styles.messageRowUser]}>
        {!isUser && (
          <View style={styles.aiAvatar}>
            <MaterialCommunityIcons name="robot" size={18} color={colors.primary} />
          </View>
        )}
        <View
          style={[
            styles.messageBubble,
            isUser ? styles.userBubble : styles.aiBubble,
          ]}
        >
          <Text style={[styles.messageText, isUser && styles.userMessageText]}>
            {message.content}
          </Text>
          <Text style={[styles.messageTime, isUser && styles.userMessageTime]}>
            {message.timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.miloInfo}>
            <View style={styles.miloIcon}>
              <MaterialCommunityIcons name="robot" size={24} color={colors.primary} />
            </View>
            <View>
              <Text style={styles.miloName}>Milo AI</Text>
              <Text style={styles.miloStatus}>Online • Ready to help</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.infoButton}>
            <MaterialCommunityIcons name="information-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
        >
          {messages.length === 1 && messages[0].type === 'ai' && (
            <View style={styles.suggestionsContainer}>
              <Text style={styles.suggestionsTitle}>Popular Queries</Text>
              {suggestedQueries.map((query, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.suggestionButton}
                  onPress={() => handleSendMessage(query)}
                >
                  <MaterialCommunityIcons name="lightbulb-outline" size={16} color={colors.primary} />
                  <Text style={styles.suggestionText}>{query}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {isLoading && (
            <View style={styles.loadingContainer}>
              <View style={styles.aiAvatar}>
                <MaterialCommunityIcons name="robot" size={18} color={colors.primary} />
              </View>
              <View style={[styles.messageBubble, styles.aiBubble]}>
                <ActivityIndicator color={colors.primary} size="small" />
                <Text style={styles.typingText}>Milo is thinking...</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input Area */}
        <View style={styles.inputArea}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Ask Milo anything..."
              placeholderTextColor={colors.textLight}
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
              onPress={() => handleSendMessage()}
              disabled={!inputText.trim() || isLoading}
            >
              <MaterialCommunityIcons
                name="send"
                size={18}
                color={inputText.trim() ? colors.primary : colors.textLight}
              />
            </TouchableOpacity>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity style={styles.quickAction}>
              <MaterialCommunityIcons name="file-document-outline" size={16} color={colors.primary} />
              <Text style={styles.quickActionText}>Create RFQ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <MaterialCommunityIcons name="filter-outline" size={16} color={colors.primary} />
              <Text style={styles.quickActionText}>Filter Search</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <MaterialCommunityIcons name="bookmark-outline" size={16} color={colors.primary} />
              <Text style={styles.quickActionText}>Saved Queries</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.card,
  },
  miloInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  miloIcon: {
    width: 44,
    height: 44,
    backgroundColor: colors.accent,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  miloName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  miloStatus: {
    fontSize: 11,
    color: colors.success,
    fontWeight: '500',
  },
  infoButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesContainer: {
    flexGrow: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  suggestionsContainer: {
    marginBottom: 20,
  },
  suggestionsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 10,
    marginLeft: 4,
  },
  suggestionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.card,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  suggestionText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
    flex: 1,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  messageRowUser: {
    justifyContent: 'flex-end',
  },
  aiAvatar: {
    width: 32,
    height: 32,
    backgroundColor: colors.accent,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  messageBubble: {
    maxWidth: '85%',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },
  aiBubble: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  userBubble: {
    backgroundColor: colors.primary,
  },
  messageText: {
    fontSize: 13,
    color: colors.text,
    lineHeight: 18,
  },
  userMessageText: {
    color: '#fff',
  },
  messageTime: {
    fontSize: 9,
    color: colors.textLight,
    marginTop: 4,
  },
  userMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  loadingContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  typingText: {
    fontSize: 12,
    color: colors.textLight,
    marginLeft: 8,
  },
  inputArea: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.card,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    backgroundColor: colors.background,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingRight: 6,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: {
    flex: 1,
    fontSize: 13,
    color: colors.text,
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  quickAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    borderRadius: 6,
    paddingVertical: 8,
    gap: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickActionText: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: '600',
  },
});
