import {Player} from '../../Player';
import {CardName} from '../../../common/cards/CardName';
import {PreludeCard} from './PreludeCard';
import {PlayProjectCard} from '../../deferredActions/PlayProjectCard';
import {CardRenderer} from '../render/CardRenderer';
import {Size} from '../../../common/cards/render/Size';

export class EccentricSponsor extends PreludeCard {
  constructor() {
    super({
      name: CardName.ECCENTRIC_SPONSOR,

      startingMegacredits: 21,
	  
	  metadata: {
        cardNumber: 'P11',
        renderData: CardRenderer.builder((b) => {
		  b.megacredits(21).br;
          b.text('(rework:) Gain 21 M€. Play a card from hand.', Size.SMALL, true);
        }),
      },
    });
  }

  public override bespokePlay(player: Player) {
    player.megaCredits += 21;
	player.game.defer(new PlayProjectCard(player));
    return undefined;
  }
}
