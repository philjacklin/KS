export type FocusMethod = 'keyboard' | 'pointer';

class FocusState {
    #method = $state<FocusMethod>('keyboard');

    constructor() {
        if (typeof window !== 'undefined') {
            const handleKeyboard = () => {
                this.#method = 'keyboard';
                document.documentElement.setAttribute('data-focus-method', 'keyboard');
            };

            const handlePointer = () => {
                this.#method = 'pointer';
                document.documentElement.setAttribute('data-focus-method', 'pointer');
            };

            window.addEventListener('keydown', handleKeyboard, true);
            window.addEventListener('mousedown', handlePointer, true);
            window.addEventListener('touchstart', handlePointer, true);
            
            // Set initial attribute
            document.documentElement.setAttribute('data-focus-method', 'keyboard');
        }
    }

    get method() {
        return this.#method;
    }
}

export const focusState = new FocusState();
