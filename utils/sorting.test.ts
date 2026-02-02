import { describe, it, expect } from 'vitest';
import { sortMenuItems, getSortValue } from './sorting';

describe('sorting utils', () => {
    describe('getSortValue', () => {
        it('should extract simple numbers', () => {
            expect(getSortValue('1 - Title')).toEqual([1]);
        });

        it('should extract decimal numbers', () => {
            expect(getSortValue('1.3 - Title')).toEqual([1, 3]);
            expect(getSortValue('3.10 - Title')).toEqual([3, 10]);
        });

        it('should return null if no number before hyphen', () => {
            expect(getSortValue('Title without number')).toBeNull();
            expect(getSortValue('MODAL')).toBeNull();
        });
    });

    describe('sortMenuItems', () => {
        it('should sort items numerically', () => {
            const items = [
                { label: '3.5 - C' },
                { label: '1.3 - A' },
                { label: '1.12 - B' },
                { label: '1.7 - D' },
            ];
            const sorted = sortMenuItems(items);
            expect(sorted[0].label).toBe('1.3 - A');
            expect(sorted[1].label).toBe('1.7 - D');
            expect(sorted[2].label).toBe('1.12 - B');
            expect(sorted[3].label).toBe('3.5 - C');
        });

        it('should put items without numbers at the end', () => {
            const items = [
                { label: 'MODAL' },
                { label: '1.3 - A' },
                { label: 'Z - Title' },
            ];
            const sorted = sortMenuItems(items);
            expect(sorted[0].label).toBe('1.3 - A');
            expect(sorted[1].label).toBe('MODAL');
            expect(sorted[2].label).toBe('Z - Title');
        });

        it('should handle multiple formats', () => {
            const items = [
                { label: '10.1 - X' },
                { label: '2.1.3 - Y' },
                { label: '2.1 - Z' },
            ];
            const sorted = sortMenuItems(items);
            expect(sorted[0].label).toBe('2.1 - Z');
            expect(sorted[1].label).toBe('2.1.3 - Y');
            expect(sorted[2].label).toBe('10.1 - X');
        });
    });
});
