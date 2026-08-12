import { Phone, Mail, MapPin, Clock, Send, Loader2, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import api from '../api/axios'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Invalid email format';
    if (!formData.subject.trim()) errs.subject = 'Subject is required';
    if (!formData.message.trim()) errs.message = 'Message is required';
    else if (formData.message.trim().length < 10) errs.message = 'Message must be at least 10 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await api.post('/contact', formData);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setErrors({ form: 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-bg-subtle">
      {/* Header */}
      <section className="w-full bg-gray-900 text-white py-20 px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Get in Touch</h1>
        <p className="text-text-muted text-lg max-w-2xl mx-auto">
          Have questions about blood donation or need emergency assistance? We are here to help 24/7.
        </p>
      </section>

      <div className="max-w-6xl mx-auto px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info Sidebar */}
        <div className="space-y-6">
          <div className="bg-bg-surface p-6 rounded-2xl border border-border-subtle shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-text-base text-sm">Phone</h3>
                <a href="tel:+8801700000001" className="text-text-muted text-sm hover:text-primary transition-colors">+880 1700-000001</a>
              </div>
            </div>
          </div>

          <div className="bg-bg-surface p-6 rounded-2xl border border-border-subtle shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-text-base text-sm">Email</h3>
                <a href="mailto:hello@drops.com.bd" className="text-text-muted text-sm hover:text-primary transition-colors">hello@drops.com.bd</a>
              </div>
            </div>
          </div>

          <div className="bg-bg-surface p-6 rounded-2xl border border-border-subtle shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-text-base text-sm">Address</h3>
                <p className="text-text-muted text-sm">House 42, Road 11, Dhanmondi, Dhaka 1205</p>
              </div>
            </div>
          </div>

          <div className="bg-bg-surface p-6 rounded-2xl border border-border-subtle shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-text-base text-sm">Hours</h3>
                <p className="text-text-muted text-sm">24/7 Emergency Support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-bg-surface p-8 rounded-3xl border border-border-subtle shadow-sm">
            <h2 className="text-2xl font-bold text-text-base mb-2">Send us a message</h2>
            <p className="text-text-muted mb-8">Fill out the form below and our team will respond within 24 hours.</p>

            {success ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-text-base mb-2">Message Sent!</h3>
                <p className="text-text-muted mb-6">Thank you for reaching out. We will get back to you soon.</p>
                <button onClick={() => setSuccess(false)} className="text-primary font-bold hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errors.form && <p className="text-red-500 text-sm bg-red-50 dark:bg-red-900/10 p-3 rounded-xl">{errors.form}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-bold text-text-muted mb-1">Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      className={`block w-full px-4 py-3 bg-bg-subtle border rounded-xl focus:bg-bg-surface focus:border-primary focus:ring-1 focus:ring-primary text-text-base transition-colors ${errors.name ? 'border-red-400' : 'border-transparent'}`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-bold text-text-muted mb-1">Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className={`block w-full px-4 py-3 bg-bg-subtle border rounded-xl focus:bg-bg-surface focus:border-primary focus:ring-1 focus:ring-primary text-text-base transition-colors ${errors.email ? 'border-red-400' : 'border-transparent'}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-sm font-bold text-text-muted mb-1">Subject</label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="What is this about?"
                    className={`block w-full px-4 py-3 bg-bg-subtle border rounded-xl focus:bg-bg-surface focus:border-primary focus:ring-1 focus:ring-primary text-text-base transition-colors ${errors.subject ? 'border-red-400' : 'border-transparent'}`}
                  />
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-bold text-text-muted mb-1">Message</label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us more about your inquiry..."
                    className={`block w-full px-4 py-3 bg-bg-subtle border rounded-xl focus:bg-bg-surface focus:border-primary focus:ring-1 focus:ring-primary text-text-base resize-none transition-colors ${errors.message ? 'border-red-400' : 'border-transparent'}`}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary-hover transition shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
