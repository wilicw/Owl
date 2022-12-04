import Overlay from '@/style-components/Overlay';

interface OverlayCardProp {
  close: () => void,
  children: React.ReactNode
}

function OverlayCard({ close, children }:OverlayCardProp) {
  return (
    <div
      role="presentation"
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0,0,0,0.1)',
      }}
      onClick={close}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <Overlay
        onClick={(e) => e.stopPropagation()}
        style={{
          width: window.innerWidth * 0.8,
          height: window.innerHeight * 0.8,
        }}
      >
        {children}
      </Overlay>
    </div>
  );
}

export default OverlayCard;
