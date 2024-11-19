import {CorporationCard} from '../corporation/CorporationCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {CardType} from '../../../common/cards/CardType';
import {IPlayer} from '../../IPlayer';
import {ICard} from '../ICard';
import {Tag} from '../../../common/cards/Tag';
import {digit} from '../Options';
import {SelectCard} from '../../inputs/SelectCard';
import {CardResource} from '../../../common/CardResource';
import {ICorporationCard} from '../corporation/ICorporationCard';
import {Size} from '../../../common/cards/render/Size';

export class Spire extends CorporationCard implements ICorporationCard {
  constructor() {
    super({
      name: CardName.SPIRE,
      tags: [Tag.CITY, Tag.EARTH],
      startingMegaCredits: 50,
      initialActionText: 'Draw 4 cards, then discard 3 cards.',
      resourceType: CardResource.SCIENCE,

      metadata: {
        cardNumber: 'PC05', // ,
		//description: 'You start with 50 M€. As your first action, draw 4 cards, then discard 3 cards from your hand.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(50).plus().cards(4, {digit}).minus().cards(3, {digit}).br;
          b.text('(You start with 50 M€. As your first action, draw 4 cards, then discard 3 cards.)', Size.TINY, false, false);
		  b.corpBox('effect', (ce) => {
			ce.vSpace(Size.LARGE);
            ce.effect('When you play a card with at least 2 tags, add 1 science res. here.',
              (eb) => eb.emptyTag(2).asterix().startEffect.resource(CardResource.SCIENCE));
			ce.vSpace();
            ce.effect('When you use a standard project, resources here may be used as 2 M€ each.',
              (eb) => eb.plate('Standard Project', {size: Size.SMALL}).startEffect.resource(CardResource.SCIENCE).equals().megacredits(2));
          });
        }),
      },
    });
  }

  public initialAction(player: IPlayer) {
    player.drawCard(4);
    return new SelectCard('Select 3 cards to discard', 'Discard', player.cardsInHand, {min: 3, max: 3})
      .andThen((cards) => {
        for (const card of cards) {
          player.discardCardFromHand(card);
        }
        return undefined;
      });
  }

  public override bespokePlay(player: IPlayer) {
    // Including this.
    this.onCardPlayed(player, this);
    return undefined;
  }

  public onCardPlayed(player: IPlayer, card: ICard) {
    if (player.isCorporation(this.name)) {
      const count = card.tags.length + (card.type === CardType.EVENT ? 1 : 0);
      if (count >= 2) {
        player.addResourceTo(this, {qty: 1, log: true});
      }
    }
  }

  public onCorpCardPlayed(player: IPlayer, card: ICorporationCard) {
    this.onCardPlayed(player, card);
  }
}
