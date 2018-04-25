import React, { Component } from 'react'
import uuidv4 from 'uuid/v4'

import './CardList.css'
import CardItem from '../CardItem/CardItem'
import img_aquarius from '../../assets/aquarius.png'
import img_aries from '../../assets/aries.png'
import img_cancer from '../../assets/cancer.png'
import img_capricorn from '../../assets/capricorn.png'
import img_gemini from '../../assets/gemini.png'
import img_leo from '../../assets/leo.png'
import img_libra from '../../assets/libra.png'
import img_pisces from '../../assets/pisces.png'
import img_sagittarius from '../../assets/sagittarius.png'
import img_scorpio from '../../assets/scorpio.png'
import img_taurus from '../../assets/taurus.png'
import img_virgo from '../../assets/virgo.png'

let cards = [
  { name: 'aquarius', img: img_aquarius },
  { name: 'aries', img: img_aries },
  { name: 'cancer', img: img_cancer },
  { name: 'capricorn', img: img_capricorn },
  { name: 'gemini', img: img_gemini },
  { name: 'leo', img: img_leo },
  { name: 'libra', img: img_libra },
  { name: 'pisces', img: img_pisces },
  { name: 'sagittarius', img: img_sagittarius },
  { name: 'scorpio', img: img_scorpio },
  { name: 'taurus', img: img_taurus },
  { name: 'virgo', img: img_virgo }
]

cards = [...cards, ...cards]
  .sort(() => 0.5 - Math.random())
  .map(card => ({
    id: uuidv4(),
    name: card.name,
    img: card.img,
    selected: false
  }))

class CardList extends Component {
  state = {
    cards: cards,
    count: 0,
    delay: 1200,
    previousGuess: null
  }

  handleFrontClick = (id) => {
    const {
      count,
      delay,
      previousGuess
    } = this.state

    // click the same card as before
    if (previousGuess === id || count == 2) {
      return false
    }

    // first guess
    if (count === 0) {
      this.setState({
        count: 1,
        previousGuess: id
      })
    } else if(count === 1) {
      this.setState({
        count: 2
      })
    }

    this.setState(prevState => ({
      cards: [...prevState.cards].map(card => card.id === id ? {...card, selected: true} : card)
    }), () => {

      // callback after set the card as selected
      const { count } = this.state

      // if first selected, break
      if (count === 1) {
        return false
      }

      // verify current taget has the same name as previous or not
      const prevCard = cards.find(card => card.id === previousGuess)
      const currentCard = cards.find(card => card.id === id)

      if (prevCard.name === currentCard.name) {

        // Aha! you got it, set the selected cards as match and remove the selected state
        setTimeout(() => {
          this.setState(prevState => ({
            cards: [...prevState.cards].map(card =>
              (card.id === prevCard.id || card.id === currentCard.id)
                ? {...card, match: true, selected: false}
                : card
            ),
            count: 0,
            previousGuess: null
          }))
        }, delay)

      } else {

        // Sorry, you are not catch it, bring the initial state back
        setTimeout(() => {
          this.setState(prevState => ({
            cards: [...prevState.cards].map(card =>
              (card.id === prevCard.id || card.id === currentCard.id)
                ? {...card, selected: false}
                : card
            ),
            count: 0,
            previousGuess: null
          }))
        }, delay)
      }
    })
  }

  render () {
    const { cards } = this.state

    return (
      <section className="grid">
        {cards.map(card => (
          <CardItem
            key={card.id}
            id={card.id}
            name={card.name}
            backImage={card.img}
            selected={card.selected}
            match={card.match}
            onFrontClick={this.handleFrontClick}
          />
        ))}
      </section>
    )
  }
}

export default CardList
