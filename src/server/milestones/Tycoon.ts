import {BaseMilestone} from './IMilestone';
import {Player} from '../Player';
import {CardType} from '../../common/cards/CardType';

export class Tycoon extends BaseMilestone {
  constructor() {
    super(
      'Tycoon',
      'Requires that you have 10 (buffed: -5) project cards in play (blue and green cards)',
      10);
  }
  public getScore(player: Player): number {
    return player.playedCards
      .filter((card) => card.type === CardType.ACTIVE || card.type === CardType.AUTOMATED).length;
  }
}
