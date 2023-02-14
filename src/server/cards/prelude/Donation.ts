import {Player} from '../../Player';
import {PreludeCard} from './PreludeCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class Donation extends PreludeCard {
  constructor() {
    super({
      name: CardName.DONATION,

      startingMegacredits: 23,

      metadata: {
        cardNumber: 'P08',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(23);
        }),
        description: 'Gain 23 (buff: +2) M€.',
      },
    });
  }
  public override bespokePlay(player: Player) {
    player.megaCredits += 23;
    return undefined;
  }
}

