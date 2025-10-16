# SimpleCalculator

A lightweight web‑based calculator built with plain **HTML**, **CSS**, and **JavaScript**. It provides basic arithmetic operations, clear/backspace controls, and full keyboard support—all without any build step or external dependencies.

---

## Tech Stack
- **HTML** – Structure and markup for the calculator UI.
- **CSS** – Styling, layout, and responsive breakpoints.
- **JavaScript** – Calculator state management, event handling, and keyboard interaction.

---

## Features
- **Basic arithmetic** – addition, subtraction, multiplication, division.
- **Clear (C) and Backspace (←)** – Reset the whole expression or delete the last character.
- **Keyboard support** – Use number keys, `+ - * /`, `Enter` (or `=`) for calculation, `Backspace`, and `Esc`/`C` to clear.
- **Responsive design** – UI adapts to different screen sizes.
- **State exposure** – Core functions are attached to `window.calculator` for easy debugging or unit testing.

---

## Setup & Run
1. **Clone the repository**
   ```bash
   git clone <repository‑url>
   cd <repository‑folder>
   ```
2. **Open the app**
   - Simply open `index.html` in any modern browser (no build step, no server required).
   - The calculator will be ready to use.

---

## Development
### `index.html`
- Contains the markup for the calculator container, display area, and all buttons.
- Each button uses a `data-key` attribute that matches the key the JavaScript expects (e.g., `data-key="+"`).
- Modify this file to change the layout, add new buttons, or restructure the UI.

### `style.css`
- Provides visual styling for the calculator, including colors, spacing, and hover effects.
- Contains media queries that adjust the grid layout for smaller screens (responsive breakpoints).
- Edit this file to customize the look‑and‑feel or to add additional responsive rules.

### `script.js`
- Implements the calculator **state machine** (`calculatorState`) and core operations (`appendDigit`, `setOperator`, `calculate`, etc.).
- Handles click events via event delegation on the `.keypad` container and maps keyboard events to the same handlers.
- Exposes an object `window.calculator` that contains the state and all core functions – useful for debugging or writing simple tests.
- To extend functionality (e.g., adding a `%` operator), update the `handleButtonPress` switch, the `calculate` logic, and optionally the UI in `index.html`.

---

## Testing
- Open the page in a browser and press **F12** (or right‑click → *Inspect*) to open the developer console.
- The calculator functions are available under `window.calculator`. Example checks:
  ```javascript
  // Verify the calculator object exists
  console.log(window.calculator);
  // Perform a quick calculation programmatically
  window.calculator.appendDigit('2');
  window.calculator.setOperator('+');
  window.calculator.appendDigit('3');
  window.calculator.calculate();
  console.log(window.calculator.state.currentInput); // should log "5"
  ```
- You can also manually invoke `window.calculator.calculate()` after entering an expression using the UI to confirm the result appears in the display.

---

## License
[Insert appropriate license here – e.g., MIT, Apache 2.0, etc.]
