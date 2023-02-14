import {Tag} from '../../../common/cards/Tag';
import {Player} from '../../Player';
import {PreludeCard} from './PreludeCard';
import {CardName} from '../../../common/cards/CardName';
import {SelectPaymentDeferred} from '../../deferredActions/SelectPaymentDeferred';
import {CardRenderer} from '../../cards/render/CardRenderer';

export class GalileanMining extends PreludeCard {
  constructor() {
    super({
      name: CardName.GALILEAN_MINING,
      tags: [Tag.JOVIAN],

      behavior: {
        production: {titanium: 2},
      },
      startingMegacredits: -7,

      metadata: {
        cardNumber: 'P13',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.titanium(2);
          }).br;
          b.megacredits(-7);
        }),
        description: 'Increase your titanium production 2 steps. Pay 7 (nerf: -2) M€.',
      },
    });
  }
  public override bespokeCanPlay(player: Player) {
    return player.canAfford(7);
  }
  public override bespokePlay(player: Player) {
    player.game.defer(new SelectPaymentDeferred(player, 7));
    return undefined;
  }
}
