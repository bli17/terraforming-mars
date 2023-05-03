import {expect} from 'chai';
import {testGame} from '../../TestGame';
import {Birds} from '../../../src/server/cards/base/Birds';
import {EarthOffice} from '../../../src/server/cards/base/EarthOffice';
import {LunaGovernor} from '../../../src/server/cards/colonies/LunaGovernor';
import {TestPlayer} from '../../TestPlayer';

describe('EarthOffice', function() {
  let card: EarthOffice;
  let player: TestPlayer;

  beforeEach(function() {
    card = new EarthOffice();
    [/* skipped */, player] = testGame(2);

    const action = card.play(player);
    expect(action).is.undefined;
  });

  it('Should play', function() {
    expect(card.getCardDiscount(player, card)).to.eq(3);
    expect(card.getCardDiscount(player, new Birds())).to.eq(0);
  });

  it('Discounts Luna Governor correctly', function() {
    expect(card.getCardDiscount(player, new LunaGovernor())).to.eq(6);
  });
});

