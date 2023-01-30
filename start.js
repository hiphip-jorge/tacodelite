const fs = require("fs");
const { spawn } = require("child_process");
const os = require("os");
const path = require("path");

const { PORT } = process.env;

async function go() {
    await exec("npx prisma migrate deploy");


    console.log("Starting app...");
    await exec(`PORT=${PORT} remix-serve build`);
}

go();

async function exec(command) {
  const child = spawn(command, { shell: true, stdio: "inherit" });
  await new Promise((res, rej) => {
    child.on("exit", (code) => {
      if (code === 0) {
        res();
      } else {
        rej();
      }
    });
  });
}

// restart docker image
// 1) docker images -> grab image id
// 2) docker image rm -f  <image id>
// 3) docker system prune
// rebuild
// 4) docker build .
// test
// 5) docker run -p 8080:8080 -i -t <new image id>