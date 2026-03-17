import React, { useState, useEffect } from 'react';

const WordList = ({ onWordSelect, selectedWord, isGameActive }) => {
  const [words, setWords] = useState([]);
  const [filteredWords, setFilteredWords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const wordDatabase = [
    'apple', 'banana', 'computer', 'keyboard', 'javascript', 'react', 'development',
    'programming', 'algorithm', 'function', 'variable', 'component', 'state', 'props',
    'render', 'mount', 'unmount', 'browser', 'server', 'database', 'frontend',
    'backend', 'api', 'json', 'html', 'css', 'framework', 'library', 'module',
    'package', 'dependency', 'npm', 'git', 'github', 'terminal', 'console',
    'debug', 'error', 'exception', 'promise', 'async', 'await', 'loop',
    'condition', 'object', 'array', 'string', 'number', 'boolean', 'null',
    'undefined', 'callback', 'event', 'listener', 'element', 'document', 'window',
    'fetch', 'axios', 'redux', 'context', 'hook', 'effect', 'memo', 'ref',
    'portal', 'fragment', 'key', 'index', 'map', 'filter', 'reduce', 'sort',
    'slice', 'splice', 'push', 'pop', 'shift', 'unshift', 'concat', 'join',
    'split', 'trim', 'replace', 'match', 'search', 'test', 'exec', 'matchAll',
    'charAt', 'charCodeAt', 'indexOf', 'lastIndexOf', 'includes', 'startsWith',
    'endsWith', 'toLocaleLowerCase', 'toLocaleUpperCase', 'toLowerCase', 'toUpperCase',
    'toFixed', 'toPrecision', 'parseInt', 'parseFloat', 'isNaN', 'isFinite',
    'Math', 'Date', 'RegExp', 'Error', 'Promise', 'Set', 'Map', 'WeakSet',
    'WeakMap', 'Proxy', 'Reflect', 'Symbol', 'BigInt', 'Iterator', 'Generator',
    'AsyncIterator', 'WebAssembly', 'WebGL', 'Canvas', 'SVG', 'WebRTC', 'WebSockets',
    'ServiceWorker', 'WebWorker', 'FetchAPI', 'XMLHttpRequest', 'localStorage',
    'sessionStorage', 'cookie', 'cache', 'performance', 'navigation', 'history',
    'location', 'screen', 'navigator', 'device', 'mobile', 'desktop', 'responsive',
    'grid', 'flexbox', 'media', 'query', 'breakpoint', 'viewport', 'em', 'rem',
    'px', 'percent', 'unit', 'dimension', 'position', 'display', 'visibility',
    'opacity', 'z-index', 'transform', 'transition', 'animation', 'keyframes',
    'selector', 'pseudo', 'class', 'id', 'attribute', 'universal', 'child',
    'adjacent', 'sibling', 'nth', 'first', 'last', 'only', 'not', 'contains',
    'lang', 'dir', 'focus', 'hover', 'active', 'visited', 'link', 'target',
    'root', 'host', 'slotted', 'part', 'shadow', 'delegates', 'focus-within',
    'focus-visible', 'any-link', 'link', 'visited', 'enabled', 'disabled',
    'checked', 'indeterminate', 'valid', 'invalid', 'in-range', 'out-of-range',
    'required', 'optional', 'read-only', 'read-write', 'empty', 'blank',
    'default', 'autofocus', 'form', 'formaction', 'formmethod', 'formnovalidate',
    'formtarget', 'name', 'value', 'type', 'placeholder', 'maxlength',
    'minlength', 'pattern', 'step', 'min', 'max', 'size', 'multiple',
    'accept', 'autocomplete', 'autocorrect', 'autocapitalize', 'spellcheck',
    'contenteditable', 'dir', 'draggable', 'hidden', 'tabindex', 'accesskey',
    'title', 'lang', 'xml', 'xmlns', 'role', 'aria', 'data', 'dataset',
    'style', 'class', 'id', 'src', 'href', 'alt', 'title', 'width', 'height',
    'border', 'margin', 'padding', 'background', 'color', 'font', 'text',
    'line', 'letter', 'word', 'space', 'break', 'wrap', 'align', 'justify',
    'direction', 'unicode', 'bidi', 'rtl', 'ltr', 'writing', 'mode', 'orientation',
    'transform', 'perspective', 'rotate', 'scale', 'translate', 'skew', 'matrix',
    'matrix3d', 'rotateX', 'rotateY', 'rotateZ', 'scaleX', 'scaleY', 'scaleZ',
    'translateX', 'translateY', 'translateZ', 'skewX', 'skewY', 'perspective',
    'transform-origin', 'transform-style', 'backface-visibility', 'contain',
    'containment', 'layout', 'paint', 'size', 'aspect', 'ratio', 'aspect-ratio',
    'overflow', 'clip', 'scroll', 'snap', 'align-content', 'align-items',
    'align-self', 'justify-content', 'justify-items', 'justify-self', 'grid',
    'grid-template', 'grid-template-areas', 'grid-template-columns',
    'grid-template-rows', 'grid-column', 'grid-row', 'grid-column-start',
    'grid-column-end', 'grid-row-start', 'grid-row-end', 'grid-auto-flow',
    'grid-auto-columns', 'grid-auto-rows', 'grid-column-gap', 'grid-row-gap',
    'grid-gap', 'flex', 'flex-grow', 'flex-shrink', 'flex-basis', 'flex-wrap',
    'flex-direction', 'order', 'gap', 'column', 'row', 'area', 'template',
    'auto', 'min-content', 'max-content', 'fit-content', 'content', 'stretch',
    'baseline', 'center', 'start', 'end', 'left', 'right', 'top', 'bottom',
    'none', 'normal', 'bold', 'lighter', 'bolder', 'italic', 'oblique',
    'underline', 'overline', 'line-through', 'text-decoration', 'text-shadow',
    'text-transform', 'text-overflow', 'white-space', 'word-break', 'word-wrap',
    'overflow-wrap', 'text-align', 'text-indent', 'text-justify', 'text-orientation',
    'writing-mode', 'unicode-bidi', 'direction', 'font-family', 'font-size',
    'font-weight', 'font-style', 'font-variant', 'font-stretch', 'font-size-adjust',
    'font-kerning', 'font-feature-settings', 'font-variation-settings',
    'font-language-override', 'font-optical-sizing', 'font-palette',
    'font-variation-settings', 'font-display', 'font-face', 'src', 'format',
    'unicode-range', 'font-stretch', 'font-style', 'font-variant', 'font-weight',
    'font-size', 'font-family', 'font', 'font-size-adjust', 'font-kerning',
    'font-feature-settings', 'font-variation-settings', 'font-language-override',
    'font-optical-sizing', 'font-palette', 'font-display', 'font-face',
    'font-stretch', 'font-style', 'font-variant', 'font-weight', 'font-size',
    'font-family', 'font', 'font-size-adjust', 'font-kerning', 'font-feature-settings',
    'font-variation-settings', 'font-language-override', 'font-optical-sizing',
    'font-palette', 'font-display', 'font-face', 'src', 'format', 'unicode-range'
  ];

  useEffect(() => {
    setWords(wordDatabase);
    setFilteredWords(wordDatabase);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = words.filter(word => 
        word.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredWords(filtered);
    } else {
      setFilteredWords(words);
    }
  }, [searchTerm, words]);

  const handleWordSelect = (word) => {
    if (!isGameActive) {
      onWordSelect(word);
    }
  };

  return (
    <div className="word-list-container">
      <div className="word-list-header">
        <h2>Word List</h2>
        <input
          type="text"
          placeholder="Search words..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="word-list">
        {filteredWords.map((word, index) => (
          <div
            key={index}
            onClick={() => handleWordSelect(word)}
            className={`word-item ${
              selectedWord === word ? 'selected' : ''
            } ${isGameActive ? 'disabled' : ''}`}
          >
            {word}
          </div>
        ))}
      </div>
      
      {filteredWords.length === 0 && (
        <div className="no-results">
          No words found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
};

export default WordList;