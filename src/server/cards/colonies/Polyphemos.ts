import {CorporationCard} from '../corporation/CorporationCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Size} from '../../../common/cards/render/Size';
import {Player} from '../../Player';
import {IProjectCard} from '../IProjectCard';

export class Polyphemos extends CorporationCard {
  constructor() {
    super({
      name: CardName.POLYPHEMOS,
      startingMegaCredits: 65,
      cardCost: 5,

      behavior: {
        production: {megacredits: 5}
      },

      metadata: {
        cardNumber: 'R11',
        // description: 'You start with 65 M€ (change: +15; -5 titanium). Increase your M€ production 5 steps.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.megacredits(65).nbsp.production((pb) => pb.megacredits(5));
		  b.text('(Changed: +15 M€, -5 titanium).', Size.TINY, false, false);
          b.corpBox('effect', (ce) => {
			ce.vSpace(Size.LARGE);
            ce.effect(undefined, (eb) => {
              eb.cards(1).asterix().startEffect.megacredits(5);
            });
			ce.vSpace();
            ce.effect('When you buy a card to hand, pay 5 M€ instead of 3, including the starting hand. (buff:) WHEN PLAYING A CARD WITH A BASIC COST OF 15 M€ OR MORE, draw a card.', (eb) => {
			  eb.minus().megacredits(15).startEffect.cards(1);
            });
          });
        }),
      },
    });
  }
  
  public onCardPlayed(player: Player, card: IProjectCard) {
    if (card.cost >= 15 && player.isCorporation(CardName.POLYPHEMOS)) {
      player.drawCard();
    }
  }
}
