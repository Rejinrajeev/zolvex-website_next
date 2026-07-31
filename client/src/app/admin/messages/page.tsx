"use client";

import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import {
  MessageSquare,
  Star,
  CheckCircle2,
  Mail,
  Phone,
  Clock,
  RefreshCw,
  Search,
  Trash2,
  Archive,
  Send,
  Eye,
  X,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  Check,
  Ban
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchWithAuth } from "@/lib/api";

interface Message {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  service: string;
  message: string;
  status: "unread" | "read" | "replied" | "archived" | "spam";
  priority: "low" | "normal" | "high";
  adminReply?: string;
  repliedAt?: string;
  createdAt: string;
}

interface Review {
  _id: string;
  customerName: string;
  customerLocation: string;
  rating: number;
  comment: string;
  serviceName: string;
  status: "pending" | "approved" | "rejected";
  isFeatured: boolean;
  adminNote?: string;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [activeTab, setActiveTab] = useState<"messages" | "reviews">("messages");

  // Contact Messages State
  const [messages, setMessages] = useState<Message[]>([]);
  const [msgUnreadCount, setMsgUnreadCount] = useState(0);
  const [msgSearch, setMsgSearch] = useState("");
  const [msgStatusFilter, setMsgStatusFilter] = useState("all");
  const [msgPriorityFilter, setMsgPriorityFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyContent, setReplyContent] = useState("");

