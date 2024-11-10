import {IPlayer} from '../../IPlayer';
import {PreludeCard} from '../prelude/PreludeCard';
import {CardName} from '../../../common/cards/CardName';
import {Size} from '../../../common/cards/render/Size';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';
import {PreludesExpansion} from '../../preludes/PreludesExpansion';

export class NewPartner extends PreludeCard {
  constructor() {
    super({
      name: CardName.NEW_PARTNER,
	  tags: [Tag.WILD],
      startingMegacredits: -8,
      
      metadata: {
        cardNumber: 'X42',
		description: '(Buff:) After being played, when you perform an action, the wild tag counts as any tag of your choice. (Nerf:) Pay 8 M€, no longer increases M€ production by 1.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(-8).nbsp.prelude().asterix();
		  b.br.br;
		  b.text('Immediately draw 3 (buff: +1) prelude cards. Play 1 of them, and discard the other.', Size.SMALL, true);
		  }),
      },
    });
  }

  public override bespokeCanPlay(player: IPlayer) {
    const game = player.game;
    if (!game.preludeDeck.canDraw(3)) {
      this.warnings.add('deckTooSmall');
    }
    return true;
  }

  public override bespokePlay(player: IPlayer) {
    const game = player.game;
    const cards = game.preludeDeck.drawN(game, 3);
    return PreludesExpansion.selectPreludeToPlay(player, cards);
  }
}
