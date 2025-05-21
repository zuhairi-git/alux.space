import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Design Components',
  description: 'Explore beautiful design components and UI elements'
};

// Using this approach for simplicity
export default function DesignPage() {
  return redirect('/design/coming-soon');
}
