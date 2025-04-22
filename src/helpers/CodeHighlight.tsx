import * as React from 'react';

import hljs from 'highlight.js';
import 'highlight.js/styles/github.min.css';

function CodeHighlight() {
  React.useEffect(() => {
    hljs.highlightAll();
  }, []);

  return null;
}

export { CodeHighlight };
