// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          cursor: 'grab', 
          minWidth: '78px', 
          height: '56px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: '10px',
          border: '1px solid #e7e5fb',
          backgroundColor: '#ffffff',
          boxShadow: '0 8px 22px rgba(49, 45, 101, 0.08)',
          justifyContent: 'center', 
          flexDirection: 'column',
          transition: 'box-shadow 120ms ease, transform 120ms ease, border-color 120ms ease',
        }} 
        draggable
      >
          <span style={{ color: '#34324f', fontSize: 13, fontWeight: 600 }}>{label}</span>
      </div>
    );
  };
  