  // Testimonials Moderation State
  const [reviews, setReviews] = useState<Review[]>([]);
  const [revPendingCount, setRevPendingCount] = useState(0);
  const [revSearch, setRevSearch] = useState("");
  const [revStatusFilter, setRevStatusFilter] = useState("all");
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchData();
  }, [msgStatusFilter, msgPriorityFilter, revStatusFilter]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const msgUrl = `/api/v1/admin/contact-messages?status=${msgStatusFilter}&priority=${msgPriorityFilter}`;
      const revUrl = `/api/v1/admin/reviews?status=${revStatusFilter}`;

      const [msgRes, revRes] = await Promise.all([
        fetchWithAuth(msgUrl),
        fetchWithAuth(revUrl)
      ]);

      const msgJson = await msgRes.json();
      const revJson = await revRes.json();

      if (msgJson.success && msgJson.data) {
        setMessages(msgJson.data.items || []);
        setMsgUnreadCount(msgJson.data.unreadCount || 0);
      }

      if (revJson.success && revJson.data) {
        setReviews(revJson.data.items || []);
        setRevPendingCount(revJson.data.pendingCount || 0);
      }
    } catch (e) {
      console.warn("Failed to fetch messages/reviews:", e);
    } finally {
      setLoading(false);
    }
  };

  /* Contact Message Actions */
  const handleUpdateMessageStatus = async (id: string, status?: string, priority?: string) => {
    try {
      const res = await fetchWithAuth(`/api/v1/admin/contact-messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, priority })
      });
      const json = await res.json();
      if (json.success) {
        setSuccessMsg("Message updated successfully.");
        await fetchData();
        if (selectedMessage && selectedMessage._id === id) {
          setSelectedMessage(json.data);
        }
      }
    } catch (e) {
      setErrorMsg("Failed to update message");
    }
  };

  const handleReplyMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMessage || !replyContent.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetchWithAuth(`/api/v1/admin/contact-messages/${selectedMessage._id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminReply: replyContent })
      });
      const json = await res.json();
      if (json.success) {
        setSuccessMsg("Admin reply saved and message status set to Replied.");
        setReplyContent("");
        await fetchData();
        setSelectedMessage(json.data);
      }
    } catch (e) {
      setErrorMsg("Failed to save admin reply");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact message?")) return;
    try {
      const res = await fetchWithAuth(`/api/v1/admin/contact-messages/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setMessages(prev => prev.filter(m => m._id !== id));
        if (selectedMessage?._id === id) setSelectedMessage(null);
        setSuccessMsg("Contact message deleted.");
      }
    } catch (e) {
      setErrorMsg("Failed to delete message");
    }
  };

  /* Testimonial Moderation Actions */
  const handleApproveReview = async (id: string) => {
    try {
      const res = await fetchWithAuth(`/api/v1/admin/reviews/${id}/approve`, { method: "PATCH" });
      const json = await res.json();
      if (json.success) {
        setSuccessMsg("Testimonial approved! Now live on public site.");
        await fetchData();
      }
    } catch (e) {
      setErrorMsg("Failed to approve review");
    }
  };

  const handleRejectReview = async (id: string) => {
    try {
      const res = await fetchWithAuth(`/api/v1/admin/reviews/${id}/reject`, { method: "PATCH" });
      const json = await res.json();
      if (json.success) {
        setSuccessMsg("Testimonial rejected.");
        await fetchData();
      }
    } catch (e) {
      setErrorMsg("Failed to reject review");
    }
  };

  const handleToggleFeatured = async (rev: Review) => {
    try {
      const res = await fetchWithAuth(`/api/v1/admin/reviews/${rev._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: !rev.isFeatured })
      });
      const json = await res.json();
      if (json.success) {
        setSuccessMsg(rev.isFeatured ? "Removed from homepage." : "Featured on homepage!");
        await fetchData();
      }
    } catch (e) {
      setErrorMsg("Failed to update review");
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      const res = await fetchWithAuth(`/api/v1/admin/reviews/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setReviews(prev => prev.filter(r => r._id !== id));
        setSuccessMsg("Testimonial deleted.");
      }
    } catch (e) {
      setErrorMsg("Failed to delete review");
    }
  };

  const filteredMessages = messages.filter(m =>
    m.name.toLowerCase().includes(msgSearch.toLowerCase()) ||
    m.email.toLowerCase().includes(msgSearch.toLowerCase()) ||
    m.subject.toLowerCase().includes(msgSearch.toLowerCase())
  );

  const filteredReviews = reviews.filter(r =>
    r.customerName.toLowerCase().includes(revSearch.toLowerCase()) ||
    r.comment.toLowerCase().includes(revSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row transition-colors duration-200">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center space-x-2 text-foreground">
              <MessageSquare className="w-7 h-7 text-primary" />
              <span>Contact Messages & Testimonials Moderation</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted mt-1">
              Respond to customer inquiries, manage contact priority, and moderate user testimonials for public display.
            </p>
          </div>

          <Button
            onClick={fetchData}
            className="bg-card hover:bg-secondaryBg text-foreground border border-border font-bold text-xs px-4 py-2 rounded-xl transition-all flex items-center space-x-2 shadow-xs"
          >
            <RefreshCw className="w-4 h-4 text-primary" />
            <span>Refresh Data</span>
          </Button>
        </div>

        {/* Notifications */}
        {successMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-bold flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Tab Selector */}
        <div className="flex space-x-3 border-b border-border pb-3 mb-6">
          <button
            onClick={() => setActiveTab("messages")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === "messages"
                ? "bg-primary text-white shadow-md"
                : "bg-card text-muted border border-border hover:border-primary"
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Contact Messages</span>
            {msgUnreadCount > 0 && (
              <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-red-500 text-white">
                {msgUnreadCount} New
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === "reviews"
                ? "bg-primary text-white shadow-md"
                : "bg-card text-muted border border-border hover:border-primary"
            }`}
          >
            <Star className="w-4 h-4" />
            <span>Testimonial Moderation</span>
            {revPendingCount > 0 && (
              <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-white">
                {revPendingCount} Pending
              </span>
            )}
          </button>
        </div>

        {/* TAB 1: CONTACT MESSAGES */}
        {activeTab === "messages" && (
          <div className="space-y-6">
            
            {/* Filters Bar */}
            <div className="bg-card border border-border p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, email, or subject..."
                  value={msgSearch}
                  onChange={(e) => setMsgSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-secondaryBg/30 border border-border text-xs text-foreground focus:border-primary outline-none"
                />
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <select
                  value={msgStatusFilter}
                  onChange={(e) => setMsgStatusFilter(e.target.value)}
                  className="p-2 rounded-xl bg-secondaryBg/30 border border-border text-xs text-foreground outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="unread">Unread Only</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                  <option value="archived">Archived</option>
                </select>

                <select
                  value={msgPriorityFilter}
                  onChange={(e) => setMsgPriorityFilter(e.target.value)}
                  className="p-2 rounded-xl bg-secondaryBg/30 border border-border text-xs text-foreground outline-none"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High Priority</option>
                  <option value="normal">Normal</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            {/* Messages List */}
            {loading ? (
              <div className="text-center py-16">
                <RefreshCw className="w-8 h-8 animate-spin text-primary mx-auto mb-2" />
                <p className="text-xs font-semibold text-muted">Loading contact messages...</p>
              </div>
            ) : filteredMessages.length === 0 ? (
              <div className="bg-card border border-border p-12 rounded-3xl text-center space-y-2">
                <Mail className="w-10 h-10 text-muted mx-auto" />
                <h3 className="text-sm font-bold text-foreground">No contact messages found</h3>
                <p className="text-xs text-muted">No messages match the selected filters or search query.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredMessages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`bg-card border rounded-2xl p-5 space-y-3 transition-all shadow-xs ${
                      msg.status === "unread" ? "border-primary/50 bg-primary/5" : "border-border"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
                      
                      <div className="flex items-center space-x-3">
                        <span className="font-extrabold text-foreground text-sm">{msg.name}</span>
                        
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${
                          msg.status === "unread"
                            ? "bg-red-500/10 text-red-500 border-red-500/30"
                            : msg.status === "replied"
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
                            : "bg-secondaryBg text-muted border-border"
                        }`}>
                          {msg.status}
                        </span>

                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase ${
                          msg.priority === "high" ? "bg-red-500 text-white" : "bg-secondaryBg text-muted"
                        }`}>
                          {msg.priority}
                        </span>
                      </div>

                      <span className="text-[11px] font-mono text-muted">
                        {new Date(msg.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted font-mono">
                      <span className="flex items-center space-x-1">
                        <Mail className="w-3.5 h-3.5 text-primary" />
                        <span>{msg.email}</span>
                      </span>
                      {msg.phone && (
                        <span className="flex items-center space-x-1">
                          <Phone className="w-3.5 h-3.5 text-primary" />
                          <span>{msg.phone}</span>
                        </span>
                      )}
                    </div>

                    <div className="pt-2 text-xs text-foreground bg-secondaryBg/30 p-3 rounded-xl border border-border">
                      <strong className="text-foreground block mb-1 font-bold">{msg.subject || "General Inquiry"}</strong>
                      <p className="whitespace-pre-wrap">{msg.message}</p>
                    </div>

                    {msg.adminReply && (
                      <div className="bg-primary/10 border border-primary/20 p-3 rounded-xl text-xs space-y-1">
                        <strong className="text-primary block font-bold">Admin Response ({new Date(msg.repliedAt!).toLocaleDateString()}):</strong>
                        <p className="text-foreground">{msg.adminReply}</p>
                      </div>
                    )}

                    {/* Action Toolbar */}
                    <div className="pt-3 border-t border-border flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={() => setSelectedMessage(msg)}
                          className="py-1.5 px-3 rounded-lg bg-primary hover:bg-primaryHover text-white text-xs font-bold flex items-center space-x-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View & Reply</span>
                        </Button>

                        <button
                          onClick={() => handleUpdateMessageStatus(msg._id, msg.status === "unread" ? "read" : "unread")}
                          className="px-3 py-1.5 rounded-lg bg-secondaryBg hover:bg-border text-foreground text-xs font-semibold"
                        >
                          Mark as {msg.status === "unread" ? "Read" : "Unread"}
                        </button>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleUpdateMessageStatus(msg._id, "archived")}
                          className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-secondaryBg"
                          title="Archive Message"
                        >
                          <Archive className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDeleteMessage(msg._id)}
                          className="p-2 rounded-lg text-muted hover:text-red-500 hover:bg-red-500/10"
                          title="Delete Message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* TAB 2: TESTIMONIAL MODERATION */}
        {activeTab === "reviews" && (
          <div className="space-y-6">
            
            {/* Review Filter Bar */}
            <div className="bg-card border border-border p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by customer name or review text..."
                  value={revSearch}
                  onChange={(e) => setRevSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-secondaryBg/30 border border-border text-xs text-foreground focus:border-primary outline-none"
                />
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <select
                  value={revStatusFilter}
                  onChange={(e) => setRevStatusFilter(e.target.value)}
                  className="p-2 rounded-xl bg-secondaryBg/30 border border-border text-xs text-foreground outline-none"
                >
                  <option value="all">All Moderation Statuses</option>
                  <option value="pending">Pending Moderation</option>
                  <option value="approved">Approved (Live)</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Reviews Grid */}
            {loading ? (
              <div className="text-center py-16">
                <RefreshCw className="w-8 h-8 animate-spin text-primary mx-auto mb-2" />
                <p className="text-xs font-semibold text-muted">Loading testimonials moderation queue...</p>
              </div>
            ) : filteredReviews.length === 0 ? (
              <div className="bg-card border border-border p-12 rounded-3xl text-center space-y-2">
                <Star className="w-10 h-10 text-muted mx-auto" />
                <h3 className="text-sm font-bold text-foreground">No testimonials found</h3>
                <p className="text-xs text-muted">No customer reviews match the selected filter criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredReviews.map((rev) => (
                  <div
                    key={rev._id}
                    className={`bg-card border p-5 rounded-2xl space-y-4 shadow-xs flex flex-col justify-between ${
                      rev.status === "pending"
                        ? "border-amber-500/50 bg-amber-500/5"
                        : rev.status === "approved"
                        ? "border-emerald-500/30"
                        : "border-border opacity-70"
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="font-extrabold text-foreground text-sm block">{rev.customerName}</span>
                          <span className="text-[11px] text-muted">{rev.customerLocation} • {rev.serviceName}</span>
                        </div>

                        <div className="flex items-center space-x-1 text-amber-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${i < rev.rating ? "fill-amber-500 text-amber-500" : "text-border"}`}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-foreground italic leading-relaxed bg-secondaryBg/30 p-3 rounded-xl border border-border">
                        "{rev.comment}"
                      </p>
                    </div>

                    <div className="pt-3 border-t border-border flex items-center justify-between gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${
                        rev.status === "approved"
                          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
                          : rev.status === "pending"
                          ? "bg-amber-500/10 text-amber-500 border-amber-500/30"
                          : "bg-red-500/10 text-red-500 border-red-500/30"
                      }`}>
                        {rev.status}
                      </span>

                      <div className="flex items-center space-x-2">
                        {rev.status !== "approved" && (
                          <button
                            onClick={() => handleApproveReview(rev._id)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center space-x-1 shadow-xs"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                        )}

                        {rev.status !== "rejected" && (
                          <button
                            onClick={() => handleRejectReview(rev._id)}
                            className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 text-xs font-bold flex items-center space-x-1"
                          >
                            <Ban className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        )}

                        {rev.status === "approved" && (
                          <button
                            onClick={() => handleToggleFeatured(rev)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              rev.isFeatured
                                ? "bg-primary text-white shadow-xs"
                                : "bg-secondaryBg text-muted hover:text-foreground border border-border"
                            }`}
                          >
                            {rev.isFeatured ? "Featured" : "Feature"}
                          </button>
                        )}

                        <button
                          onClick={() => handleDeleteReview(rev._id)}
                          className="p-1.5 rounded-lg text-muted hover:text-red-500 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* Message Reply Modal */}
        {selectedMessage && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-card border border-border p-6 rounded-3xl max-w-lg w-full space-y-4 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <h2 className="text-base font-bold text-foreground">Message Details & Reply</h2>
                <button onClick={() => setSelectedMessage(null)} className="text-muted hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-muted">
                  <span>From: <strong className="text-foreground">{selectedMessage.name}</strong> ({selectedMessage.email})</span>
                  <span className="font-mono">{new Date(selectedMessage.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="bg-secondaryBg/30 p-3 rounded-xl border border-border text-foreground space-y-1">
                  <strong className="block font-bold">{selectedMessage.subject}</strong>
                  <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>

              <form onSubmit={handleReplyMessage} className="space-y-3 pt-2">
                <label className="text-xs font-bold text-foreground block">Admin Reply Content</label>
                <textarea
                  rows={4}
                  required
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Type your response to the customer..."
                  className="w-full p-3 rounded-xl bg-secondaryBg/30 border border-border text-xs text-foreground outline-none focus:border-primary"
                ></textarea>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl bg-primary hover:bg-primaryHover text-white font-extrabold text-xs shadow-md flex items-center justify-center space-x-2"
                >
                  {submitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  <span>Save & Mark Replied</span>
                </Button>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
