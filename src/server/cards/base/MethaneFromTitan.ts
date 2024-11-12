import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class MethaneFromTitan extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.METHANE_FROM_TITAN,
      tags: [Tag.JOVIAN, Tag.SPACE],
      cost: 11,
      victoryPoints: 1,

      behavior: {
        production: {heat: 2},
      },

      requirements: {oxygen: 4},
      metadata: {
        description: 'Requires 4% oxygen. Increase your heat production 2 steps. (rework: -17 cost, -2 plant prod, -1 VP, +2 Oxygen req)',
        cardNumber: '018',
        renderData: CardRenderer.builder((b) => b.production((pb) => {
          pb.heat(2);
        })),
      },
    });
  }
}
