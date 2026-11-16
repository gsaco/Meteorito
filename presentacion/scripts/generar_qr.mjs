import QRCode from "qrcode";
import { fileURLToPath } from "node:url";

// Se genera localmente: no depende de un servicio externo de códigos QR.
const output = fileURLToPath(new URL("../assets/qr-meteoritos.svg", import.meta.url));
await QRCode.toFile(output, "https://gsaco.github.io/Meteorito/", {
  type: "svg",
  errorCorrectionLevel: "M",
  margin: 4,
  color: { dark: "#0c252d", light: "#ffffff" },
});
