let groupId = 0;

export default {
  _init() {
    const _this = this;
    const Sortable = this.api.imports.Sortable;

    const elem = this.api.layoutElement;
    const containerElem = elem.querySelector('.multi-list-container');
    const componentGroupId = `group${++groupId}`;

    this.updateLists = () => {
      const data = this.api.inputState.get('data');
      const groups = data.get('groups').export();
      const items = data.get('items').export();
      const buckets = bucketize(groups, items);

      let bucketsHtml = '';
      Object.keys(buckets).sort((a, b) => {
        const bucketA = buckets[a];
        const bucketB = buckets[b];
        if (bucketA.order < bucketB.order) return -1;
        if (bucketA.order > bucketB.order) return 1;
        return 0;
      }).forEach(bucketName => {
        bucketsHtml += generateBucketHtml(buckets[bucketName]);
      });
      containerElem.innerHTML = bucketsHtml;

      // iterrate over each html element to generate the Sortable
      containerElem.querySelectorAll('.bucket-items').forEach(itemsElement => {
        Sortable.create(itemsElement, {
          group: {
            name: componentGroupId,
            pull: function (to, from) {
              return true;
            },
            put: function (to) {
              if (itemsElement.dataset.limitto === "one") {
                return to.el.children.length < 2;
              }
              return true;
            }
          },
          animation: 150,
          onAdd: onAddHandler,
          onMove: onMoveHandler
        });
      });
    };

    this.updateLists();

    function bucketize(groups, items) {
      const buckets = {};
      groups.forEach(group => {
        if (!buckets[group.projectedId]) {
          buckets[group.projectedId] = {
            name: group.name,
            projectedId: group.projectedId,
            order: group.order,
            items: [],
            limitTo: group.onAdd.limitTo,
            required: group.required
          };
        }
      });
      items.forEach(item => {
        if (!buckets[item.group]) {
          _this.api.error(`No group with id ${item.group}`);
          return;
        }
        buckets[item.group].items.push(item);
      });

      // Sort items in each bucket
      for (var key in buckets) {
        if (buckets.hasOwnProperty(key)) {
          buckets[key].items.sort(function (a, b) { return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0); });
        }
      }
      return buckets;
    }

    // takes into account the required and limitTo properties on bucket
    function generateBucketHtml(bucket) {
      let html = `
        <div class='bucket' data-limitTo='${bucket.limitTo}' data-name='${bucket.name}' data-id='${bucket.projectedId}'>
          <div class='bucket-header'>
            ${bucket.name} <span id="astrix">${(bucket.required) ? '*' : ''}</span>
          </div>
          <div class='bucket-items' data-limitTo='${bucket.limitTo}' data-name='${bucket.name}' data-id='${bucket.projectedId}'>
      `;

      bucket.items.forEach(item => {
        html += `
            <div class='item' data-name='${item.name}' data-id='${item.projectedId}'>
              ${item.name}
            </div>
          `;
      });

      html += `
          </div>
        </div>
      `;
      return html;
    }

    function onAddHandler(evt) {
      _this.output('onAdd', {
        from: getGroupWithProjectedId(evt.from.getAttribute('data-id')).onAdd,
        to: getGroupWithProjectedId(evt.to.getAttribute('data-id')).onAdd,
        item: getItemWithProjectedId(evt.item.getAttribute('data-id')).onAdd
      });
    }
    function onMoveHandler(evt) {
      if (evt.to.dataset.limitto !== null && evt.to.children.length > --evt.to.dataset.limitto) {
        _this.output('onMove', {
          from: null,
          to: null,
          item: null
        });
        return false;
      } else {
        _this.output('onMove', {
          from: getGroupWithProjectedId(evt.from.getAttribute('data-id')).onAdd,
          to: getGroupWithProjectedId(evt.to.getAttribute('data-id')).onAdd,
          item: getItemWithProjectedId(evt.dragged.getAttribute('data-id')).onMove
        });
      }
    }
    function getItemWithProjectedId(projectedId) {
      return _this.api.inputState
        .get(['data', 'items'])
        .retrieveOnKey(projectedId).export();
    }
    function getGroupWithProjectedId(projectedId) {
      return _this.api.inputState
        .get(['data', 'groups'])
        .retrieveOnKey(projectedId).export();
    }
  },
  _close() {
  },
  data() {
    this.updateLists();
  }
};











// let groupId = 0;

// export default {
//   _init() {
//     const _this = this;
//     const Sortable = this.api.imports.Sortable;

//     const elem = this.api.layoutElement; // grabs DOM
//     const containerElem = elem.querySelector('.multi-list-container'); // the whole list
//     const componentGroupId = `group${++groupId}`;  //this is always group1...

