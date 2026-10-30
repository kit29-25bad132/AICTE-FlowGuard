import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AICTE FlowGuard — Regulatory Workflow & Accountability Platform',
  description: 'Integrated regulatory workflow automation, institutional accountability, and EVC intelligence platform for AICTE Regulation Bureau (Smart India Hackathon 2026).',
  openGraph: {
    title: 'AICTE FlowGuard',
    description: 'Integrated regulatory workflow automation and accountability platform.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AICTE FlowGuard',
    description: 'Integrated regulatory workflow automation and accountability platform.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning className="bg-[#f8f9ff] text-[#0b1c30] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
