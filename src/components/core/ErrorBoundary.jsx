import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props){ super(props); this.state = { hasError: false, err: null }; }
  static getDerivedStateFromError(err){ return { hasError: true, err }; }
  componentDidCatch(err, info){ console.error('ErrorBoundary caught:', err, info); }
  render(){
    if (this.state.hasError) {
      return (
        <div className="card">
          <h2 className="text-2xl font-bold mb-2">Something broke in the lab</h2>
          <p className="text-[var(--muted)] mb-4">Don’t panic. Try a refresh. Error details are in the console.</p>
          <button className="btn" onClick={() => location.reload()}>Reload</button>
        </div>
      );
    }
    return this.props.children;
  }
}
