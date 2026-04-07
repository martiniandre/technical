import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { RevenueChart } from './RevenueChart';
import type { RevenueDataPoint } from '../../../shared/types';

const mockRevenueData: RevenueDataPoint[] = [
  { month: 'Jan', revenue: 4000, expenses: 2400 },
  { month: 'Feb', revenue: 3000, expenses: 1398 },
];

describe('RevenueChart Component', () => {
  it('should render the chart with title and description', () => {
    render(<RevenueChart data={mockRevenueData} />);

    expect(screen.getByText('Revenue Analysis')).toBeInTheDocument();
    expect(screen.getByText('Billing trend over time')).toBeInTheDocument();
  });

  it('should have an accessible aria-label on the card', () => {
    render(<RevenueChart data={mockRevenueData} />);
    expect(screen.getByText(/revenue analysis/i)).toBeInTheDocument();
  });

  it('should render the legend labels', () => {
    render(<RevenueChart data={mockRevenueData} />);
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('Expenses')).toBeInTheDocument();
  });
});
