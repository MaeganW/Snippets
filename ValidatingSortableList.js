// edited component code
let groupId = 0;

export default {
  _init() {
    console.log('this worked');
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

      containerElem.querySelectorAll('.bucket-items').forEach(itemsElement => {
        Sortable.create(itemsElement, {
          group: componentGroupId,
          animation: 150,
          onAdd: onAddHandler,
          onMove: onMoveHandler
        });
      });
    };

    this.updateLists();

    function bucketize(groups, items) {
      const buckets = {};
      console.log('groups at start of bucket ', groups);
      console.log('items at start of bucket ', items);
      groups.forEach(group => {
        if (!buckets[group.projectedId]) {
          buckets[group.projectedId] = {
            name: group.name,
            projectedId: group.projectedId,
            order: group.order,
            items: [],
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
      console.log('buckets ', buckets);
      return buckets;
    }

    function generateBucketHtml(bucket) {
      let html = `
        <div class='bucket' data-name='${bucket.name}' data-id='${bucket.projectedId}'>
          <div class='bucket-header'>
            ${bucket.name} <span id="astrix">${(bucket.required) ? '*' : ''}</span>
          </div>
          <div class='bucket-items' data-name='${bucket.name}' data-id='${bucket.projectedId}'>
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
      _this.output('onMove', {
        from: getGroupWithProjectedId(evt.from.getAttribute('data-id')).onAdd,
        to: getGroupWithProjectedId(evt.to.getAttribute('data-id')).onAdd,
        item: getItemWithProjectedId(evt.dragged.getAttribute('data-id')).onMove
      });
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









// original component code
let groupId = 0;

export default {
  _init() {
    console.log('this worked');
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

      containerElem.querySelectorAll('.bucket-items').forEach(itemsElement => {
        Sortable.create(itemsElement, {
          group: componentGroupId,
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
            items: []
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

    function generateBucketHtml(bucket) {
      let html = `
        <div class='bucket' data-name='${bucket.name}' data-id='${bucket.projectedId}'>
          <div class='bucket-header'>
            ${bucket.name}
          </div>
          <div class='bucket-items' data-name='${bucket.name}' data-id='${bucket.projectedId}'>
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
      _this.output('onMove', {
        from: getGroupWithProjectedId(evt.from.getAttribute('data-id')).onAdd,
        to: getGroupWithProjectedId(evt.to.getAttribute('data-id')).onAdd,
        item: getItemWithProjectedId(evt.dragged.getAttribute('data-id')).onMove
      });
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
