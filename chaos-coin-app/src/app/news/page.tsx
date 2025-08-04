'use client';

import { useState, useEffect } from "react";
import { useActiveAccount } from "thirdweb/react";
import { TREASURY_ADDRESS } from "@/lib/contract";
import { fetchCryptoNews } from "@/lib/newsApi";
import { sanitizeContent } from "@/lib/security";

interface Post {
  id: string;
  content: string;
  author: string;
  timestamp: string;
  likes: number;
  reposts: number;
  pinned: boolean;
  media?: {
    type: 'image' | 'video';
    url: string;
  };
  poll?: {
    question: string;
    options: { text: string; votes: number }[];
  };
}

export default function NewsPage() {
  const account = useActiveAccount();
  const [posts, setPosts] = useState<Post[]>([]);
  const [news, setNews] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(true);
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState(["", ""]);

  const isAdmin = account?.address?.toLowerCase() === TREASURY_ADDRESS.toLowerCase();

  useEffect(() => {
    // Load posts from localStorage
    const savedPosts = localStorage.getItem('chaoscoin_posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }

    // Load crypto news
    const loadNews = async () => {
      try {
        const newsData = await fetchCryptoNews();
        setNews(newsData.slice(0, 10));
      } catch (error) {
        console.error('Error loading news:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  const savePosts = (updatedPosts: Post[]) => {
    setPosts(updatedPosts);
    localStorage.setItem('chaoscoin_posts', JSON.stringify(updatedPosts));
  };

  const createPost = () => {
    if (!newPost.trim() || !isAdmin) return;

    const post: Post = {
      id: Date.now().toString(),
      content: sanitizeContent(newPost),
      author: 'Chaos Coin Official',
      timestamp: new Date().toISOString(),
      likes: 0,
      reposts: 0,
      pinned: false
    };

    if (showPollCreator && pollQuestion.trim()) {
      post.poll = {
        question: sanitizeContent(pollQuestion),
        options: pollOptions.filter(opt => opt.trim()).map(opt => ({
          text: sanitizeContent(opt),
          votes: 0
        }))
      };
    }

    const updatedPosts = [post, ...posts];
    savePosts(updatedPosts);
    setNewPost("");
    setPollQuestion("");
    setPollOptions(["", ""]);
    setShowPollCreator(false);
  };

  const togglePin = (postId: string) => {
    const updatedPosts = posts.map(post =>
      post.id === postId ? { ...post, pinned: !post.pinned } : post
    );
    savePosts(updatedPosts);
  };

  const deletePost = (postId: string) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    savePosts(updatedPosts);
  };

  const likePost = (postId: string) => {
    const updatedPosts = posts.map(post =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
    savePosts(updatedPosts);
  };

  const voteOnPoll = (postId: string, optionIndex: number) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId && post.poll) {
        const updatedOptions = post.poll.options.map((option, index) =>
          index === optionIndex ? { ...option, votes: option.votes + 1 } : option
        );
        return { ...post, poll: { ...post.poll, options: updatedOptions } };
      }
      return post;
    });
    savePosts(updatedPosts);
  };

  const sortedPosts = [...posts].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          News & Social Feed
        </h1>
        <p className="text-gray-400 text-lg">
          Latest updates from Chaos Coin and crypto news
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Social Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Admin Post Creator */}
          {isAdmin && (
            <div className="defi-card">
              <h3 className="text-xl font-semibold text-white mb-4">Create Post</h3>
              
              <div className="space-y-4">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="What's happening with Chaos Coin?"
                  className="defi-input w-full h-24 resize-none"
                  maxLength={280}
                />
                
                {showPollCreator && (
                  <div className="space-y-3 p-4 bg-slate-700/30 rounded-lg">
                    <input
                      type="text"
                      value={pollQuestion}
                      onChange={(e) => setPollQuestion(e.target.value)}
                      placeholder="Poll question..."
                      className="defi-input w-full"
                    />
                    {pollOptions.map((option, index) => (
                      <input
                        key={index}
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...pollOptions];
                          newOptions[index] = e.target.value;
                          setPollOptions(newOptions);
                        }}
                        placeholder={`Option ${index + 1}...`}
                        className="defi-input w-full"
                      />
                    ))}
                    <button
                      onClick={() => setPollOptions([...pollOptions, ""])}
                      className="btn-secondary text-sm"
                    >
                      Add Option
                    </button>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowPollCreator(!showPollCreator)}
                      className="btn-secondary text-sm"
                    >
                      📊 Poll
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400 text-sm">{newPost.length}/280</span>
                    <button
                      onClick={createPost}
                      disabled={!newPost.trim()}
                      className="btn-primary"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Posts Feed */}
          <div className="space-y-4">
            {sortedPosts.map((post) => (
              <div key={post.id} className={`defi-card ${post.pinned ? 'border-green-500' : ''}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">C</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{post.author}</h4>
                      <p className="text-gray-400 text-sm">
                        {new Date(post.timestamp).toLocaleString()}
                        {post.pinned && <span className="ml-2 text-green-400">📌 Pinned</span>}
                      </p>
                    </div>
                  </div>
                  
                  {isAdmin && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => togglePin(post.id)}
                        className="text-gray-400 hover:text-green-400"
                      >
                        📌
                      </button>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        🗑️
                      </button>
                    </div>
                  )}
                </div>
                
                <p className="text-gray-300 mb-4">{post.content}</p>
                
                {post.poll && (
                  <div className="bg-slate-700/30 p-4 rounded-lg mb-4">
                    <h5 className="text-white font-medium mb-3">{post.poll.question}</h5>
                    <div className="space-y-2">
                      {post.poll.options.map((option, index) => {
                        const totalVotes = post.poll!.options.reduce((sum, opt) => sum + opt.votes, 0);
                        const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                        
                        return (
                          <button
                            key={index}
                            onClick={() => voteOnPoll(post.id, index)}
                            className="w-full text-left p-3 bg-slate-600/30 hover:bg-slate-600/50 rounded-lg transition-colors"
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-white">{option.text}</span>
                              <span className="text-gray-400 text-sm">{option.votes} votes</span>
                            </div>
                            <div className="mt-2 bg-slate-700 rounded-full h-2">
                              <div
                                className="bg-green-400 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center space-x-4 text-gray-400">
                  <button
                    onClick={() => likePost(post.id)}
                    className="flex items-center space-x-1 hover:text-red-400 transition-colors"
                  >
                    <span>❤️</span>
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-green-400 transition-colors">
                    <span>🔄</span>
                    <span>{post.reposts}</span>
                  </button>
                  <button className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
                    <span>📤</span>
                    <span>Share</span>
                  </button>
                </div>
              </div>
            ))}
            
            {sortedPosts.length === 0 && (
              <div className="defi-card text-center">
                <p className="text-gray-400">No posts yet. Check back later for updates!</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Crypto News */}
        <div className="space-y-6">
          <div className="defi-card">
            <h3 className="text-xl font-semibold text-white mb-4">Crypto News</h3>
            
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-700 h-4 rounded mb-2"></div>
                    <div className="bg-gray-700 h-3 rounded w-3/4 mb-3"></div>
                    <div className="bg-gray-700 h-2 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {news.map((item: any, index) => (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:bg-slate-700/50 p-3 rounded-lg transition-colors"
                  >
                    <h4 className="text-white text-sm font-medium mb-2 line-clamp-3">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 text-xs mb-2 line-clamp-2">
                      {item.description}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {item.source} • {new Date(item.pubDate).toLocaleDateString()}
                    </p>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Community Links */}
          <div className="defi-card">
            <h3 className="text-xl font-semibold text-white mb-4">Community</h3>
            <div className="space-y-3">
              {[
                { name: 'Discord', url: 'https://discord.com/channels/1398769618088231042/1398769618692345918', icon: '💬' },
                { name: 'Twitter', url: 'https://twitter.com/ChaosCoin_', icon: '🐦' },
                { name: 'Telegram', url: 'https://t.me/chaoscoin', icon: '📱' },
                { name: 'Instagram', url: 'https://www.instagram.com/Chaos_Coin_/', icon: '📸' },
                { name: 'TikTok', url: 'https://www.tiktok.com/@ChaosCoin_', icon: '🎵' }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg transition-colors"
                >
                  <span className="text-xl">{social.icon}</span>
                  <span className="text-white font-medium">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}