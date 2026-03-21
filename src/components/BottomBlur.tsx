export const BottomBlur = () => (
  <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[1000] h-20">
    {/* Layered backdrop-blur strips for gradual buildup */}
    <div
      className="absolute inset-x-0 top-0 h-full backdrop-blur-[0.3px]"
      style={{
        maskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 100%)",
      }}
    />
    <div
      className="absolute inset-x-0 top-1/3 h-2/3 backdrop-blur-[0.6px]"
      style={{
        maskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 100%)",
      }}
    />
    <div
      className="absolute inset-x-0 top-2/3 h-1/3 backdrop-blur-[1px]"
      style={{
        maskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 100%)",
      }}
    />
    {/* Translucent background tint for the glass feel */}
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(to bottom, transparent 0%, color-mix(in srgb, var(--background) 40%, transparent) 50%, color-mix(in srgb, var(--background) 70%, transparent) 100%)",
      }}
    />
  </div>
);
