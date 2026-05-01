// inputNode.js

import { useState } from 'react';
import { BaseNode, NodeField, SelectField, TextField } from './baseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Input"
      handles={[{ type: 'source', position: 'right', id: 'value' }]}
    >
      <NodeField label="Name">
        <TextField value={currName} onChange={handleNameChange} />
      </NodeField>
      <NodeField label="Type">
        <SelectField
          value={inputType}
          onChange={handleTypeChange}
          options={[
            { value: 'Text', label: 'Text' },
            { value: 'File', label: 'File' },
          ]}
        />
      </NodeField>
    </BaseNode>
  );
}
