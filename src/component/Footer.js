import React from 'react';


const Footer = () => {
  return (
    <footer className="footer">
    <div>

      <nav className="footer-nav">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="about">About Us</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/terms">Terms of Service</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
        </ul>
      </nav>
      <p>© 2024 SK web. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;