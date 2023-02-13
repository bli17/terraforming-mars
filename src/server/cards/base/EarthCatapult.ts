import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class EarthCatapult extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.ACTIVE,
      name: CardName.EARTH_CATAPULT,
      tags: [Tag.EARTH],
      cost: 28,
      victoryPoints: 2,

      cardDiscount: {amount: 2},
      metadata: {
        cardNumber: '070',
        renderData: CardRenderer.builder((b) => {
          b.effect('When you play a card, you pay 2 M€ less for it. (nerfed: +5 M€)', (eb) => {
            eb.empty().startEffect.megacredits(-2);
          });
        }),
      },
    });
  }
}
