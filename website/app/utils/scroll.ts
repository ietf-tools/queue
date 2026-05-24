const attemptToScrollToHashId = () => {
  if (typeof window === 'undefined') {
    console.log(`Can't scroll without 'window'`)
    return
  }
  const { hash } = window.location
  if (!hash) {
    // no need to scroll
    return
  }
  const normalisedHash = hash.replace(/^#/, '')
  if (!normalisedHash) {
    // no need to scroll
    return
  }
  const target = document.getElementById(normalisedHash)
  if (!target) {
    console.log(
      `Can't find # target ${JSON.stringify(normalisedHash)} (from ${JSON.stringify(hash)})`
    )
    return
  }
  try {
    target.scrollIntoView({
      behavior: 'instant' // this is done on page load so it shouldn't be smooth scrolling
    })
    target.focus()
  } catch (e) {
    console.error(
      `Unable to scroll/focus to ${JSON.stringify(normalisedHash)} (from ${JSON.stringify(hash)})`,
      e
    )
  }
}

export const scrollToHashId = () => {
  if (typeof window === 'undefined') {
    console.log(`Can't scroll without 'window'`)
    return
  }

  setTimeout(attemptToScrollToHashId, 30)
}
