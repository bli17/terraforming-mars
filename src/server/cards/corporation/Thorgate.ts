import {Card} from '../Card';
import {Tag} from '../../../common/cards/Tag';
import {ICorporationCard} from './ICorporationCard';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';
import {played} from '../Options';
import {VictoryPoints} from '../ICard';

export class Thorgate extends Card implements ICorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.THORGATE,
      tags: [Tag.POWER],
      startingMegaCredits: 48,

      victoryPoints: VictoryPoints.tags(Tag.POWER, 1, 2),
	  behavior: {
        production: {energy: 1},
      },

      cardDiscount: {tag: Tag.POWER, amount: 2},
      metadata: {
        cardNumber: 'R13',
        description: 'You start with 1 energy production and 48 M€. (buff:) 1 VP per 2 Power tag you have.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.production((pb) => pb.energy(1)).nbsp.megacredits(48);
          b.corpBox('effect', (ce) => {
            ce.effect('When playing a power card OR THE STANDARD PROJECT POWER PLANT, you pay 2 (nerf: -1) M€ less for it.', (eb) => {
              // TODO(chosta): energy().played needs to be power() [same for space()]
              eb.energy(1, {played}).asterix().startEffect.megacredits(-2);
            });
          });
        }),
      },
    });
  }
}

