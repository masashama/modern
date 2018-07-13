/**
 * Mock Category
 *
 * atention: _children extra filed only for mock
 */
export const categoryMock = [
  {
    id: 1,
    name: 'Computers',
    parent: null,
    _children: [
      {
        id: 6,
        name: 'Periphery',
        parent: 1,
      },
      {
        id: 7,
        name: 'Servers',
        parent: 1,
      }
    ]
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
    _children: [
      {
        id: 8,
        name: 'Shooter',
        parent: 4,
        _children: [
          {
            id: 10,
            name: 'FPS',
            parent: 1,
          },
          {
            id: 11,
            name: 'TPS',
            parent: 1,
          }
        ]
      },
      {
        id: 9,
        name: 'RGP',
        parent: 1,
      }
    ]
  },
];

export const productMock = [];
