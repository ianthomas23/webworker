import { Remote, wrap } from "comlink";
import { IMyClass } from "./defs";


export interface IRemoteMyClass extends Remote<IMyClass> {}


async function go() {
  const worker = new Worker(new URL("./worker.ts", import.meta.url), { type: 'module'});
  const remoteObj: IRemoteMyClass = wrap(worker);

  console.log("==> remoteObj", remoteObj);

  console.log("==> counter", await remoteObj.counter);
  await remoteObj.increment();
  console.log("==> counter", await remoteObj.counter);
}

document.addEventListener("DOMContentLoaded", async () => {
  await go();
});
