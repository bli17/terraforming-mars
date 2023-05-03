import {Player} from '../../Player';
import {PreludeCard} from '../prelude/PreludeCard';
import {IPreludeCard} from '../prelude/IPreludeCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {SelectCard} from '../../inputs/SelectCard';

export class NewPartner extends PreludeCard {
  constructor() {
    super({
      name: CardName.NEW_PARTNER,

      metadata: {
        cardNumber: 'P43',
		description: '',
        renderData: CardRenderer.builder((b) => {
          b.text('(Nerf: no longer raises M€ production 1 step.) Immediately draw 3 (buff: +1) prelude cards. Play 1 of them, and discard the other.', Size.SMALL, true);
        }),
      },
    });
  }

  public override bespokePlay(player: Player) {
    const cardsDrawn: Array<IPreludeCard> = [
      player.game.preludeDeck.draw(player.game),
      player.game.preludeDeck.draw(player.game),
	  player.game.preludeDeck.draw(player.game),
    ];
    player.game.log(
      'You drew ${0}, ${1}, and ${2}',
      (b) => b.card(cardsDrawn[0]).card(cardsDrawn[1]).card(cardsDrawn[2]),
      {reservedFor: player});

    const playableCards = cardsDrawn.filter((card) => card.canPlay(player) === true);
    if (playableCards.length === 0) {
      player.game.log('${0}, ${1}, and ${2} were discarded as ${3} could not pay for both cards.', (b) => b.card(cardsDrawn[0]).card(cardsDrawn[1]).card(cardsDrawn[2]).player(player));
      return undefined;
    }

    return new SelectCard('Choose prelude card to play', 'Play', playableCards, ([card]) => {
      if (card.canPlay === undefined || card.canPlay(player)) {
        return player.playCard(card);
      } else {
        throw new Error('You cannot pay for this card');
      }
    });
  }
}
