import {PreludeCard} from '../prelude/PreludeCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';

export class AntidesertificationTechniques extends PreludeCard {
  constructor() {
    super({
      name: CardName.ANTI_DESERTIFICATION_TECHNIQUES,
      tags: [Tag.MICROBE, Tag.PLANT],

      behavior: {
        production: {plants: 1, steel: 1},
        stock: {megacredits: 6},
      },

      metadata: {
        cardNumber: 'X49',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(6).br;
          b.production((pb) => pb.plants(1).steel(1));
        }),
        description: 'Gain 6 M€ (buff: +3). Increase your plant production 1 step and your steel production 1 step.',
      },
    });
  }
}

