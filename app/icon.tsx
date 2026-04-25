import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
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
          background: "#3B2CF6",
          borderRadius: 128,
        }}
      >
        <div
          style={{
            color: "#FFFFFF",
            fontSize: 340,
            fontWeight: 900,
            fontFamily:
              'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial',
            lineHeight: 1,
            marginTop: -12,
          }}
        >
          E
        </div>
      </div>
    ),
    size
  );
}

