import { Metadata } from 'next';
import { NotFoundContent } from '@/components/NotFoundContent';

export const metadata: Metadata = {
  title: "404 - Page Not Found | VClick Digitally",
  description: "The page you're looking for may have been moved, renamed, or no longer exists.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return <NotFoundContent />;
}
