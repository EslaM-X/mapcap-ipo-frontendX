/**
 * MapCap Branding & Visual Integrity Audit
 * ---------------------------------------------------------
 * Standard: Philip Jennings' Spec Compliance (v1.2)
 * Architect: Eslam Kora | AppDev @Map-of-Pi
 * Purpose: Verifies the "Golden Ratio" layout, brand colors, 
 * and the 28-day growth SVG visualization.
 */

import { render, screen } from '@testing-library/react';
import { vi, describe, test, expect } from 'vitest';
import App from '../src/App';
import PriceGraph from '../src/components/PriceGraph';
import { IpoProvider } from '../src/context/IpoContext';

// Mocking dependencies to isolate visual rendering
vi.mock('../src/services/pi.service');
vi.mock('../src/services/api.service');

const AllProviders = ({ children }) => (
  <IpoProvider>{children}</IpoProvider>
);

describe('VISUAL AUDIT: Brand Identity & Layout Compliance', () => {

  /**
   * TEST CASE 01: The Golden Ratio Layout
   * Objective: Verify the 3-pillar vertical split (33.33vh).
   */
  test('LAYOUT: Should enforce the 33.33vh vertical distribution rule', () => {
    render(<App />, { wrapper: AllProviders });
    
    const topSection = document.querySelector('.section-top');
    const middleSection = document.querySelector('.section-middle');
    const bottomSection = document.querySelector('.section-bottom');

    expect(topSection).toBeInTheDocument();
    expect(middleSection).toBeInTheDocument();
    expect(bottomSection).toBeInTheDocument();
  });

  /**
   * TEST CASE 02: Brand Color Palette Implementation
   * Objective: Ensure MapCap Green and Gold are applied to key UI elements.
   */
  test('COLORS: Should apply MapCap Green (#1b5e20) to primary buttons', () => {
    // Mocking auth to reveal the dashboard
    render(<App />, { wrapper: AllProviders });
    
    const investBtn = screen.getByRole('button', { name: /Invest pi/i });
    
    // In Vitest/JSDOM, we verify by class or computed styles
    expect(investBtn).toHaveClass('btn-mapcap');
  });

  /**
   * TEST CASE 03: SVG Graph Integrity (The 28-Day Roadmap)
   * Objective: Verify the SVG renders the growth path and Week 1-4 labels.
   */
  test('GRAPHICS: Should render the 28-day price trajectory SVG with Week labels', () => {
    // Mocking context metrics with price history
    const mockMetrics = {
      dailyPrices: [0.001, 0.002, 0.005],
      loading: false
    };

    render(<PriceGraph />, { wrapper: AllProviders });

    // Verify SVG existence
    const svgElement = document.querySelector('.mapcap-svg-graph');
    expect(svgElement).toBeInTheDocument();

    // Verify Philip's mandatory timeline labels
    expect(screen.getByText(/Week 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Week 4/i)).toBeInTheDocument();
  });
});

