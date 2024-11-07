import { Storage } from "@google-cloud/storage";

let projectId = "desarrollo-tpf";
let keyFilename = "key.json";

const storage = new Storage({
  projectId,
  keyFilename,
});

const bucket = storage.bucket("obrasbienal");
export default bucket;
