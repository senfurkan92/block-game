import BlockModel from '@/models/block';

export default {
  state() {
    return {
      level1: [
        [
          new BlockModel(true, true, 5),
          new BlockModel(true, true, 4),
          new BlockModel(true, true, 5),
          new BlockModel(true, true, 4),
          new BlockModel(true, true, 5),
          new BlockModel(true, true, 4),
          new BlockModel(true, true, 5),
          new BlockModel(true, true, 4),
          new BlockModel(true, true, 5),
          new BlockModel(true, true, 4),
          new BlockModel(true, true, 5),
          new BlockModel(true, true, 4),
          new BlockModel(true, true, 4),
          new BlockModel(true, true, 5),
          new BlockModel(true, true, 4),
          new BlockModel(true, true, 4),
          new BlockModel(true, true, 5),
          new BlockModel(true, true, 4),
          new BlockModel(true, true, 4),
          new BlockModel(true, true, 5),
        ],
        [
          new BlockModel(true, true, 3),
          new BlockModel(true, true, 2),
          new BlockModel(true, true, 1),
          new BlockModel(true, true, 3),
          new BlockModel(true, true, 2),
          new BlockModel(true, true, 1),
          new BlockModel(true, true, 1),
          new BlockModel(true, true, 2),
          new BlockModel(true, true, 1),
          new BlockModel(true, true, 2),
          new BlockModel(true, true, 1),
          new BlockModel(true, true, 2),
          new BlockModel(true, true, 1),
          new BlockModel(true, true, 2),
          new BlockModel(true, true, 1),
          new BlockModel(true, true, 5),
          new BlockModel(true, true, 4),
          new BlockModel(true, true, 4),
          new BlockModel(true, true, 5),
          new BlockModel(true, true, 5),
        ],
      ],
      blocksBorders: [],
      ballBorders: {},
      stopperBorders: {},
      areaBorders: {},
    };
  },
  namespaced: true,
};
