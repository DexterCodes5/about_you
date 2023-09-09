export class AddressModel {
  _id?: string
  name: string
  surname: string
  gender: string
  city: string
  postcode: string
  streetOrNeighborhood: string
  number: string
  additionalInfo?: string
  dateOfBirth: string
  userId: string

  constructor(gender: string, name: string, surname: string, city: string, postcode: string, streetOrNeighborhood: string, number: string, dateOfBirth: string, userId: string) {
    this.gender = gender
    this.name = name
    this.surname = surname
    this.city = city
    this.postcode = postcode
    this.streetOrNeighborhood = streetOrNeighborhood
    this.number = number
    this.dateOfBirth = dateOfBirth
    this.userId = userId
  }
}