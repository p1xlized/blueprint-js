export function builder(body, root) {
  while (root.firstChild) {
    root.removeChild(root.firstChild);
    console.log("Removing content");
  }

  root.appendChild(body);
  console.log("Appending content");
}

export function text(content) {
  const p = document.createElement("p");
  p.innerText = content;
  return p;
}
// is a div that nest toghether multiple elements
// todo: should take multiple objects append toghether( append child )
export function body() {
  let content = document.createElement("div");
  for (let i = 0; i < arguments.length; i++) {
    content.appendChild(arguments[i]);
  }
  return content;
}
export function form() {
  let content = document.createElement("form");
  for (let i = 0; i < arguments.length; i++) {
    content.appendChild(arguments[i]);
  }
  return content;
}

export function input({
  type = "text",
  name = "",
  setValue,
  value = "",
  placeholder = "",
  required = false,
}) {
  const input = document.createElement("input");
  input.type = type;
  input.name = name;
  input.placeholder = placeholder;
  input.required = required;

  if (typeof setValue === "function") {
    input.addEventListener("onchange", setValue);
  } else {
    console.error("The action provided is not a function");
  }
  return input;
}

export function style({
  background = "white",
  height = " ",
  width = "",
  border = "",
  radius = "",
  margin = "",
  padding = "",
} = {}) {
  return `
        background-color: ${background};
        height: ${height};
        width: ${width};
        border: ${border};
        border-radius: ${radius};
        margin: ${margin};
        padding: ${padding}`;
}

export function button({ content, action } = {}) {
  const btn = document.createElement("button");
  btn.innerHTML = content;
  console.log(btn);
  if (typeof action === "function") {
    btn.addEventListener("click", action);
  } else {
    console.error("The action provided is not a function");
  }
  return btn;
}
// const stateObj = {
//   state: "Dave",
//   setState: function (newState) {
//       this.state = newState;
//   }
// }

// console.log(stateObj.state) // Dave
// stateObj.setState("John")
// console.log(stateObj.state) // John

export function mutable(initialValue) {
  let value = initialValue;
  const subscribers = [];

  function get() {
    return value;
  }

  function set(newValue) {
    if (value !== newValue) {
      value = newValue;
      subscribers.forEach((subscriber) => subscriber());
    }
  }

  function subscribe(subscriber) {
    subscribers.push(subscriber);
  }

  return { get, set, subscribe };
}
export function onMount(action) {
  addEventListener("DOMContentLoaded", (event) => {
    action;
  });
}
