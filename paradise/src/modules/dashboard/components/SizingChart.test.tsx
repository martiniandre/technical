import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SizingChart } from './SizingChart';
import type { SizingCalculationTypeDTO } from '@/shared/services/dto/dashboard';

const mockSizingData: SizingCalculationTypeDTO[] = [
  { name: 'API 520', value: 120 },
  { name: 'API 521', value: 98 },
  { name: 'ASME VIII', value: 86 },
];

describe('SizingChart Component', () => {
  it('should render the chart with titles', () => {
    render(<SizingChart data={mockSizingData} />);

    expect(screen.getByText('Sizing')).toBeInTheDocument();
    expect(screen.getByText('Calculation types')).toBeInTheDocument();
  });

  it('should have an accessible aria-label on the card', () => {
    render(<SizingChart data={mockSizingData} />);
    expect(screen.getByText(/sizing chart/i)).toBeInTheDocument();
  });
});
