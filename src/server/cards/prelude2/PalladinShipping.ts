import {CorporationCard} from '../corporation/CorporationCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';
import {CardType} from '../../../common/cards/CardType';
import {digit} from '../Options';
import {IPlayer} from '../../IPlayer';
import {IProjectCard} from '../IProjectCard';
import {Resource} from '../../../common/Resource';
import {IActionCard} from '../ICard';
import {Behavior} from '../../behavior/Behavior';
import {getBehaviorExecutor} from '../../behavior/BehaviorExecutor';
import {Size} from '../../../common/cards/render/Size';

export class PalladinShipping extends CorporationCard implements IActionCard {
  constructor() {
    super({
      name: CardName.PALLADIN_SHIPPING,
      tags: [Tag.SPACE],
      startingMegaCredits: 41,

      behavior: {
        stock: {titanium: 5},
      },

      metadata: {
        cardNumber: 'PC02', // Renumber
        //description: 'You start with 41 M€ (buff: +5). Gain 5 titanium.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(41).titanium(5, {digit}).br;
		  b.text('You start with 41 M€ (buff: +5). Gain 5 titanium.', Size.TINY, false, false);
          b.corpBox('action', (ce) => {
			ce.vSpace(Size.LARGE);
		    ce.effect('When you play a space event, gain 1 titanium.', (eb) => {
              eb.tag(Tag.SPACE).tag(Tag.EVENT).startEffect.titanium(1);
            });
			ce.vSpace();
            ce.action('Spend 2 titanium to raise the temperature 1 step.', (ab) => {
              ab.titanium(2).startAction.temperature(1);
            });
          });
        }),
      },
    });
  }

  public onCardPlayed(player: IPlayer, card: IProjectCard) {
    if (player.isCorporation(this.name)) {
      if (card.type === CardType.EVENT && card.tags.includes(Tag.SPACE)) {
        player.stock.add(Resource.TITANIUM, 1, {log: true});
      }
    }
  }

  public canAct(player: IPlayer) {
    return getBehaviorExecutor().canExecute(PalladinShipping.actionBehavior, player, this);
  }

  private static actionBehavior: Behavior = {
    spend: {titanium: 2},
    global: {temperature: 1},
  };

  public action(player: IPlayer) {
    getBehaviorExecutor().execute(PalladinShipping.actionBehavior, player, this);
    return undefined;
  }
}
