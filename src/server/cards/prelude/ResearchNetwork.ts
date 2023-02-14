import {Tag} from '../../../common/cards/Tag';
import {PreludeCard} from './PreludeCard';
import {IProjectCard} from '../IProjectCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class ResearchNetwork extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.RESEARCH_NETWORK,
      tags: [Tag.WILD],

      behavior: {
        production: {megacredits: 2},
        drawCard: 2,
      },

      metadata: {
        cardNumber: 'P28',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.megacredits(2)).br;
          b.cards(2);
        }),
        description: 'Increase your M€ production 2 (buff: +1) steps. Draw 2 (nerf: -1) cards. After being played, when you perform an action, the wild tag counts as any tag of your choice.',
      },
    });
  }
}
