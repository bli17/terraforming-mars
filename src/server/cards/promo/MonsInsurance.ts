import {CorporationCard} from '../corporation/CorporationCard';
import {IPlayer} from '../../IPlayer';
import {CardName} from '../../../common/cards/CardName';
import {Resource} from '../../../common/Resource';
import {CardRenderer} from '../render/CardRenderer';
import {Size} from '../../../common/cards/render/Size';
import {all} from '../Options';
import {CardRenderDynamicVictoryPoints} from '../render/CardRenderDynamicVictoryPoints';

export class MonsInsurance extends CorporationCard {
  constructor() {
    super({
      name: CardName.MONS_INSURANCE,
      startingMegaCredits: 43,
      victoryPoints: 'special',

      metadata: {
        cardNumber: 'R46',
        description: 'You start with 43 M€ (nerf: -5). FOR EACH OPPONENT, (change:) INCREASE YOUR M€ production 2 STEPS AND DECREASE THEIR M€ production 2 STEPS. (buff:) 1 VP per card with a NEGATIVE VP Icon you have.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(43).nbsp.nbsp.production((pb) => {
            pb.megacredits(2).asterix().nbsp.megacredits(-2, {all}).asterix();
          });
          b.corpBox('effect', (cb) => {
            cb.vSpace(Size.SMALL);
            cb.effect('When a player causes another to lose production or resources, pay 3M€ to the victim or as much as possible. (Does not apply to your decrease of opponent\'s starting M€ production.)', (eb) => {
              eb.production((pb) => pb.minus().wild(1, {all})).slash().wild(1, {all});
              eb.startEffect.text('pay', Size.SMALL, true).megacredits(3);
            });
          });
        }),
        victoryPoints: CardRenderDynamicVictoryPoints.vpIcon(1),
      },
    });
  }

  public override bespokePlay(player: IPlayer) {
    let opponentCount = 0;
    for (const p of player.getOpponents()) {
      p.production.add(Resource.MEGACREDITS, -2, {log: true});
      opponentCount += 1;
      }
    
    // Neutral opponent for solo mode
    if (player.game.isSoloMode()) {
      opponentCount = 1;
    }
    
	player.production.add(Resource.MEGACREDITS, 2 * opponentCount, {log: true});
    player.game.monsInsuranceOwner = player.id;
    return undefined;
  }

  // When `insured` is undefined, it's the neutral player.
  public payDebt(player: IPlayer, claimant : IPlayer | undefined) {
    if (player !== claimant) {
      const retribution = Math.min(player.megaCredits, 3);
      if (claimant) claimant.megaCredits += retribution;
      player.stock.deduct(Resource.MEGACREDITS, retribution);
      if (retribution > 0) {
        if (claimant !== undefined) {
          player.game.log('${0} received ${1} M€ from ${2} owner (${3})', (b) =>
            b.player(claimant)
              .number(retribution)
              .cardName(CardName.MONS_INSURANCE)
              .player(player));
        } else {
          player.game.log('Neutral player received ${0} M€ from ${1} owner (${2})', (b) =>
            b.number(retribution)
              .cardName(CardName.MONS_INSURANCE)
              .player(player));
        }
      }
    }
  }
  public override getVictoryPoints(player: IPlayer): number {
	let vp_array = player.playedCards.map((card) => card.metadata.victoryPoints)
	                                 .filter((vp) => typeof(vp) === 'number') as number[];
	let points = vp_array.filter((vp) => vp < 0).length;
    return points;
  }
}
