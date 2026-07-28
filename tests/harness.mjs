// ABOUTME: Extracts the converter's inline <script> from index.html and evaluates it
// ABOUTME: in a Node vm sandbox with a DOM stub, exporting the pure translator functions.
import { readFileSync } from 'node:fs';
import { createContext, runInContext } from 'node:vm';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];

function stubElement() {
  return {
    classList: { toggle() {}, add() {}, remove() {} }, style: {},
    innerHTML: '', value: '', placeholder: '', textContent: '', className: '',
    appendChild() {}, addEventListener() {}, querySelectorAll: () => [],
  };
}
const sandbox = {
  document: {
    getElementById: () => stubElement(),
    createElement: () => stubElement(),
    addEventListener() {},
    querySelectorAll: () => [],
  },
  window: {}, navigator: {},
};
createContext(sandbox);
runInContext(script, sandbox);

export const { misumiToJlcmc, jlcmcToMisumi, explainMisumi, explainJlcmc } = sandbox;
