export default function Drawer({ open, onClose, title, children, side='right' }) {
  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      <div
        className={`absolute inset-0 bg-black/70 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <div className={`
        absolute top-0 ${side==='right'?'right-0':'left-0'} h-full w-[min(560px,92vw)]
        border-l border-white/15 bg-[var(--panel)] shadow-2xl p-5
        transition-transform ${open ? 'translate-x-0' : side==='right'? 'translate-x-full':'-translate-x-full'}
      `}>
        {title && <h3 className="text-xl font-bold mb-3">{title}</h3>}
        <div className="h-[calc(100%-2rem)] overflow-auto">{children}</div>
      </div>
    </div>
  );
}
