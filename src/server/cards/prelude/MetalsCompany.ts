import {PreludeCard} from './PreludeCard';
import {IProjectCard} from '../IProjectCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';

export class MetalsCompany extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.METALS_COMPANY,
	  tags: [Tag.SPACE, Tag.BUILDING],

      behavior: {
        production: {steel: 1, titanium: 1},
      },

      metadata: {
        cardNumber: 'P20',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.steel(1).titanium(1));
        }),
        description: 'Increase your steel and titanium production 1 step (nerf: -1 M€ production).',
      },
    });
  }
}
