import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatCard } from './StatCard';
import type { MetricStat } from '../../../shared/types';

const mockStatUp: MetricStat = {
  label: 'Active Users',
  value: '1,234',
  change: 12.5,
  trend: 'up',
};

const mockStatDown: MetricStat = {
  label: 'Bounce Rate',
  value: '45.2%',
  change: -2.3,
  trend: 'down',
};

describe('StatCard Component', () => {
  it('should render the label and value correctly', () => {
    render(<StatCard stat={mockStatUp} />);

    expect(screen.getByText('Active Users')).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
  });

  it('should display the correct percentage change', () => {
    render(<StatCard stat={mockStatUp} />);
    expect(screen.getByText('+12.5%')).toBeInTheDocument();
  });

  it('should apply emerald styles for upward trends', () => {
    const { container } = render(<StatCard stat={mockStatUp} />);

    const trendIndicator = container.querySelector('.text-emerald-400');
    expect(trendIndicator).toBeInTheDocument();
    expect(trendIndicator).toHaveTextContent('+12.5%');
  });

  it('should apply red styles for downward trends', () => {
    const { container } = render(<StatCard stat={mockStatDown} />);

    const trendIndicator = container.querySelector('.text-red-400');
    expect(trendIndicator).toBeInTheDocument();
    expect(trendIndicator).toHaveTextContent('-2.3%');
  });
});
