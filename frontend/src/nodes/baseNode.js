import { useLayoutEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';

const nodeStyle = {
  width: 220,
  minHeight: 86,
  border: '1px solid #c9c7ff',
  borderRadius: 8,
  padding: 0,
  boxSizing: 'border-box',
  background: '#ffffff',
  boxShadow: '0 10px 24px rgba(74, 69, 126, 0.08)',
  color: '#242338',
  overflow: 'visible',
};

const titleStyle = {
  display: 'flex',
  alignItems: 'center',
  minHeight: 30,
  padding: '0 10px',
  borderBottom: '1px solid #ecebff',
  background: '#f7f6ff',
  fontWeight: 600,
  fontSize: 12,
  color: '#37345f',
};

const contentStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  padding: 10,
  fontSize: 11,
};

const labelStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
  color: '#5d5a7a',
};

const inputStyle = {
  width: '112px',
  minHeight: 24,
  border: '1px solid #dddaf7',
  borderRadius: 5,
  padding: '3px 6px',
  boxSizing: 'border-box',
  background: '#fff',
  color: '#2d2b45',
  fontSize: 11,
  outline: 'none',
};

const textAreaStyle = {
  ...inputStyle,
  width: '150px',
  minHeight: 40,
  lineHeight: 1.4,
  resize: 'none',
  overflow: 'hidden',
};

export const NodeField = ({ label, children }) => (
  <label style={labelStyle}>
    <span>{label}:</span>
    {children}
  </label>
);

export const TextField = ({ value, onChange }) => (
  <input type="text" value={value} onChange={onChange} style={inputStyle} />
);

export const TextAreaField = ({ value, onChange }) => {
  const textAreaRef = useRef(null);

  useLayoutEffect(() => {
    const textArea = textAreaRef.current;

    if (!textArea) {
      return;
    }

    textArea.style.height = 'auto';
    textArea.style.height = `${textArea.scrollHeight}px`;
  }, [value]);

  return (
    <textarea
      ref={textAreaRef}
      value={value}
      onChange={onChange}
      style={textAreaStyle}
    />
  );
};

export const SelectField = ({ value, onChange, options }) => (
  <select value={value} onChange={onChange} style={inputStyle}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

const resolvePosition = (position) => {
  if (position === 'left') {
    return Position.Left;
  }

  if (position === 'right') {
    return Position.Right;
  }

  if (position === 'top') {
    return Position.Top;
  }

  if (position === 'bottom') {
    return Position.Bottom;
  }

  return position;
};

export const BaseNode = ({ id, title, handles = [], children, style = {} }) => {
  return (
    <div style={{ ...nodeStyle, ...style }}>
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={resolvePosition(handle.position)}
          id={`${id}-${handle.id}`}
          style={{
            width: 10,
            height: 10,
            border: '1px solid #827cf5',
            background: '#ffffff',
            zIndex: 2,
            cursor: 'crosshair',
            ...handle.style,
          }}
        />
      ))}
      <div style={titleStyle}>
        <span>{title}</span>
      </div>
      <div style={contentStyle}>{children}</div>
    </div>
  );
};
