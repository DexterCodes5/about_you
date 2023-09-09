export class ProductModel {
  _id?: string
  brand: string
  title: string
  price: string
  color: string
  otherColors: string[]
  sizes: string[]
  designAndCharacteristics: string[]
  number: string
  sleeveLength: string
  length?: string
  cut: string
  model?: string
  shirtCollar: string
  material: string
  countryOfOrigin: string
  support: string[]
  img: string[]
  productUrl: string
  productsWithOtherColors: string[]

  constructor(brand: string, title: string, price: string, color: string, otherColors: string[], sizes: string[], 
              designAndCharacteristics: string[], number: string, sleeveLength: string, cut: string, shirtCollar: string,
              material: string, countryOfOrigin: string, support: string[], img: string[], productUrl: string, 
              productsWithOtherColors: string[]) {
    this.brand = brand
    this.title = title
    this.price = price
    this.color = color
    this.otherColors = otherColors
    this.sizes = sizes
    this.designAndCharacteristics = designAndCharacteristics
    this.number = number
    this.sleeveLength = sleeveLength
    this.cut = cut
    this.shirtCollar = shirtCollar
    this.material = material
    this.countryOfOrigin = countryOfOrigin
    this.support = support
    this.img = img
    this.productUrl = productUrl
    this.productsWithOtherColors = productsWithOtherColors
  }
}