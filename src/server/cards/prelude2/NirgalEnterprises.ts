import {CorporationCard} from '../corporation/CorporationCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';
import {Size} from '../../../common/cards/render/Size';

export class NirgalEnterprises extends CorporationCard {
  constructor() {
    super({
      name: CardName.NIRGAL_ENTERPRISES,
      tags: [Tag.POWER, Tag.PLANT, Tag.BUILDING],
      startingMegaCredits: 30,

      behavior: {
        production: {energy: 1, plants: 1, steel: 1},
      },

      metadata: {
        cardNumber: 'PC01', // Renumber
        //description: 'You start with 30 M€. Increase your energy, plant, and steel production 1 step each.',
        renderData: CardRenderer.builder((b) => {
          b.br.br.br.br;
          b.megacredits(30).production((pb) => pb.energy(1).plants(1).steel(1)).br;
          b.text('(You start with 41 M€ (buff: +5). Gain 5 titanium.)', Size.TINY, false, false);
		  b.corpBox('effect', (ce) => {
            ce.effect('AWARDS AND MILESTONES ALWAYS COST 0 M€ FOR YOU.', (eb) => {
              // TODO(kberg): replace with award().slash.milestone() when award and milestone can be stacked.
              eb.plate('Awards and Milestones').startEffect.megacredits(1, {text: '0'});
            });
		  });
        }),
      },
    });
  }
}
