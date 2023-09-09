
export class UserModel {
  _id?: string
  firstName: string
  lastName: string
  email: string
  password?: string
  gender: string
  emailUpdates: boolean
  accessToken?: String

  constructor(firstName: string, lastName: string, email: string, password: string, gender: string, emailUpdates: boolean) {
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.password = password
    this.gender = gender
    this.emailUpdates = emailUpdates
  }
}