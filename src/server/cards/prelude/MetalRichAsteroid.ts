import {PreludeCard} from './PreludeCard';
import {IProjectCard} from '../IProjectCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class MetalRichAsteroid extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.METAL_RICH_ASTEROID,

      behavior: {
        stock: {titanium: 3, steel: 4},
        global: {temperature: 1},
      },
      metadata: {
        cardNumber: 'P19',
        renderData: CardRenderer.builder((b) => {
          b.temperature(1).titanium(3).br;
          b.steel(4);
        }),
        description: 'Increase temperature 1 step. Gain 3 (nerf: -1) titanium and 4 steel.',
      },
    });
  }
}

