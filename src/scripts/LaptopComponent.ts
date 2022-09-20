import { Data, LAPTOPS } from "./data"
import { createElement, createHtmlElements } from "./utilities"

export class LaptopComponent {
  public static laptopsArr: Data[] = LAPTOPS
  static LAPTOPS_COUNTER = 0
  data: Data
  id: number

  constructor(data: Data) {
    this.data = data
    LaptopComponent.LAPTOPS_COUNTER++
    this.id = LaptopComponent.LAPTOPS_COUNTER
    this.render(this.data)
  }

  table = document.querySelector(".table1") as HTMLTableElement

  /**
   * Creates a new rows and cells for the laptops table
   *
   * @param {Data} data - An object with the laptop data
   */
  public render(data: Data): void {
    const td = createElement("td", [], [`tableData` + this.id]) as HTMLTableElement
    const tr = createElement("tr", [td], [`tableRow` + this.id], {
      id: "tr",
    }) as HTMLTableRowElement
    tr.classList.add("row")
    // console.log(this.parent)
    this.table.append(tr)

    this.createRows(data, td, this.id)
  }

  /**
   * Creates a new laptop item
   *
   * @param {Data} data - An object with the laptop data
   * @param {any} str - tableData element from the beginning of the code
   * @param {Number} num - The index of the for loop
   */
  public createRows(data: Data, str: any, num: number): void {
    let imgDiv = ""
    let titleDiv = ""
    let contentDiv = ""
    let idDiv = ""
    let logoDiv = ""
    let priceDiv = ""
    let editIcon = ""
    let removeIcon = ""

    // Create Img's
    imgDiv = `<img src="${data.img}"></img>`
    str.append(createHtmlElements(`<div>${imgDiv}</div>`))

    // Create Title
    titleDiv = `<h3>${data.title}</h3>`
    str.append(
      createHtmlElements(`<div class="title-div${num} title">${titleDiv}</div>`)
    )

    // Create Content
    Object.entries(data.specs).forEach((el) => {
      const first = el[0]
      const sec = el[1]
      contentDiv = `<span>${first}:${" " + sec}</span>`
      const tempDivForContent = document.querySelector(
        `.title-div${num}`
      ) as HTMLElement

      tempDivForContent.appendChild(createHtmlElements(`<div>${contentDiv}</div>`))
    })

    // Create ID Div
    idDiv = `<span>${data.id}</span>`
    str.append(
      createHtmlElements(
        `<section class="idDiv${num}">${'מק"ט: ' + idDiv}</section>`
      )
    )
    const tempDivForId = document.querySelector(`.idDiv${num}`) as HTMLElement

    // Create Logo Div
    logoDiv = `<img src="${data.companyLogo}"></img>`
    tempDivForId.append(createHtmlElements(`<div>${logoDiv}</div>`))

    // Create Price Div
    priceDiv = `<h2 class="priceDiv${num}">${"₪" + data.price}</h2>`
    tempDivForId.append(createHtmlElements(`<div>${priceDiv}</div>`))

    if (window.location.pathname === "/admin.html") {
      // Create Edit Icon
      editIcon = `<a href="edit.html?id=${data.id}
      "><button class="edit-button edit">Edit</button></a>`

      str.append(createHtmlElements(editIcon))

      // Remove Icon
      removeIcon = `<button class="remove-button${num} remove">Remove</button>`
      str.append(createHtmlElements(removeIcon))
    }
  }
}
