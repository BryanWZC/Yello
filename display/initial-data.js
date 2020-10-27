const initialData  = {
        item: {},
        columns: {},
        columnOrder: [],
};

export default initialData;

/**
 * Example intialData:
 * initalData = {
 * item: {
 *    'task- 1': {id: 'task-1', content: 'testing' },
 * },
 * columns: {
 *     'column-1':{
 *          id: 'column-1',
 *          title: 'to-do',
 *          itemIds: ['task-1'],
 *      },
 * },
 * columnOrder: ['column-1'],
 * }
 */