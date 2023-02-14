import {Tag} from '../../../common/cards/Tag';
import {PreludeCard} from './PreludeCard';
import {IProjectCard} from '../IProjectCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class Mohole extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.MOHOLE,
      tags: [Tag.BUILDING],

      behavior: {
        production: {heat: 4},
        stock: {heat: 4},
      },

      metadata: {
        cardNumber: 'P22',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.heat(4)).br;
          b.heat(4);
        }),
        description: 'Increase your heat production 4 (buff: +1) steps. Gain 4 (buff: +1) heat.',
      },
    });
  }
}
