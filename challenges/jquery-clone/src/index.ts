import { default as fetch } from "node-fetch";

type $ = {
  html(arg: string): void;
  hide(): void;
  show(): void;
  on<E extends keyof HTMLElementEventMap>(eventName: E, callback: (event: HTMLElementEventMap[E]) => void): void;
};

function isHTMLElement(arg: unknown): arg is HTMLElement {
  return arg instanceof HTMLElement;
}

function $(selector: string): $ {
  const elements = document.querySelectorAll(selector);
  return {
    html(arg: string) {
      elements.forEach(i => i.innerHTML = arg);
    },
    hide() {
      elements.forEach(i => {
        if (isHTMLElement(i)) i.style.visibility = "hidden";
      })
    },
    show() {
      elements.forEach(i => {
        if (isHTMLElement(i)) i.style.visibility = "visible";
      })
    },
    on<E extends keyof HTMLElementEventMap>(eventName: E, callback: (event: HTMLElementEventMap[E]) => void) {
      elements.forEach(i => {
        if (isHTMLElement(i)) i.addEventListener(eventName, callback);
      })
    }
  };
}

namespace $ {
  export function ajax<T extends Record<PropertyKey, unknown>>(args: { url: string, success: (result: T) => void }): any {
    return fetch(args.url)
      .then((response) => response.json())
      .then(json => {
        args.success(json);
        return json;
      });
  }
}

export default $;
