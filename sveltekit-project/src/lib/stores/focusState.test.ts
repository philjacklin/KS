import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { focusState } from './focusState.svelte';

describe('focusState store', () => {
  it('should have initial method as keyboard', () => {
    expect(focusState.method).toBe('keyboard');
    expect(document.documentElement.getAttribute('data-focus-method')).toBe('keyboard');
  });

  it('should change method to pointer on mousedown', () => {
    window.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    expect(focusState.method).toBe('pointer');
    expect(document.documentElement.getAttribute('data-focus-method')).toBe('pointer');
  });

  it('should change method back to keyboard on keydown', () => {
    // First set to pointer
    window.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    expect(focusState.method).toBe('pointer');

    // Then trigger keydown
    window.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true }));
    expect(focusState.method).toBe('keyboard');
    expect(document.documentElement.getAttribute('data-focus-method')).toBe('keyboard');
  });

  it('should change method to pointer on touchstart', () => {
    // First ensure it is keyboard
    window.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true }));
    expect(focusState.method).toBe('keyboard');

    // Then trigger touchstart
    window.dispatchEvent(new TouchEvent('touchstart', { bubbles: true }));
    expect(focusState.method).toBe('pointer');
    expect(document.documentElement.getAttribute('data-focus-method')).toBe('pointer');
  });
});
