const FigmaShape = ({
  width,
  height,
  top,
  left,
  opacity,
}: {
  width: number;
  height: number;
  top: number;
  left: number;
  opacity: number;
}) => {
  return (
    <div
      className="absolute border-4 border-[#CCCCF5]"
      style={{
        width,
        height,
        top,
        left,
        opacity,
        transform: "rotate(64deg)",
      }}
    />
  );
};

export default FigmaShape;
