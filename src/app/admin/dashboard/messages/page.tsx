"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, MailOpen, Trash2, Loader2, Clock } from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    // Placeholder - you'll need to create the API endpoint
    // fetchMessages();
    setIsLoading(false);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gray-800" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Messages</h1>
        <p className="text-gray-600">
          Contact form submissions - {messages.length} total
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center">
          <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No messages yet
          </h3>
          <p className="text-gray-600">
            Contact form submissions will appear here
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1 space-y-3">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                onClick={() => setSelectedMessage(message)}
                className={`bg-white rounded-lg border-2 p-4 cursor-pointer transition-all ${
                  selectedMessage?.id === message.id
                    ? "border-gray-800 shadow-lg"
                    : "border-gray-200 hover:border-gray-400"
                } ${!message.isRead ? "bg-blue-50" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    {message.isRead ? (
                      <MailOpen className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Mail className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3
                        className={`font-semibold text-gray-800 truncate ${
                          !message.isRead ? "font-bold" : ""
                        }`}
                      >
                        {message.name}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 truncate mb-1">
                      {message.subject}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {formatDate(message.createdAt)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Message Details */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {selectedMessage.subject}
                    </h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="font-medium">
                        {selectedMessage.name}
                      </span>
                      <span>{selectedMessage.email}</span>
                      <span>{formatDate(selectedMessage.createdAt)}</span>
                    </div>
                  </div>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {selectedMessage.message}
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 flex gap-3">
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 font-medium"
                  >
                    Reply via Email
                  </a>
                  <button className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
                    Mark as Unread
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-12 text-center h-full flex items-center justify-center">
                <div>
                  <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Select a message to view</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

