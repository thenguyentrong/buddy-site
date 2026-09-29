/** A round smartwatch drawn around its screen: strap, case, bezel and two side buttons. */
export function Watch({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`watch ${className}`}>
      <div className="watch-strap watch-strap-top" />
      <div className="watch-strap watch-strap-bottom" />
      <div className="watch-button" style={{ top: "calc(var(--s) * 0.675)" }} />
      <div className="watch-button" style={{ top: "calc(var(--s) * 1.095)" }} />
      <div className="watch-case">
        <div className="watch-bezel">
          <div className="watch-screen">{children}</div>
        </div>
      </div>
    </div>
  );
}
