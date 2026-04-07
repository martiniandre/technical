import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ScenarioCard } from './ScenarioCard';
import type { ScenarioItemDTO } from '../../../shared/services/dto/dashboard';

const mockScenarios: ScenarioItemDTO[] = [
  { type: 'Fire', count: 40 },
  { type: 'Blocked Outcome', count: 25 },
  { type: 'External Fire', count: 15 },
  { type: 'Other', count: 20 },
];

describe('ScenarioCard Component', () => {
  it('should render the scenario counts and labels', () => {
    render(<ScenarioCard scenarios={mockScenarios} />);

    expect(screen.getByText('Fire')).toBeInTheDocument();
    expect(screen.getByText('Blocked Outcome')).toBeInTheDocument();
    expect(screen.getByText('Other')).toBeInTheDocument();
  });

  it('should display the total count in the description', () => {
    render(<ScenarioCard scenarios={mockScenarios} />);
    expect(screen.getByText('Total: 100')).toBeInTheDocument();
  });

  it('should calculate and display correct percentages', () => {
    render(<ScenarioCard scenarios={mockScenarios} />);

    expect(screen.getByText(/40%/)).toBeInTheDocument();

    expect(screen.getByText(/25%/)).toBeInTheDocument();
  });

  it('should render progress bars with correct widths', () => {
    const { container } = render(<ScenarioCard scenarios={mockScenarios} />);

    const progressBars = container.querySelectorAll('.h-full.rounded-full.transition-all');
    expect(progressBars[0]).toHaveStyle('width: 40%');
    expect(progressBars[1]).toHaveStyle('width: 25%');
  });
});
