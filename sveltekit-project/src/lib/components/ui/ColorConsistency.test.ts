import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import { readFileSync } from 'fs';
import { join } from 'path';
import Button from './button/Button.svelte';
import Badge from './badge/Badge.svelte';
import { buttonVariants } from './button/variants';
import { badgeVariants } from './badge/variants';
// @ts-ignore
import tailwindConfig from '../../../../tailwind.config.js';

describe('Semantic Color Consistency Audit', () => {
    const appCss = readFileSync(join(process.cwd(), 'src/app.css'), 'utf-8');

    const getTailwindColor = (path: string) => {
        const parts = path.split('.');
        let current = tailwindConfig.theme.extend.colors;
        for (const part of parts) {
            current = current[part];
            if (!current) return null;
        }
        return typeof current === 'string' ? current.toUpperCase() : (current.DEFAULT ? current.DEFAULT.toUpperCase() : null);
    };

    const getCssVar = (name: string) => {
        const match = appCss.match(new RegExp(name + ':\s*([^;]+);'));
        return match ? match[1].trim().toUpperCase() : null;
    };

    const PRIMARY_COLOR = '#005B6B';
    const SECONDARY_COLOR = '#FFCD00';
    const BACKGROUND_COLOR = '#FDF9F3';
    const HIGHLIGHT_COLOR = '#00D1FF';

    it('verifies primary color tokens are consistent across config and CSS', () => {
        expect(getTailwindColor('payroll.teal')).toBe(PRIMARY_COLOR);
        expect(getTailwindColor('primary.500')).toBe(PRIMARY_COLOR);
        expect(getCssVar('--primary')).toBe(PRIMARY_COLOR);
        expect(getCssVar('--payroll-teal')).toBe(PRIMARY_COLOR);
    });

    it('verifies secondary color tokens are consistent across config and CSS', () => {
        expect(getTailwindColor('payroll.gold')).toBe(SECONDARY_COLOR);
        expect(getTailwindColor('secondary.500')).toBe(SECONDARY_COLOR);
        expect(getTailwindColor('status.pending')).toBe(SECONDARY_COLOR);
        expect(getCssVar('--secondary')).toBe(SECONDARY_COLOR);
        expect(getCssVar('--payroll-gold')).toBe(SECONDARY_COLOR);
    });

    it('verifies background color tokens are consistent across config and CSS', () => {
        expect(getTailwindColor('payroll.paper')).toBe(BACKGROUND_COLOR);
        expect(getCssVar('--background')).toBe(BACKGROUND_COLOR);
        expect(getCssVar('--payroll-paper')).toBe(BACKGROUND_COLOR);
    });

    it('verifies highlight color tokens are consistent across config and CSS', () => {
        expect(getTailwindColor('payroll.cyan')).toBe(HIGHLIGHT_COLOR);
        expect(getTailwindColor('status.processed')).toBe(HIGHLIGHT_COLOR);
        expect(getCssVar('--highlight')).toBe(HIGHLIGHT_COLOR);
        expect(getCssVar('--payroll-cyan')).toBe(HIGHLIGHT_COLOR);
    });

    it('verifies component variants use the correct semantic tokens', () => {
        const primaryButtonClasses = buttonVariants({ variant: 'primary' });
        expect(primaryButtonClasses).toContain('bg-payroll-teal');
        
        const secondaryButtonClasses = buttonVariants({ variant: 'secondary' });
        expect(secondaryButtonClasses).toContain('bg-payroll-gold');

        const successBadgeClasses = badgeVariants({ variant: 'success' });
        expect(successBadgeClasses).toContain('text-payroll-teal');
    });
});
