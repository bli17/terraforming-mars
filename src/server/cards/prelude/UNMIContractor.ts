import {Tag} from '../../../common/cards/Tag';
import {PreludeCard} from './PreludeCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class UNMIContractor extends PreludeCard {
  constructor() {
    super({
      name: CardName.UNMI_CONTRACTOR,
      tags: [Tag.EARTH],

      behavior: {
        drawCard: 2,
        tr: 2,
      },

      metadata: {
        cardNumber: 'P34',
        renderData: CardRenderer.builder((b) => {
          b.tr(2).br;
          b.cards(2);
        }),
        description: 'Increase your TR 2 (nerf: -1) steps. Draw 2 (buff: +1) cards.',
      },
    });
  }
}
