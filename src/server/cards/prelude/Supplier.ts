import {Tag} from '../../../common/cards/Tag';
import {PreludeCard} from './PreludeCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {digit} from '../Options';

export class Supplier extends PreludeCard {
  constructor() {
    super({
      name: CardName.SUPPLIER,
      tags: [Tag.POWER],

      behavior: {
        production: {energy: 2},
        stock: {steel: 6},
      },

      metadata: {
        cardNumber: 'P32',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.energy(2)).br;
          b.steel(6, {digit});
        }),
        description: 'Increase your energy production 2 steps. Gain 6 (buff: +2) steel.',
      },
    });
  }
}
