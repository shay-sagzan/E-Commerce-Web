import { LaptopComponent } from "./LaptopComponent"
import { createElement, loadLocalStorage, saveLaptops } from "./utilities"
import { resetRows } from "./filter"
import { Data } from "./data"

const table = createElement("table", [], ["table1"], {
  id: "table",
}) as HTMLTableElement

if (window.location.pathname === "/" || window.location.pathname === "/admin.html") {
  const mainDiv = document.querySelector(".main-section") as HTMLDivElement

  const tableDiv = createElement("div", [table], ["table-section"]) as HTMLDivElement
  mainDiv.append(tableDiv)
}

if (window.location.pathname === "/") {
  const isLaptopsExists = loadLocalStorage()?.length > 0

  if (isLaptopsExists) {
    loadLocalStorage().forEach((item: any) => {
      new LaptopComponent(item)
    })
  } else {
    LaptopComponent.laptopsArr.forEach((item: any) => {
      new LaptopComponent(item)
    })
  }
  saveLaptops()

  /**
   * Sorts a HTML table.
   *
   * @param {HTMLTableElement} table - The table to sort
   * @param {boolean} asc - Determines if the sorting will be in ascending
   */
  function sortTableByColumn(table: HTMLTableElement, asc = true): void {
    const dirModifier = asc ? 1 : -1
    const rows = Array.from(table.querySelectorAll<HTMLTableElement>("tr"))

    // Sort each row
    const sortedRows = rows.sort((a: any, b: any) => {
      const aColText = a.querySelector(".title")?.textContent?.trim()
      const bColText = b.querySelector(".title")?.textContent?.trim()

      return aColText > bColText ? 1 * dirModifier : -1 * dirModifier
    })

    // Remove all existing TRs from the table
    while (table.firstChild) {
      table.removeChild(table.firstChild)
    }

    // Re-add the newly sorted rows
    table.append(...sortedRows)
  }

  const select = document.getElementById("sortBy") as HTMLSelectElement
  select.onchange = listFormatter

  /**
   * The function sort the laptops array by ascending or descending
   *
   * @returns void
   */ function listFormatter(): void {
    if (select.value === "ascending") {
      sortTableByColumn(table, true)
    } else if (select.value === "descending") {
      sortTableByColumn(table, false)
    }
  }
}

if (window.location.pathname === "/admin.html") {
  loadLocalStorage().forEach((item: any) => {
    new LaptopComponent(item)
  })

  const price = document.querySelector(".price") as HTMLInputElement
  const title = document.querySelector(".add-new-title") as HTMLInputElement
  const id = document.querySelector(".id") as HTMLInputElement
  const brand = document.querySelector(".brand") as HTMLInputElement
  const type = document.querySelector(".type") as HTMLInputElement
  const model = document.querySelector(".model") as HTMLInputElement
  const ram = document.querySelector(".ram") as HTMLInputElement
  const memory = document.querySelector(".memory") as HTMLInputElement
  const processor = document.querySelector(".processor") as HTMLInputElement
  const resolution = document.querySelector(".resolution") as HTMLInputElement
  const os = document.querySelector(".os") as HTMLInputElement

  const addButton = document.querySelector(".add-laptop") as HTMLButtonElement
  addButton.addEventListener("click", () => {
    const newLaptop: Data = {
      price: ~~price.value,
      img: "https://creatixcdn.azureedge.net/fetch/pc365/w_230,h_147,mode_pad,v_13/https://www.pc365.co.il/images/mbp14-spacegray-gallery1-202110(3).png",
      currency: "₪",
      id: id.value,
      title: title.value,
      specs: {
        brand: brand.value,
        type: type.value,
        model: model.value,
        ram: ram.value,
        memory: memory.value,
        processor: processor.value,
        resolution: resolution.value,
        os: os.value,
      },
      companyLogo:
        "https://creatixcdn.azureedge.net/fetch/pc365/w_93,h_53,mode_pad,v_13/https://www.pc365.co.il/images/Apple_logo_black.svg.png",
    }

    LaptopComponent.laptopsArr.push(newLaptop)
    saveLaptops()
    resetRows()
    loadLocalStorage().forEach((item: any) => {
      new LaptopComponent(item)
    })
  })

  const buttons = document.querySelectorAll<HTMLButtonElement>(
    "button[class^=remove-button]"
  )

  buttons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const removeBtn = event.target as HTMLButtonElement
      removeBtn.parentElement?.remove()
    })
    saveLaptops()
  })
  saveLaptops()
}

