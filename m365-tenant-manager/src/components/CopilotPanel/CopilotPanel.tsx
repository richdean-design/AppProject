import { useState } from 'react';
import { Layers, X, Send } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const suggestions = [
  'Show me tenants with compliance issues',
  'Generate a security score report for all tenants',
  'Which tenants need license reallocation?',
  'Summarize critical alerts from the last 24 hours',
];

export function CopilotPanel({ isOpen, onClose }: Props) {
  const [input, setInput] = useState('');

  return (
    <div className={`copilot-panel ${isOpen ? 'open' : ''}`}>
      <div className="copilot-panel-header">
        <div className="copilot-panel-title">
          <Layers size={24} />
          Copilot Assistant
        </div>
        <button className="copilot-close-btn" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <div className="copilot-content">
        <div className="copilot-welcome">
          <div className="copilot-welcome-title">Hello! I'm your M365 Copilot</div>
          <div className="copilot-welcome-text">
            I can help you manage tenants, analyze data, generate reports, and answer questions about your Microsoft 365 environment.
          </div>
        </div>

        <div style={{ fontSize: 12, color: '#8A8886', fontWeight: 600, marginTop: 8 }}>
          SUGGESTED PROMPTS
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {suggestions.map(suggestion => (
            <button
              key={suggestion}
              className="copilot-suggestion-btn"
              onClick={() => setInput(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <div className="copilot-input-area">
        <div className="copilot-input-wrapper">
          <textarea
            className="copilot-input"
            placeholder="Ask Copilot anything about your tenants..."
            rows={1}
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button className="copilot-send-btn" disabled={!input.trim()}>
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
