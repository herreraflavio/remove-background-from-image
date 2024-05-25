const { removeBackground, Config } = require("@imgly/background-removal-node");
const fs = require("fs");
const path = require("path");
const { Blob } = require("buffer");

// make sure to use the correct path to the wasm files in this case /assets/
const public_path =
  "file:///C:/Users/herre/Desktop/code-2024/background-remoable-projects/background-removable-working/assets/";

let config = {
  publicPath: public_path, // Path to the wasm files
};

// Image to remove background from
let image_src =
  "https://images.saymedia-content.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cq_auto:eco%2Cw_1200/MTk2ODc3MzMxMjI1MTI2MzI1/cats-speak.png";

removeBackground(image_src, config)
  .then((blob) => {
    // Assuming the library returns a Blob object which is not supported directly by fs.writeFile
    blob.arrayBuffer().then((arrayBuffer) => {
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFile(
        path.join(__dirname, "/output/output.png"),
        buffer,
        (err) => {
          if (err) {
            console.error("Failed to save image:", err);
            return;
          }
          // Image saved successfully to ./output/...
          console.log("Image saved as output.png");
        }
      );
    });
  })
  .catch((error) => {
    console.error("Failed to remove background:", error);
  });
