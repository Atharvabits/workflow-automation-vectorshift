// outputNode.js

import { useState } from 'react';
import { BaseNode, NodeField, SelectField, TextField } from './baseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Output"
      handles={[{ type: 'target', position: 'left', id: 'value' }]}
    >
      <NodeField label="Name">
        <TextField value={currName} onChange={handleNameChange} />
      </NodeField>
      <NodeField label="Type">
        <SelectField
          value={outputType}
          onChange={handleTypeChange}
          options={[
            { value: 'Text', label: 'Text' },
            { value: 'File', label: 'Image' },
          ]}
        />
      </NodeField>
    </BaseNode>
  );
}
