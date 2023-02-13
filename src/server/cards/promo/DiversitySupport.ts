import {IProjectCard} from '../IProjectCard';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRequirements} from '../CardRequirements';
import {CardRenderer} from '../render/CardRenderer';
import {Card} from '../Card';

export class DiversitySupport extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.EVENT,
      name: CardName.DIVERSITY_SUPPORT,
      tags: [],
      cost: 10,
	  victoryPoints: 2,

      behavior: {
        tr: 1,
      },

      requirements: CardRequirements.builder((b) => b.resourceTypes(9)),
      metadata: {
        cardNumber: 'X20',
        description: 'Requires that you have 9 different types of resources. Gain 1 TR. (change: +9 M€, +2 VP)',
        renderData: CardRenderer.builder((b) => b.tr(1)),
      },
    });
  }
}
