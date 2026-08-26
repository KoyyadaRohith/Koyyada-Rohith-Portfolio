import React from 'react';
import Container from '../components/ui/Container';

export default function NotFound() {
  return (
    <div className="py-24">
      <Container>
        <span className="text-xs font-mono font-semibold text-[#69E3FF] uppercase tracking-widest">
          Portfolio Module
        </span>
        <h1 className="text-4xl font-bold font-heading text-white mt-2">404 - Page Not Found</h1>
        <p className="mt-4 text-[#B8C0CC] max-w-xl">The requested route does not exist.</p>
      </Container>
    </div>
  );
}
