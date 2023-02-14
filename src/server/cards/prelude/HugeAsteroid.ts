import {Player} from '../../Player';
import {PreludeCard} from './PreludeCard';
import {CardName} from '../../../common/cards/CardName';
import {SelectPaymentDeferred} from '../../deferredActions/SelectPaymentDeferred';
import {CardRenderer} from '../render/CardRenderer';

export class HugeAsteroid extends PreludeCard {
  constructor() {
    super({
      name: CardName.HUGE_ASTEROID,

      startingMegacredits: -7,

      behavior: {
        global: {temperature: 3},
      },

      metadata: {
        cardNumber: 'P15',
        renderData: CardRenderer.builder((b) => {
          b.temperature(3).br;
          b.megacredits(-7);
        }),
        description: 'Increase temperature 3 steps. Pay 7 (nerf: -2) M€.',
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
