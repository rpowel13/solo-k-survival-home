
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"
import { memo } from "react"

const AspectRatio = memo(({ ratio, children, className, ...props }: AspectRatioPrimitive.AspectRatioProps) => {
  // Optimize by pre-calculating percentage instead of relying on the primitive to do it
  const paddingBottom = ratio ? `${(1 / ratio) * 100}%` : undefined;
  
  return (
    <div
      className={className}
      style={{ position: 'relative', width: '100%', paddingBottom }}
      {...props}
    >
      {paddingBottom ? (
        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}>
          {children}
        </div>
      ) : (
        <AspectRatioPrimitive.Root ratio={ratio} className={className} {...props}>
          {children}
        </AspectRatioPrimitive.Root>
      )}
    </div>
  );
});

AspectRatio.displayName = "AspectRatio"

export { AspectRatio }
