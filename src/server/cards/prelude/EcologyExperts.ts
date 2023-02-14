import {Tag} from '../../../common/cards/Tag';
import {CardName} from '../../../common/cards/CardName';
import {PreludeCard} from './PreludeCard';
import {CardRenderer} from '../render/CardRenderer';

export class EcologyExperts extends PreludeCard {
  constructor() {
    super({
      name: CardName.ECOLOGY_EXPERTS,
      tags: [Tag.SCIENCE],

      behavior: {
        production: {plants: 1, heat: 2},
      },

      metadata: {
        cardNumber: 'P10',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.plants(1).heat(2)).br.br;
          b.plate('Global requirements').text(' : +/- 2');
        }),
        description: '(rework:) Increase your plant production 1 step and your heat production 2 steps. Your global requirements are +2 or -2 steps, your choice in each case.',
      },
    });
  }
  public getRequirementBonus(): number {
    return 2;
  }
}
