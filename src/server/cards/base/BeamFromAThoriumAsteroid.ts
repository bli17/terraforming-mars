
import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class BeamFromAThoriumAsteroid extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.BEAM_FROM_A_THORIUM_ASTEROID,
      tags: [Tag.JOVIAN, Tag.SPACE, Tag.POWER],
      cost: 14,
      victoryPoints: 1,

      behavior: {
        production: {energy: 2},
      },

      requirements: {tag: Tag.JOVIAN, count: 2},
      metadata: {
        cardNumber: '058',
        description: 'Requires two Jovian tags. Increase your energy production 2 steps. (rework: -18 cost, -3 heat prod, -1 energy prod, +1 Jovian req)',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.energy(2);
          });
        }),
      },
    });
  }
}
