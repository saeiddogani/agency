import { ImageResponse } from "next/og";

export const size = {
  width: 48,
  height: 48,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#101f33",
          color: "#ffffff",
          fontSize: 26,
          fontWeight: 700,
          borderRadius: 8,
        }}
      >
        N
      </div>
    ),
    { ...size }
  );
}
