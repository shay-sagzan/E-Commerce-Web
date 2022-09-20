import { LaptopComponent } from "./LaptopComponent"

/**
 * The function filter the laptops array by Brand
 *
 * @param {any} event - Event which target the html element
 */
export function brandFilter(event: any) {
  const brand = event.target.innerHTML
  const filtered = LaptopComponent.laptopsArr.filter(
    (laptop) => laptop.specs.brand === brand
  )
  resetRows()

  filtered.forEach((item: any) => {
    new LaptopComponent(item)
  })
}

// Dom event for Brand Filter
const buttonsBrand = document.getElementsByClassName("brandFilter")
for (let i = 0; i < buttonsBrand.length; i++) {
  const buttonBrand = buttonsBrand[i]
  buttonBrand.addEventListener("click", brandFilter)
}

/**
 * The function filter the laptops array by Ram
 *
 * @param {any} event - Event which target the html element
 */
export function ramFilter(event: any) {
  const ram = event.target.innerHTML
  const filtered = LaptopComponent.laptopsArr.filter(
    (laptop) => laptop.specs.ram === ram
  )
  resetRows()
  filtered.forEach((item: any) => {
    new LaptopComponent(item)
  })
}

// Dom event for Ram Filter
const buttonsRam = document.getElementsByClassName("ramFilter")
for (let i = 0; i < buttonsRam.length; i++) {
  const buttonRam = buttonsRam[i]
  buttonRam.addEventListener("click", ramFilter)
}

/**
 * The function filter the laptops array by Price
 *
 * @param {any} event - Event which target the html element
 */
export function priceFilter(event: any) {
  const range = event.target.innerHTML
  const first: string[] = range.split("-")
  const minPrice = Number(first[0].slice(0, first[0].length - 1))
  const maxPrice = minPrice + 3000
  const filtered = LaptopComponent.laptopsArr.filter(
    (laptop) => laptop.price > minPrice && laptop.price < maxPrice
  )
  resetRows()
  filtered.forEach((item: any) => {
    new LaptopComponent(item)
  })
}

// Dom event for Price Filter
const priceButtons = document.querySelectorAll(".priceButton") as any
for (let i = 0; i < priceButtons.length; i++) {
  const priceButton = priceButtons[i]
  priceButton.addEventListener("click", priceFilter)
}

/**
 * The function delete all the rows in the table

 * @returns void
 */
export function resetRows(): void {
  const trArray = document.querySelectorAll(".row") as any
  for (const row of trArray) {
    row.remove()
  }
}
