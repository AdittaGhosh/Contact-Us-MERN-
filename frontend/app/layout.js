import '../styles/globals.css';
import Logo from '../components/Logo';

export const metadata = {
  title: 'Contact Us - CyberCraft Bangladesh',
  description: 'Get in touch with CyberCraft Bangladesh!',
  openGraph: {
    title: 'Contact Us - CyberCraft Bangladesh',
    description: 'Get in touch with CyberCraft Bangladesh!',
    url: 'http://localhost:3000',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Us - CyberCraft Bangladesh',
    description: 'Get in touch with CyberCraft Bangladesh!',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'http://schema.org',
              '@type': 'ContactPage',
              name: 'Contact Us',
              url: 'http://localhost:3000',
              description: 'Contact form for CyberCraft Bangladesh',
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}