import {Card} from '../Card';
import {ICorporationCard} from './ICorporationCard';
import {Tag} from '../../../common/cards/Tag';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Size} from '../../../common/cards/render/Size';

export class Inventrix extends Card implements ICorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.INVENTRIX,
      tags: [Tag.SCIENCE, Tag.WILD],
      startingMegaCredits: 45,

      firstAction: {
        text: 'Draw 2 cards',
        drawCard: 2,
      },

      metadata: {
        cardNumber: 'R43',
        description: 'As your first action in the game, draw 2 (nerf: -1) cards. Start with 45 M€. (buff:) When you perform an action, the Wild tag counts as any tag of your choice.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(45).nbsp.cards(2);
          b.corpBox('effect', (ce) => {
            ce.vSpace(Size.SMALL);
			ce.effect('Your temperature, oxygen, ocean, and Venus requirements are +4 or -4 steps, your choice in each case.', (eb) => {
              eb.plate('Global requirements').startEffect.text('+/- 4');
            });
          });
        }),
      },
    });
  }
  public getRequirementBonus(): number {
    return 4;
  }
}

