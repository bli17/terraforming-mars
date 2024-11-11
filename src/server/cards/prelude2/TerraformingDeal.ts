import {Tag} from '../../../common/cards/Tag';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {IPlayer} from '../../IPlayer';
import {Phase} from '../../../common/Phase';
import {Resource} from '../../../common/Resource';
import {PreludeCard} from '../prelude/PreludeCard';

export class TerraformingDeal extends PreludeCard {
  constructor() {
    super({
      name: CardName.TERRAFORMING_DEAL,
      tags: [Tag.EARTH],
	  
	  behavior: {
        stock: {megacredits: 11},
      },

      metadata: {
        cardNumber: 'P64',
		description: '(buff:) Gain 11 MC.',
        renderData: CardRenderer.builder((b) => {
          b.effect('Each step your TR is raised, you gain 1 M€ (nerf: -1).', (eb) => {
            eb.tr(1).startEffect.megacredits(1);
          });
		  b.br;
          b.megacredits(11);
        }),
      },
    });
  }

  // TODO(kberg): Like UNMO, TerraformingDeal can generate MC for raising TR  that MC can offset reds costs?
  public onIncreaseTerraformRating(player: IPlayer, cardOwner: IPlayer, steps: number) {
    if (cardOwner === player) {
      const phase = player.game.phase;
      if (phase === Phase.ACTION || phase === Phase.PRELUDES) {
        cardOwner.stock.add(Resource.MEGACREDITS, 1 * steps, {log: true});
      }
    }
  }
}
