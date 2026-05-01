// llmNode.js

import { BaseNode } from './baseNode';

export const LLMNode = ({ id, data }) => {

  return (
    <BaseNode
      id={id}
      title="LLM"
      handles={[
        { type: 'target', position: 'left', id: 'system', style: { top: `${100 / 3}%` } },
        { type: 'target', position: 'left', id: 'prompt', style: { top: `${200 / 3}%` } },
        { type: 'source', position: 'right', id: 'response' },
      ]}
    >
      <span>This is a LLM.</span>
    </BaseNode>
  );
}
