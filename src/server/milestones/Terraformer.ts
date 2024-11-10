import {IMilestone} from './IMilestone';
import {IPlayer} from '../IPlayer';
import {Turmoil} from '../turmoil/Turmoil';

export class Terraformer implements IMilestone {
  public readonly name = 'Terraformer';
  private terraformRating: number = 32;
  private terraformRatingTurmoil: number = 26;
  public readonly description;
  constructor() {
    this.description = 'Having a terraform rating of at least ' +
                            this.terraformRating + ' (buffed: -3) or ' +
                            this.terraformRatingTurmoil + ' with Turmoil.';
  }
  public getScore(player: IPlayer): number {
    return player.getTerraformRating();
  }
  public canClaim(player: IPlayer): boolean {
    const target = Turmoil.ifTurmoilElse(player.game, () => this.terraformRatingTurmoil, () => this.terraformRating);
    const score = this.getScore(player);
    return score >= target;
  }
}
