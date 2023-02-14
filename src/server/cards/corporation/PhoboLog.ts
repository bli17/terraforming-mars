import {Card} from '../Card';
import {Tag} from '../../../common/cards/Tag';
import {ICorporationCard} from './ICorporationCard';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Size} from '../../../common/cards/render/Size';
import {digit} from '../Options';

export class PhoboLog extends Card implements ICorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.PHOBOLOG,
      tags: [Tag.SPACE],
      startingMegaCredits: 35,

      behavior: {
        stock: {titanium: 7},
        titanumValue: 1,
      },

      metadata: {
        cardNumber: 'R09',
        description: 'You start with 7 (nerf: -3) titanium and 35 (buff: +12) M€.',
        renderData: CardRenderer.builder((b) => {
          b.br.br;
          b.megacredits(35).nbsp.titanium(7, {digit});
          b.corpBox('effect', (ce) => {
            ce.effect('Your titanium resources are each worth 1 M€ extra.', (eb) => {
              eb.titanium(1).startEffect.plus(Size.SMALL).megacredits(1);
            });
          });
        }),
      },
    });
  }
}
