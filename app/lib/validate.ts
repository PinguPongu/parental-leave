
export function validateKennitala(kennitala: string) {
  if (!Number.isNaN(Number(kennitala))) {
    return false;
  }
  if (kennitala.length !== 10) {
    return false;
  }

  return true;
}

export function validatePhoneNumber(phoneNumber: string) {

}

export function validateEmail(email: string) {
  
}