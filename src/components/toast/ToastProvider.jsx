import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

const ToastCtx = createContext(null);

export function ToastProvider({ children }){
  const [items, setItems] = useState([]);
  const idRef = useRef(0);

  const push = useCallback((msg, kind='info') => {
    const id = ++idRef.current;
    setItems(list => [...list, { id, msg, kind }]);
    setTimeout(() => setItems(list => list.filter(t => t.id !== id)), 3500);
  }, []);

  const api = { push, success: (m)=>push(m,'success'), error: (m)=>push(m,'error'), info: (m)=>push(m,'info') };

  return (
    <ToastCtx.Provider value={api}>
      {children}
      <div className="fixed bottom-4 right-4 z-[60] grid gap-2">
        {items.map(t => (
          <div key={t.id} className={`px-3 py-2 rounded-xl border backdrop-blur-sm
            ${t.kind==='success' ? 'border-green-500/40 bg-green-500/15 text-green-200' :
              t.kind==='error' ? 'border-red-500/40 bg-red-500/15 text-red-200' :
              'border-sky-500/40 bg-sky-500/15 text-sky-200'}`}>
            {t.msg}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast(){
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
