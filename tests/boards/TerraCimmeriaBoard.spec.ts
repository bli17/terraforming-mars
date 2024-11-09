import {DEFAULT_GAME_OPTIONS} from '../../src/server/game/GameOptions';
import {expect} from 'chai';
import {TerraCimmeriaBoard} from '../../src/server/boards/TerraCimmeriaBoard';
import {SeededRandom} from '../../src/common/utils/Random';

describe('TerraCimmeriaBoard', function() {
  it('sanity test', function() {
    const board = TerraCimmeriaBoard.newInstance(DEFAULT_GAME_OPTIONS, new SeededRandom(0));
    expect(board.spaces).to.deep.eq([
      {'id': '01', 'spaceType': 'colony', 'x': -1, 'y': -1, 'bonus': []},
      {'id': '02', 'spaceType': 'colony', 'x': -1, 'y': -1, 'bonus': []},
      {'id': '03', 'spaceType': 'ocean', 'x': 4, 'y': 0, 'bonus': []},
      {'id': '04', 'spaceType': 'land', 'x': 5, 'y': 0, 'bonus': [2]},
      {'id': '05', 'spaceType': 'land', 'x': 6, 'y': 0, 'bonus': [1]},
      {'id': '06', 'spaceType': 'land', 'x': 7, 'y': 0, 'bonus': [2, 2]},
      {'id': '07', 'spaceType': 'ocean', 'x': 8, 'y': 0, 'bonus': [2, 2]},
      {'id': '08', 'spaceType': 'ocean', 'x': 3, 'y': 1, 'bonus': [0, 0]},
      {'id': '09', 'spaceType': 'land', 'x': 4, 'y': 1, 'bonus': []},
      {'id': '10', 'spaceType': 'land', 'x': 5, 'y': 1, 'bonus': []},
      {'id': '11', 'spaceType': 'land', 'x': 6, 'y': 1, 'bonus': [2]},
      {'id': '12', 'spaceType': 'land', 'x': 7, 'y': 1, 'bonus': [2, 1]},
      {'id': '13', 'spaceType': 'ocean', 'x': 8, 'y': 1, 'bonus': [2]},
      {'id': '14', 'spaceType': 'land', 'x': 2, 'y': 2, 'bonus': []},
      {'id': '15', 'spaceType': 'land', 'x': 3, 'y': 2, 'bonus': [2]},
      {'id': '16', 'spaceType': 'land', 'x': 4, 'y': 2, 'bonus': [9, 9, 9]},
      {'id': '17', 'spaceType': 'land', 'x': 5, 'y': 2, 'bonus': []},
      {'id': '18', 'spaceType': 'land', 'x': 6, 'y': 2, 'bonus': [2]},
      {'id': '19', 'spaceType': 'land', 'x': 7, 'y': 2, 'bonus': [2]},
      {'id': '20', 'spaceType': 'land', 'x': 8, 'y': 2, 'bonus': [2]},
      {'id': '21', 'spaceType': 'land', 'x': 1, 'y': 3, 'bonus': [1, 1]},
      {'id': '22', 'spaceType': 'land', 'x': 2, 'y': 3, 'bonus': [2, 2]},
      {'id': '23', 'spaceType': 'land', 'x': 3, 'y': 3, 'bonus': []},
      {'id': '24', 'spaceType': 'land', 'x': 4, 'y': 3, 'bonus': [9, 9]},
      {'id': '25', 'spaceType': 'land', 'x': 5, 'y': 3, 'bonus': []},
      {'id': '26', 'spaceType': 'land', 'x': 6, 'y': 3, 'bonus': []},
      {'id': '27', 'spaceType': 'land', 'x': 7, 'y': 3, 'bonus': [3]},
      {'id': '28', 'spaceType': 'land', 'x': 8, 'y': 3, 'bonus': []},
      {'id': '29', 'spaceType': 'land', 'x': 0, 'y': 4, 'bonus': []},
      {'id': '30', 'spaceType': 'land', 'x': 1, 'y': 4, 'bonus': [2, 9]},
      {'id': '31', 'spaceType': 'land', 'x': 2, 'y': 4, 'bonus': [9, 9]},
      {'id': '32', 'spaceType': 'land', 'x': 3, 'y': 4, 'bonus': [1]},
      {'id': '33', 'spaceType': 'land', 'x': 4, 'y': 4, 'bonus': [1]},
      {'id': '34', 'spaceType': 'land', 'x': 5, 'y': 4, 'bonus': [3]},
      {'id': '35', 'spaceType': 'land', 'x': 6, 'y': 4, 'bonus': []},
      {'id': '36', 'spaceType': 'land', 'x': 7, 'y': 4, 'bonus': [1]},
      {'id': '37', 'spaceType': 'ocean', 'x': 8, 'y': 4, 'bonus': [3]},
      {'id': '38', 'spaceType': 'land', 'x': 1, 'y': 5, 'bonus': [3, 3]},
      {'id': '39', 'spaceType': 'land', 'x': 2, 'y': 5, 'bonus': []},
      {'id': '40', 'spaceType': 'land', 'x': 3, 'y': 5, 'bonus': [0]},
      {'id': '41', 'spaceType': 'land', 'x': 4, 'y': 5, 'bonus': []},
      {'id': '42', 'spaceType': 'land', 'x': 5, 'y': 5, 'bonus': []},
      {'id': '43', 'spaceType': 'land', 'x': 6, 'y': 5, 'bonus': [1, 1]},
      {'id': '44', 'spaceType': 'land', 'x': 7, 'y': 5, 'bonus': []},
      {'id': '45', 'spaceType': 'land', 'x': 8, 'y': 5, 'bonus': [1, 1]},
      {'id': '46', 'spaceType': 'land', 'x': 2, 'y': 6, 'bonus': []},
      {'id': '47', 'spaceType': 'land', 'x': 3, 'y': 6, 'bonus': [0]},
      {'id': '48', 'spaceType': 'land', 'x': 4, 'y': 6, 'bonus': [2]},
      {'id': '49', 'spaceType': 'land', 'x': 5, 'y': 6, 'bonus': [2, 1, 1]},
      {'id': '50', 'spaceType': 'land', 'x': 6, 'y': 6, 'bonus': [2, 2]},
      {'id': '51', 'spaceType': 'land', 'x': 7, 'y': 6, 'bonus': [2]},
      {'id': '52', 'spaceType': 'ocean', 'x': 8, 'y': 6, 'bonus': [2, 2]},
      {'id': '53', 'spaceType': 'ocean', 'x': 3, 'y': 7, 'bonus': [1, 1]},
      {'id': '54', 'spaceType': 'land', 'x': 4, 'y': 7, 'bonus': [2]},
      {'id': '55', 'spaceType': 'land', 'x': 5, 'y': 7, 'bonus': [0]},
      {'id': '56', 'spaceType': 'land', 'x': 6, 'y': 7, 'bonus': [3]},
      {'id': '57', 'spaceType': 'land', 'x': 7, 'y': 7, 'bonus': [2]},
      {'id': '58', 'spaceType': 'ocean', 'x': 8, 'y': 7, 'bonus': [2]},
      {'id': '59', 'spaceType': 'ocean', 'x': 4, 'y': 8, 'bonus': [2, 2]},
      {'id': '60', 'spaceType': 'ocean', 'x': 5, 'y': 8, 'bonus': [2, 2]},
      {'id': '61', 'spaceType': 'ocean', 'x': 6, 'y': 8, 'bonus': [2, 2]},
      {'id': '62', 'spaceType': 'land', 'x': 7, 'y': 8, 'bonus': [2]},
      {'id': '63', 'spaceType': 'ocean', 'x': 8, 'y': 8, 'bonus': [2, 2]},
      {'id': '69', 'spaceType': 'colony', 'x': -1, 'y': -1, 'bonus': []},
    ]);
  });
});
