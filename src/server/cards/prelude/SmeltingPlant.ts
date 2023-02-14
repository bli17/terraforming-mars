import {Tag} from '../../../common/cards/Tag';
import {PreludeCard} from './PreludeCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class SmeltingPlant extends PreludeCard {
  constructor() {
    super({
      name: CardName.SMELTING_PLANT,
      tags: [Tag.BUILDING],

      behavior: {
        stock: {steel: 3},
        global: {oxygen: 2},
      },

      metadata: {
        cardNumber: 'P30',
        renderData: CardRenderer.builder((b) => {
          b.oxygen(2).br;
          b.steel(3);
        }),
        description: 'Raise oxygen 2 steps. Gain 3 (nerf: -2) steel.',
      },
    });
  }
}
