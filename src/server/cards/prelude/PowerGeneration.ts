import {Tag} from '../../../common/cards/Tag';
import {PreludeCard} from './PreludeCard';
import {IProjectCard} from '../IProjectCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class PowerGeneration extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.POWER_GENERATION,
      tags: [Tag.POWER],

      behavior: {
        production: {energy: 4},
      },

      metadata: {
        cardNumber: 'P27',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.energy(4));
        }),
        description: 'Increase your energy production 4 (buff: +1) steps.',
      },
    });
  }
}
