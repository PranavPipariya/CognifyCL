import { CalendarIcon, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface Entry {
  url: string;
  title: string;
  summary: string;
  timestamp: number;
}

export default function EntryCard({ entry }: { entry: Entry }) {
  return (
    <motion.a
      href={entry.url}
      target="_blank"
      className="block rounded-xl border p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
      whileHover={{ scale: 1.02 }}
    >
      <h3 className="font-semibold text-lg mb-1 flex items-start">
        {entry.title}
        <ExternalLink className="w-4 h-4 ml-1 mt-0.5" />
      </h3>
      <p className="text-sm text-gray-600 line-clamp-3">{entry.summary}</p>
      <div className="flex items-center text-xs text-gray-400 mt-3">
        <CalendarIcon className="w-4 h-4 mr-1" />
        {new Date(entry.timestamp).toLocaleString()}
      </div>
    </motion.a>
  );
}
