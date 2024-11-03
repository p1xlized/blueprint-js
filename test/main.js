import { mutable, onMount } from "./library.js";
import { builder, body, text, button, input } from "./library.js";

let txt = mutable("");
const root = document.querySelector("#root");

async function fetchData() {
  fetch("https://jsonplaceholder.typicode.com/todos/")
    .then((response) => response.json())
    .then((json) => txt.set(JSON.stringify(json)));
}

onMount(fetchData());

function main() {
  builder(
    body(
      text("Hello world!"),
      text(`Value: ${txt.get()}`),
      // body(
      //   // input({
      //   //   type: "text",
      //   //   name: "name",
      //   //   setValue: (e) => {
      //   //     txt.set(e.target.value);
      //   //     console.log(txt.get());
      //   //   },
      //   //   value = txt.setValue,
      //   //   placeholder: "Enter your name",
      //   // }),
      // ),
      button({
        content: "Click me!",
        // action: () => {
        //   txt.set(+txt.get() + 1);
        // },
      }),
    ),
    root,
  );
}

txt.subscribe(main);
main();
console.log(txt.get());
