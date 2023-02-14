import {Tag} from '../../../common/cards/Tag';
import {Player} from '../../Player';
import {PreludeCard} from './PreludeCard';
import {CardName} from '../../../common/cards/CardName';
import {SelectPaymentDeferred} from '../../deferredActions/SelectPaymentDeferred';
import {CardRenderer} from '../render/CardRenderer';

export class BusinessEmpire extends PreludeCard {
  constructor() {
    super({
      name: CardName.BUSINESS_EMPIRE,
      tags: [Tag.EARTH],

      behavior: {
        production: {megacredits: 5},
      },
      startingMegacredits: -5,

      metadata: {
        cardNumber: 'P06',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.megacredits(5)).br;
          b.megacredits(-5);
        }),
        description: 'Increase your M€ production 5 (nerf: -1) steps. Pay 5 (buff: +1) M€.',
      },
    });
  }
  public override bespokeCanPlay(player: Player) {
    if (player.isCorporation(CardName.MANUTECH)) return true;
    return player.canAfford(5);
  }
  public override bespokePlay(player: Player) {
    player.game.defer(new SelectPaymentDeferred(player, 5));
    return undefined;
  }
}

