class GetAge {
  age (age) {
    let countDownDate = new Date(age).getFullYear()
    // Get todays date and time
    let now = new Date().getFullYear()
    let year = Math.floor(now - countDownDate)
    console.log(countDownDate)
    return year
  }
}
module.exports = new GetAge()
