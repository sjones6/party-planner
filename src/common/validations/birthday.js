/**
 * Validation to ensure a user is not <6 or >117.
 *
 * @param {Date} birthday  the birthday to validate
 */
module.exports = birthday => {
  // safeguard
  if (!(birthday instanceof Date)) {
    throw new TypeError('birthday validation expects a Date object')
  }

  let res
  const currentYear = new Date().getFullYear()
  if (birthday.getFullYear() + 6 > currentYear) {
    res = {
      'Whoops!': ['You must be at least 6 to use our site! Better luck next year!'],
    }

    // ensure they're not older than 117
  } else if (currentYear - 117 > birthday.getFullYear()) {
    res = {
      'Hmmm!': ["You're older than the oldest person alive! Surely you're not immortal."],
    }
  }

  return res
}
