import {IProjectCard} from '../IProjectCard';
import {IActionCard} from '../ICard';
import {Card} from '../Card';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {CardResource} from '../../../common/CardResource';
import {Tag} from '../../../common/cards/Tag';
import {IPlayer} from '../../IPlayer';
import {SelectCard} from '../../inputs/SelectCard';
import {SelectOption} from '../../inputs/SelectOption';
import {OrOptions} from '../../inputs/OrOptions';
import {LogHelper} from '../../LogHelper';
import {PlaceOceanTile} from '../../deferredActions/PlaceOceanTile';
import {CardRenderer} from '../render/CardRenderer';
import {SelectPaymentDeferred} from '../../deferredActions/SelectPaymentDeferred';

export class CometAiming extends Card implements IActionCard, IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.COMET_AIMING,
      tags: [Tag.SPACE],
      cost: 17,
      resourceType: CardResource.ASTEROID,

      metadata: {
        cardNumber: 'X16',
        renderData: CardRenderer.builder((b) => {
          b.action('Spend 1 M€ (buff: from 1 titanium) to add 1 asteroid resource to ANY CARD.', (eb) => {
            eb.megacredits(1).startAction.resource(CardResource.ASTEROID).asterix();
          }).br;
          b.or().br;
          b.action('Remove 1 asteroid here to place an ocean.', (eb) => {
            eb.resource(CardResource.ASTEROID).startAction.oceans(1);
          });
        }),
      },
    });
  }

  private canAffordOcean(player: IPlayer) {
    return player.canAfford({cost: 0, tr: {oceans: 1}});
  }

  public canAct(player: IPlayer): boolean {
    if (player.canAfford(1)) {
      return true;
    }
    if (this.resourceCount > 0 && this.canAffordOcean(player)) {
      return true;
    }
    return false;
  }

  public action(player: IPlayer) {
    const asteroidCards = player.getResourceCards(CardResource.ASTEROID);

    const addAsteroidToSelf = function() {
      player.game.defer(new SelectPaymentDeferred(player, 1, {title: 'Select how to pay for asteroid'}));
      player.addResourceTo(asteroidCards[0], {log: true});
      return undefined;
    };

    const addAsteroidToCard = new SelectCard(
      'Select card to add 1 asteroid',
      'Add asteroid',
      asteroidCards)
      .andThen(([card]) => {
        player.game.defer(new SelectPaymentDeferred(player, 1, {title: 'Select how to pay for asteroid'}));
        player.addResourceTo(card, {log: true});
        return undefined;
      });

    const spendAsteroidResource = () => {
      this.resourceCount--;
      LogHelper.logRemoveResource(player, this, 1, 'place an ocean');
      player.game.defer(new PlaceOceanTile(player));
      return undefined;
    };

    if (this.resourceCount === 0) {
      return asteroidCards.length === 1 ? addAsteroidToSelf() : addAsteroidToCard;
    }

    if (!player.canAfford(1)) return spendAsteroidResource();

    const availableActions = [];

    if (this.canAffordOcean(player)) {
      const placeOceanOption = new SelectOption('Remove an asteroid resource to place an ocean', 'Remove asteroid').andThen(spendAsteroidResource);
      if (!player.game.canAddOcean()) {
        placeOceanOption.warnings = ['maxoceans'];
      }
      availableActions.push(placeOceanOption);
    }

    if (asteroidCards.length === 1) {
      availableActions.push(new SelectOption('Spend 1 M€ to gain 1 asteroid resource', 'Spend 1 M€').andThen(addAsteroidToSelf));
    } else {
      availableActions.push(addAsteroidToCard);
    }

    if (availableActions.length === 1) {
      const action = availableActions[0];

      if (action instanceof SelectOption) return action.cb(undefined);
      return availableActions[0]; // SelectCard
    }

    return new OrOptions(...availableActions);
  }
}
