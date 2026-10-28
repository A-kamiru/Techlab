import { motion } from 'framer-motion';
import { WHATSAPP } from '@/content/site';

/** Icon-only on phones (keeps content clear), icon + label from `sm` up. */
export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={WHATSAPP.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={WHATSAPP.label}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="fixed bottom-4 right-4 z-[9999] flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-sm font-bold text-white shadow-[0_4px_16px_rgba(37,211,102,0.4)] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#25D366] sm:bottom-6 sm:right-6 sm:px-5 sm:py-3"
    >
      <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current sm:h-5 sm:w-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.7-5.4A8.5 8.5 0 1 1 21 11.5Z" />
        <path d="M9 8.5c0 3.3 2.7 6 6 6l1.2-1.4-1.9-1-.9.7a3.5 3.5 0 0 1-1.7-1.7l.7-.9-1-1.9L9 8.5Z" />
      </svg>
      <span className="hidden sm:inline">{WHATSAPP.label}</span>
    </motion.a>
  );
}