if (window.location.pathname === "/edit.html") {
  const save = document.querySelector(".save-button") as HTMLButtonElement

  /**
   * The function returns the id of the chosen laptop
   *
   * @return - id of selected element.
   */
  function getId(): string {
    // Get the id from the url:
    let id = ""
    window.location.search
      .replace("?", "")
      .split("&")
      .forEach((query) => {
        const key = query.split("=")[0]
        if (key == "id") id = query.split("=")[1]
      })
    return id
  }

  const specificLaptop: Data = findLaptop()!

  /**
   * Creates a new rows and cells for the table
   *
   * @return - The function returns the laptop which is in the laptops array (Data),
   * otherwise, returns empty object.
   */
  function findLaptop() {
    for (const laptop of LaptopComponent.laptopsArr) {
      if (laptop.id === getId()) {
        return laptop
      }
    }
    return {
      price: 0,
      img: "",
      currency: "",
      id: "",
      title: "",
      specs: {
        brand: "",
        type: "",
        model: "",
        ram: "",
        memory: "",
        processor: "",
        resolution: "",
        os: "",
      },
      companyLogo: "",
    }
  }

  let inputTitle = document.querySelector("#inputTitle") as HTMLInputElement
  inputTitle.value = specificLaptop.title

  let inputBrand = document.querySelector("#inputBrand") as HTMLInputElement
  inputBrand.value = specificLaptop.specs.brand

  let inputType = document.querySelector("#inputType") as HTMLInputElement
  inputType.value = specificLaptop.specs.type

  let inputModel = document.querySelector("#inputModel") as HTMLInputElement
  inputModel.value = specificLaptop.specs.model

  let inputRam = document.querySelector("#inputRam") as HTMLInputElement
  inputRam.value = specificLaptop.specs.ram

  let inputMemory = document.querySelector("#inputMemory") as HTMLInputElement
  inputMemory.value = specificLaptop.specs.memory

  let inputProcessor = document.querySelector("#inputProcessor") as HTMLInputElement
  inputProcessor.value = specificLaptop.specs.processor

  let inputResolution = document.querySelector(
    "#inputResolution"
  ) as HTMLInputElement
  inputResolution.value = specificLaptop.specs.resolution

  let inputOS = document.querySelector("#inputOS") as HTMLInputElement
  inputOS.value = specificLaptop.specs.os

  let inputPrice = document.querySelector("#inputPrice") as HTMLInputElement
  inputPrice.value = specificLaptop.price.toString()

  let inputID = document.querySelector("#inputID") as HTMLInputElement
  inputID.value = specificLaptop.id

  save.addEventListener("click", () => {
    for (let i = 0; i < LaptopComponent.laptopsArr.length; i++) {
      let element = specificLaptop.id
      if (element === LaptopComponent.laptopsArr[i].id) {
        LaptopComponent.laptopsArr[i].title = inputTitle.value
        LaptopComponent.laptopsArr[i].specs.brand = inputBrand.value
        LaptopComponent.laptopsArr[i].specs.type = inputType.value
        LaptopComponent.laptopsArr[i].specs.model = inputModel.value
        LaptopComponent.laptopsArr[i].specs.ram = inputRam.value
        LaptopComponent.laptopsArr[i].specs.memory = inputMemory.value
        LaptopComponent.laptopsArr[i].specs.processor = inputProcessor.value
        LaptopComponent.laptopsArr[i].specs.resolution = inputResolution.value
        LaptopComponent.laptopsArr[i].specs.os = inputOS.value
        ~~LaptopComponent.laptopsArr[i].price === ~~inputPrice.value
        LaptopComponent.laptopsArr[i].id = inputID.value
        saveLaptops()
        return
      }
    }
  })

  saveLaptops()
}
