import {Tag} from '../../../common/cards/Tag';
import {PreludeCard} from './PreludeCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class EarlySettlement extends PreludeCard {
  constructor() {
    super({
      name: CardName.EARLY_SETTLEMENT,
      tags: [Tag.BUILDING, Tag.CITY],

      behavior: {
        production: {plants: 1},
        stock: {megacredits: 2},
        city: {},
      },

      metadata: {
        cardNumber: 'P09',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.plants(1)).megacredits(2).city();
        }),
        description: 'Increase your plant production 1 step. (Buff: +2 MC.) Place a city tile.',
      },
    });
  }
}
