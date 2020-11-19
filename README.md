# NetV.js + D3.js Radial Tree

![](./netv-radial.png)

### Usage

```js
tree = radialLayout(graph, rootId, configs)
netv.data(tree)
```

* graph: basic json-like graph, like NetV's build-in dataset
* rootId: centered rootNode's ID 
* configs: { directed: bool, radius: number, centerX: number, centerY: number }
    * directed: process as directed or not
    * radius: max radius of radial tree
    * centerX, centerY: position of center node

open `index.html` for demo