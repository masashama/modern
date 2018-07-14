/**
 * Mock Category
 *
 */
export let categoryMock = [
  {
    id: 1,
    name: 'Computers',
    parent: null,
  },
  {
    id: 2,
    name: 'Home',
    parent: null,
  },
  {
    id: 3,
    name: 'Auto',
    parent: null,
  },
  {
    id: 4,
    name: 'Games',
    parent: null,
  },
  {
    id: 6,
    name: 'Periphery',
    parent: 1,
  },
  {
    id: 7,
    name: 'Servers',
    parent: 1,
  },
  {
    id: 8,
    name: 'Shooter',
    parent: 4,
  },
  {
    id: 9,
    name: 'RGP',
    parent: 4,
  },
  {
    id: 10,
    name: 'FPS',
    parent: 8,
  },
  {
    id: 11,
    name: 'TPS',
    parent: 8,
  }
];

export const productMock = [
  {
    id: 1,
    name: 'Mouse',
    cost: 1300.54,
    isFood: false,
    category: 1
  },
  {
    id: 2,
    name: 'Monitor',
    cost: 5765.00,
    isFood: false,
    category: 1
  }
];
