import {Tag} from '../../../common/cards/Tag';
import {Player} from '../../Player';
import {PreludeCard} from './PreludeCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class AlliedBanks extends PreludeCard {
  constructor() {
    super({
      name: CardName.ALLIED_BANK,
      tags: [Tag.EARTH],

      behavior: {
        production: {megacredits: 3},
      },
      startingMegacredits: 6,

      metadata: {
        cardNumber: 'P01',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.megacredits(3)).br;
          b.megacredits(6);
        }),
        description: 'Increase your M€ production 3 (nerf: -1) steps. Gain 6 (buff: +3) M€.',
      },
    });
  }
  public override bespokePlay(player: Player) {
    player.megaCredits += this.startingMegaCredits;
    return undefined;
  }
}

