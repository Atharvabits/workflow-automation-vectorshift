// textNode.js

import { useState } from 'react';
import { BaseNode, NodeField, TextAreaField } from './baseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Text"
      handles={[
        { type: 'target', position: 'left', id: 'input' },
        { type: 'source', position: 'right', id: 'output' },
      ]}
    >
      <NodeField label="Text">
        <TextAreaField value={currText} onChange={handleTextChange} />
      </NodeField>
    </BaseNode>
  );
}
