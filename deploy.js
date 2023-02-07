import fetch, { FormData, fileFromSync } from "node-fetch";
import fs from 'fs';

const distFile = "dist/index.css";

// Get file
if (!fs.existsSync(distFile)) {
  console.error("Target file doesn't exist, please build it first.");
} else {

  const formData = new FormData();
  formData.append('file', fileFromSync(distFile));

  fetch('https://ipfs-relay.crossbell.io/upload', {
    method: 'POST',
    body: formData,
  }).then(r => r.json()).then(r => {
    console.log("Your theme has been uploaded successfully, please add following line to your xLog custom css: ")
    console.log(`@import url("${r.url}");`)
  }).catch(e => {
    console.error("Upload failed with error: ", e)
  })

}
