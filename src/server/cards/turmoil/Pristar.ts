import {ICorporationCard} from '../corporation/ICorporationCard';
import {Player} from '../../Player';
import {CardResource} from '../../../common/CardResource';
import {CardName} from '../../../common/cards/CardName';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Size} from '../../../common/cards/render/Size';

export class Pristar extends Card implements ICorporationCard {
  constructor() {
    super({
      name: CardName.PRISTAR,
      startingMegaCredits: 63,
      resourceType: CardResource.PRESERVATION,
      type: CardType.CORPORATION,

      victoryPoints: {resourcesHere: {}},

      metadata: {
        cardNumber: 'R07',
        description: 'You start with 63 (buff: +10) M€. Decrease your TR 2 steps. 1 VP per preservation resource here.',

        renderData: CardRenderer.builder((b) => {
          b.br.br.br;
          b.megacredits(63).nbsp.nbsp.minus().tr(2, {size: Size.SMALL});
          b.corpBox('effect', (ce) => {
            ce.effect('During production phase, if you did not get TR so far this generation, add one preservation resource here and gain 6 M€.', (eb) => {
              eb.tr(1, {size: Size.SMALL, cancelled: true}).startEffect.preservation(1).megacredits(6);
            });
          });
        }),
      },
    });
  }

  public override bespokePlay(player: Player) {
    player.decreaseTerraformRatingSteps(2);
    return undefined;
  }

  public onProductionPhase(player: Player) {
    if (!(player.hasIncreasedTerraformRatingThisGeneration)) {
      player.megaCredits += 6;
      player.addResourceTo(this, 1);
    }
    return undefined;
  }
}
