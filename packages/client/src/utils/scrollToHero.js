import animate from './animate'

export default function scrollToHero () {
  animate({
    func: current => window.scrollTo(0, current),
    from: window.scrollY,
    to: document.getElementById('Hero').offsetHeight
  })
}
