import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EquipmentChart } from './EquipmentChart';
import type { EquipmentItemDTO } from '../../../shared/services/dto/dashboard';

const mockEquipmentData: EquipmentItemDTO[] = [
  { type: 'Pumps', count: 45 },
  { type: 'Compressors', count: 12 },
  { type: 'Turbines', count: 8 },
];

describe('EquipmentChart Component', () => {
  it('should render the chart with titles', () => {
    render(<EquipmentChart data={mockEquipmentData} />);
    
    expect(screen.getByText('Equipments')).toBeInTheDocument();
    expect(screen.getByText('Count by type')).toBeInTheDocument();
  });

  it('should have an accessible aria-label on the card', () => {
    render(<EquipmentChart data={mockEquipmentData} />);
    expect(screen.getByRole('region', { name: /equipment chart/i })).toBeInTheDocument();
  });

  it('should render the chart container properly', () => {
    const { container } = render(<EquipmentChart data={mockEquipmentData} />);
    const chart = container.querySelector('.recharts-responsive-container');
    expect(chart).toBeInTheDocument();
  });
});