//     this.updateLists = () => {
//       const data = this.api.inputState.get('data');  //data input
//       const groups = data.get('groups').export(); // groups
//       const items = data.get('items').export();  // items
//       const buckets = bucketize(groups, items);

//       let bucketsHtml = '';
//       Object.keys(buckets).sort((a, b) => {
//         const bucketA = buckets[a];
//         const bucketB = buckets[b];
//         if (bucketA.order < bucketB.order) return -1;
//         if (bucketA.order > bucketB.order) return 1;
//         return 0;
//       }).forEach(bucketName => {
//         bucketsHtml += generateBucketHtml(buckets[bucketName]);
//       });
//       containerElem.innerHTML = bucketsHtml; // this grabs the elements of the whole component

//       containerElem.querySelectorAll('.bucket-items').forEach(itemsElement => { //creates a group for each element with the same name
//         console.log('items element ', itemsElement);
//         console.log('group id ', componentGroupId);
//         Sortable.create(itemsElement, {
//           group: {
//             name: componentGroupId,
//             pull: function (to, from) {
//               console.log('pull to ', to);
//               console.log('pull from ', from);
//               return true;
//             },
//             put: function (to) {
//               console.log('put function called ', to);
//               console.log('limitTo ', itemsElement.dataset.limitTo);
//               console.log('children ', itemsElement.children.length);
//               if (itemsElement.dataset.limitTo === "one") {
//                 return to.el.children.length < 2;
//               }
//               return true;
//             }
//           },
//           animation: 150,
//           onAdd: onAddHandler,
//           onMove: onMoveHandler
//         });
//       });
//     };

//     this.updateLists();

//     function bucketize(groups, items) {
//       const buckets = {};
//       console.log('groups at start of bucket ', groups);
//       // console.log('items at start of bucket ', items);
//       groups.forEach(group => {
//         if (!buckets[group.projectedId]) {
//           buckets[group.projectedId] = {
//             name: group.name,
//             projectedId: group.projectedId,
//             order: group.order,
//             items: [],
//             limitTo: group.limitTo,
//             required: group.required
//           };
//         }
//       });
//       items.forEach(item => {
//         if (!buckets[item.group]) {
//           _this.api.error(`No group with id ${item.group}`);
//           return;
//         }
//         buckets[item.group].items.push(item);
//       });

//       // Sort items in each bucket
//       for (var key in buckets) {
//         if (buckets.hasOwnProperty(key)) {
//           buckets[key].items.sort(function (a, b) { return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0); });
//         }
//       }
//       // console.log('buckets ', buckets);
//       return buckets;
//     }

//     // takes into account required and limitTo properties on bucket
//     function generateBucketHtml(bucket) {
//       let html = `
//         <div class='bucket' data-limitTo='${bucket.limitTo}' data-name='${bucket.name}' data-id='${bucket.projectedId}'>
//           <div class='bucket-header'>
//             ${bucket.name} <span id="astrix">${(bucket.required) ? '*' : ''}</span>
//           </div>
//           <div class='bucket-items' data-name='${bucket.name}' data-id='${bucket.projectedId}'>
//       `;

//       bucket.items.forEach(item => {
//         html += `
//             <div class='item' data-name='${item.name}' data-id='${item.projectedId}'>
//               ${item.name}
//             </div>
//           `;
//       });

//       html += `
//           </div>
//         </div>
//       `;
//       return html;
//     }

//     function onAddHandler(evt) {
//       _this.output('onAdd', {
//         from: getGroupWithProjectedId(evt.from.getAttribute('data-id')).onAdd,
//         to: getGroupWithProjectedId(evt.to.getAttribute('data-id')).onAdd,
//         item: getItemWithProjectedId(evt.item.getAttribute('data-id')).onAdd
//       });
//     }
//     function onMoveHandler(evt) {
//       _this.output('onMove', {
//         from: getGroupWithProjectedId(evt.from.getAttribute('data-id')).onAdd,
//         to: getGroupWithProjectedId(evt.to.getAttribute('data-id')).onAdd,
//         item: getItemWithProjectedId(evt.dragged.getAttribute('data-id')).onMove
//       });
//     }
//     function getItemWithProjectedId(projectedId) {
//       return _this.api.inputState
//         .get(['data', 'items'])
//         .retrieveOnKey(projectedId).export();
//     }
//     function getGroupWithProjectedId(projectedId) {
//       return _this.api.inputState
//         .get(['data', 'groups'])
//         .retrieveOnKey(projectedId).export();
//     }
//   },
//   _close() {
//   },
//   data() {
//     this.updateLists();
//   }
// };











