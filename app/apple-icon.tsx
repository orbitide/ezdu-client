import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#3B2CF6",
          borderRadius: 40,
        }}
      >
        <div
          style={{
            color: "#FFFFFF",
            fontSize: 120,
            fontWeight: 900,
            fontFamily:
              'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial',
            lineHeight: 1,
            marginTop: -4,
          }}
        >
          E
        </div>
      </div>
    ),
    size
  );
}

