import type { LucideIcon } from 'lucide-react';

export function EmptyState({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return <div className="empty-state"><Icon size={36} /><h2>{title}</h2><p>{text}</p></div>;
}
