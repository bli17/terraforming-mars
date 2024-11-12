import {CorporationCard} from '../corporation/CorporationCard';
import {Tag} from '../../../common/cards/Tag';
import {IPlayer} from '../../IPlayer';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {CardResource} from '../../../common/CardResource';
import {IActionCard} from '../ICard';
import {Size} from '../../../common/cards/render/Size';

export class KuiperCooperative extends CorporationCard implements IActionCard {
  constructor() {
    super({
      name: CardName.KUIPER_COOPERATIVE,
      tags: [Tag.SPACE, Tag.SPACE],
      startingMegaCredits: 38,
      resourceType: CardResource.ASTEROID,

      behavior: {
        production: {titanium: 1},
      },

      metadata: {
        cardNumber: 'XC01', // Rename
        description: 'You start with 38 M€ (buff: +5). Increase titanium production 1 step.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(38).production((pb) => pb.titanium(1)).br;
		  //b.text('You start with 38 M€ (buff: +5). Increase titanium production 1 step.', Size.TINY, false, false);
		  b.action('Add 1 asteroid here for every space tag you have.', (ab) => {
            ab.empty().startAction.resource(CardResource.ASTEROID).slash().tag(Tag.SPACE);
          }).br;
          b.effect('When you use the AQUIFER or ASTEROID standard projects, you can spend asteroids on card as 1M€ each.', (eb) => {
            eb.plate('Standard Project', {size: Size.SMALL}).asterix().startEffect.resource(CardResource.ASTEROID).equals().megacredits(1);
          });
        }),
      },
    });
  }

  public action(player: IPlayer) {
    player.addResourceTo(this, {qty: player.tags.count(Tag.SPACE), log: true});
    return undefined;
  }

  public canAct(): boolean {
    return true;
  }
}
