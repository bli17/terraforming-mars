import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {ActionCard} from '../ActionCard';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class UndergroundDetonations extends ActionCard implements IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.UNDERGROUND_DETONATIONS,
      tags: [Tag.BUILDING],
      cost: 4,

      action: {
        spend: {megacredits: 6},
        production: {heat: 2},
      },

      metadata: {
        cardNumber: '202',
        renderData: CardRenderer.builder((b) => {
          b.action('Spend 6M€ (buff: -4) to increase your heat production 2 steps. (buff: -2M€)', (eb) => {
            eb.megacredits(6).startAction.production((pb)=>pb.heat(2));
          });
        }),
      },
    });
  }
}
