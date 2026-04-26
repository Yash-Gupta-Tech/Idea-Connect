import { useState } from 'react';
import axios from 'axios';
import { User, Mail, Tag, Edit3, Send, MessageCircle, Phone, MapPin, Clock, Users, ArrowRight } from 'lucide-react';



export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    
    try {
      await axios.post('https://idea-connect-backend.onrender.com/api/contact', formData);
      setStatus({ type: 'success', text: 'Message sent successfully! We will get back to you soon.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ type: 'error', text: 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container contact-page animate-fade-in" style={{ paddingBottom: '100px', paddingTop: '40px' }}>
      
      {/* Hero Section */}
      <div className="contact-hero flex flex-wrap items-center justify-between" style={{ marginBottom: '60px', gap: '40px' }}>
        <div className="contact-hero-text">
          <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', display: 'block' }}>
            WE'RE HERE TO HELP
          </span>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '800', color: 'var(--text-dark)', lineHeight: '1.2', marginBottom: '24px' }}>
            Let's Connect.<br />
            <span style={{ color: 'var(--primary)' }}>We'd Love to Hear from You!</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '32px', maxWidth: '450px' }}>
            Have a question, suggestion, or just want to say hello?<br />
            We're always happy to connect with you.
          </p>
          <button className="btn-primary flex items-center gap-2" style={{ padding: '14px 28px', fontSize: '1.05rem' }}>
            <Mail size={20} />
            Get in Touch 
          </button>
        </div>
        
        <div className="contact-hero-image-container">
          <div className="glow-background"></div>
          <img src="/assets/up-right.jpeg" alt="Contact Us" className="contact-hero-image" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="glass-card contact-main-card">
        
        {/* Left Side: Form */}
        <div className="contact-form-section">
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '8px' }}>Send Us a Message</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '32px', fontSize: '0.95rem' }}>Fill out the form below and we'll get back to you as soon as possible.</p>
          
          {status && (
            <div style={{ padding: '12px 16px', borderRadius: '8px', marginBottom: '24px', fontSize: '0.95rem', background: status.type === 'success' ? '#D1FAE5' : '#FEE2E2', color: status.type === 'success' ? '#065F46' : '#DC2626' }}>
              {status.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap gap-4" style={{ marginBottom: '16px' }}>
              <div className="form-group icon-input-group" style={{ flex: '1 1 200px', marginBottom: '0' }}>
                <User className="input-icon" size={18} />
                <input type="text" name="name" className="input-field icon-input" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-group icon-input-group" style={{ flex: '1 1 200px', marginBottom: '0' }}>
                <Mail className="input-icon" size={18} />
                <input type="email" name="email" className="input-field icon-input" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group icon-input-group" style={{ marginBottom: '16px' }}>
              <Tag className="input-icon" size={18} />
              <input type="text" name="subject" className="input-field icon-input" placeholder="Subject" value={formData.subject} onChange={handleChange} />
            </div>

            <div className="form-group icon-input-group" style={{ marginBottom: '24px', alignItems: 'flex-start' }}>
              <Edit3 className="input-icon textarea-icon" size={18} />
              <textarea name="message" className="input-field icon-input" placeholder="Your Message" rows="5" maxLength="500" value={formData.message} onChange={handleChange} required></textarea>
              <div className="char-count" style={{ position: 'absolute', bottom: '12px', right: '12px', fontSize: '0.75rem', color: '#9CA3AF' }}>
                {formData.message.length}/500
              </div>
            </div>

            <button type="submit" className="btn-primary flex items-center gap-2 btn-submit-mobile" style={{ padding: '14px 32px' }} disabled={loading}>
              <Send size={18} />
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Right Side: Info */}
        <div className="contact-info-section">
          <h2 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '8px' }}>Other Ways to Reach Us</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '32px', fontSize: '0.95rem' }}>Choose your preferred way to connect with us.</p>
          
          <div className="info-cards flex-col gap-4">
            <div className="info-card flex items-center gap-4">
              <div className="info-icon-wrapper" style={{ background: '#F3E8FF', color: 'var(--primary)', padding: '16px', borderRadius: '12px' }}>
                <Mail size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-dark)', marginBottom: '4px' }}>Email Us</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>yashkumar62011@gmail.com</p>
              </div>
              <ArrowRight size={18} color="#9CA3AF" />
            </div>

            <div className="info-card flex items-center gap-4">
              <div className="info-icon-wrapper" style={{ background: '#F3E8FF', color: 'var(--primary)', padding: '16px', borderRadius: '12px' }}>
                <Phone size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-dark)', marginBottom: '4px' }}>Call Us</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>+91 7979768075</p>
              </div>
              <ArrowRight size={18} color="#9CA3AF" />
            </div>

            <div className="info-card flex items-center gap-4">
              <div className="info-icon-wrapper" style={{ background: '#F3E8FF', color: 'var(--primary)', padding: '16px', borderRadius: '12px' }}>
                <MapPin size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-dark)', marginBottom: '4px' }}>Address</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>New Delhi , India</p>
              </div>
              <ArrowRight size={18} color="#9CA3AF" />
            </div>

            <div className="info-card flex items-center gap-4">
              <div className="info-icon-wrapper" style={{ background: '#F3E8FF', color: 'var(--primary)', padding: '16px', borderRadius: '12px' }}>
                <Clock size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-dark)', marginBottom: '4px' }}>Working Hours</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>All Time Free </p>
              </div>
              <ArrowRight size={18} color="#9CA3AF" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="contact-banner flex items-center justify-between flex-wrap">
        <div className="flex items-center gap-4 contact-banner-text">
          <div className="banner-icon-bg" style={{ background: 'var(--primary)', padding: '12px', borderRadius: '50%', color: 'white' }}>
            <MessageCircle size={28} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-dark)', marginBottom: '4px' }}>Let's build something amazing together!</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Whether you have a question or just want to collaborate, we're excited to hear from you.</p>
          </div>
        </div>
      {/* <button className="btn-primary flex items-center gap-2 btn-banner-mobile"> Explore Ideas <ArrowRight size={18} /> </button> */}
      </div>

    </div>
  );
}
