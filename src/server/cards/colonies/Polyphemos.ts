import {ICorporationCard} from '../corporation/ICorporationCard';
import {Card} from '../Card';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Size} from '../../../common/cards/render/Size';
import {Player} from '../../Player';
import {IProjectCard} from '../IProjectCard';

export class Polyphemos extends Card implements ICorporationCard {
  constructor() {
    super({
      name: CardName.POLYPHEMOS,
      startingMegaCredits: 60,
      cardType: CardType.CORPORATION,
      cardCost: 5,

      behavior: {
        production: {megacredits: 5}
      },

      metadata: {
        cardNumber: 'R11',
        // description: 'You start with 60 (buff: +10) M€. Increase your M€ production 5 steps. (nerf: -5 titanium)',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.megacredits(60).nbsp.production((pb) => pb.megacredits(5));
		  b.text('(Changed: +10 M€, -5 titanium).', Size.TINY, false, false);
          b.corpBox('effect', (ce) => {
			ce.vSpace(Size.LARGE);
            ce.effect(undefined, (eb) => {
              eb.cards(1).asterix().startEffect.megacredits(5);
            });
			ce.vSpace();
            ce.effect('When you buy a card to hand, pay 5M€ instead of 3, including the starting hand. (Buff:) WHEN PLAYING A CARD WITH A BASIC COST OF 20M€ OR MORE, draw a card.', (eb) => {
			  eb.minus().megacredits(20).startEffect.cards(1);
            });
          });
        }),
      },
    });
  }
  
  public onCardPlayed(player: Player, card: IProjectCard) {
    if (card.cost >= 20) {
      player.drawCard();
    }
  }
}
