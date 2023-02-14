import {Tag} from '../../../common/cards/Tag';
import {PreludeCard} from './PreludeCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class Biolab extends PreludeCard {
  constructor() {
    super({
      name: CardName.BIOLAB,
      tags: [Tag.SCIENCE],

      behavior: {
        production: {megacredits: 1, plants: 1},
        drawCard: 2,
      },

      metadata: {
        cardNumber: 'P04',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.megacredits(1).plants(1)).br;
          b.cards(2);
        }),
        description: 'Increase your M€ (buff: +1) and plant production 1 step. Draw 2 (nerf: -1) cards.',
      },
    });
  }
}

