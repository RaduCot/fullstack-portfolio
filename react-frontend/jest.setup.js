import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util'; // Import TextEncoder and TextDecoder

// Polyfill TextEncoder and TextDecoder
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