// let groupId = 0;

// export default {
//   _init() {
//     const _this = this;
//     const Sortable = this.api.imports.Sortable;

//     const elem = this.api.layoutElement;
//     const containerElem = elem.querySelector('.multi-list-container');
//     const componentGroupId = `group${++groupId}`;

//     this.updateLists = () => {
//       const data = this.api.inputState.get('data');
//       const groups = data.get('groups').export();
//       const items = data.get('items').export();
//       const buckets = bucketize(groups, items);

//       let bucketsHtml = '';
//       Object.keys(buckets).sort((a, b) => {
//         const bucketA = buckets[a];
//         const bucketB = buckets[b];
//         if (bucketA.order < bucketB.order) return -1;
//         if (bucketA.order > bucketB.order) return 1;
//         return 0;
//       }).forEach(bucketName => {
//         bucketsHtml += generateBucketHtml(buckets[bucketName]);
//       });
//       containerElem.innerHTML = bucketsHtml;

//       containerElem.querySelectorAll('.bucket-items').forEach(itemsElement => {
//         console.log('items element ', itemsElement);
//         console.log('group id ', componentGroupId);
//         Sortable.create(itemsElement, {
//           group: {
//             name: componentGroupId,
//             put: function (to) {
//               console.log('put function called ');
//               console.log('limitTo ', itemsElement.dataset.limitTo);
//               console.log('children ', itemsElement.children.length);
//               if (itemsElement.dataset.limitTo === "one") {
//                 return itemsElement.children.length < 2;
//               }
//               return true;
//             }
//           },
//           animation: 150,
//           onAdd: onAddHandler,
//           onMove: onMoveHandler
//         });
//       });
//     };

//     this.updateLists();

//     function bucketize(groups, items) {
//       const buckets = {};
//       // console.log('groups at start of bucket ', groups);
//       // console.log('items at start of bucket ', items);
//       groups.forEach(group => {
//         if (!buckets[group.projectedId]) {
//           buckets[group.projectedId] = {
//             name: group.name,
//             projectedId: group.projectedId,
//             order: group.order,
//             items: [],
//             required: group.required
//           };
//         }
//       });
//       items.forEach(item => {
//         if (!buckets[item.group]) {
//           _this.api.error(`No group with id ${item.group}`);
//           return;
//         }
//         buckets[item.group].items.push(item);
//       });

//       // Sort items in each bucket
//       for (var key in buckets) {
//         if (buckets.hasOwnProperty(key)) {
//           buckets[key].items.sort(function (a, b) { return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0); });
//         }
//       }
//       // console.log('buckets ', buckets);
//       return buckets;
//     }

//     // takes into account required and limitTo properties on bucket
//     function generateBucketHtml(bucket) {
//       let html = `
//         <div class='bucket' data-limitTo='${bucket.limitTo}' data-name='${bucket.name}' data-id='${bucket.projectedId}'>
//           <div class='bucket-header'>
//             ${bucket.name} <span id="astrix">${(bucket.required) ? '*' : ''}</span>
//           </div>
//           <div class='bucket-items' data-name='${bucket.name}' data-id='${bucket.projectedId}'>
//       `;

//       bucket.items.forEach(item => {
//         html += `
//             <div class='item' data-name='${item.name}' data-id='${item.projectedId}'>
//               ${item.name}
//             </div>
//           `;
//       });

//       html += `
//           </div>
//         </div>
//       `;
//       return html;
//     }

//     function onAddHandler(evt) {
//       _this.output('onAdd', {
//         from: getGroupWithProjectedId(evt.from.getAttribute('data-id')).onAdd,
//         to: getGroupWithProjectedId(evt.to.getAttribute('data-id')).onAdd,
//         item: getItemWithProjectedId(evt.item.getAttribute('data-id')).onAdd
//       });
//     }
//     function onMoveHandler(evt) {
//       _this.output('onMove', {
//         from: getGroupWithProjectedId(evt.from.getAttribute('data-id')).onAdd,
//         to: getGroupWithProjectedId(evt.to.getAttribute('data-id')).onAdd,
//         item: getItemWithProjectedId(evt.dragged.getAttribute('data-id')).onMove
//       });
//     }
//     function getItemWithProjectedId(projectedId) {
//       return _this.api.inputState
//         .get(['data', 'items'])
//         .retrieveOnKey(projectedId).export();
//     }
//     function getGroupWithProjectedId(projectedId) {
//       return _this.api.inputState
//         .get(['data', 'groups'])
//         .retrieveOnKey(projectedId).export();
//     }
//   },
//   _close() {
//   },
//   data() {
//     this.updateLists();
//   }
// };