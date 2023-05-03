import {IProjectCard} from '../IProjectCard';
import {IActionCard} from '../ICard';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardResource} from '../../../common/CardResource';
import {Tag} from '../../../common/cards/Tag';
import {Player} from '../../Player';
import {Resources} from '../../../common/Resources';
import {SelectCard} from '../../inputs/SelectCard';
import {CardRenderer} from '../render/CardRenderer';

export class AsteroidHollowing extends ActionCard implements IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.ASTEROID_HOLLOWING,
      tags: [Tag.SPACE],
      cost: 16,
      resourceType: CardResource.ASTEROID,

      victoryPoints: {resourcesHere: {}, per: 2},

      metadata: {
        cardNumber: 'X15',
        renderData: CardRenderer.builder((b) => {
          b.action('Spend 1 titanium to add 1 asteroid resource to ANY card (buff: from "here") and increase M€ production 1 step.', (eb) => {
            eb.titanium(1).startAction.asteroids(1).asterix().production((pb) => pb.megacredits(1));
          }).br;
          b.vpText('1VP for each 2 asteroids on this card.');
        }),
      },
    });
  }

  public canAct(player: Player): boolean {
    return player.titanium > 0;
  }

  public action(player: Player) {
    const asteroidCards = player.getResourceCards(CardResource.ASTEROID);
	
	const addAsteroidToSelf = function() {
	  player.deductResource(Resources.TITANIUM, 1);
      player.production.add(Resources.MEGACREDITS, 1);
      player.addResourceTo(asteroidCards[0], {log: true});
	  return undefined;
    };
	
	const addAsteroidToCard = new SelectCard(
      'Select card to add 1 asteroid',
      'Add asteroid',
      asteroidCards,
      ([card]) => {
        player.deductResource(Resources.TITANIUM, 1);
		player.production.add(Resources.MEGACREDITS, 1);
        player.addResourceTo(card, {log: true});
        return undefined;
      },
    );
	
	if (asteroidCards.length === 1) return addAsteroidToSelf();
    return addAsteroidToCard;
  }
}
