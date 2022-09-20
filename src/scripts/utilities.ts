import { LaptopComponent } from "./LaptopComponent"

/**
 * Creates a new HTML element.
 *
 * Example usage:
 * `<div class="tableRow${i}"></div>`
 *
 * @param {String} str - The temp container of the content
 */
export function createHtmlElements(str: string) {
  const temp = document.createElement("template")
  temp.innerHTML = str
  return temp.content.firstElementChild as HTMLElement
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)],
 * ["nana", "banana"], {id: "bla"}, {click: (...) => {...}})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 * Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 * @param {Object} eventListeners - the event listeners on the element
 */
export function createElement(
  tagName: string,
  children: HTMLElement[] | string[] = [],
  classes: string[] = [],
  attributes: any = {},
  eventListeners: any = {}
): HTMLElement {
  const el = document.createElement(tagName)
  for (const child of children) {
    el.append(child)
  }
  for (const cls of classes) {
    el.classList.add(cls)
  }
  for (const attr in attributes) {
    el.setAttribute(attr, attributes[attr])
  }
  for (const event in eventListeners) {
    el.addEventListener(event, eventListeners[event])
  }
  return el
}

/**
 * @function saveLaptops
 * The function save all the Laptops which in the Laptops array at the local storage
 * @returns
 * Void.
 */
export function saveLaptops(): void {
  window.localStorage.removeItem("Laptops")
  localStorage.setItem("Laptops", JSON.stringify(LaptopComponent.laptopsArr))
}

/**
 * @function loadLaptops
 * The function load the Laptops from the Laptops array which is in the local storage.
 * @returns
 * The function returns a laptops array.
 */
export function loadLocalStorage(): any {
  const taskJSON = localStorage.getItem("Laptops")
  if (taskJSON == null) return []
  return JSON.parse(taskJSON)
}
