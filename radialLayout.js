function radialLayout(graph, rootId, configs) {
    const { directed = false, radius = 300, centerX = 400, centerY = 300 } = configs
    const tree = graphBFS(graph, rootId, directed)
    const links = getTreeLinks(tree)
    graph.links = links

    const hierachy = d3.hierarchy(tree)
        .sort((a, b) => d3.ascending(a.data.id, b.data.id))

    const d3tree = d3.tree()
        .size([2 * Math.PI, radius])
        .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth)
    d3tree(hierachy)
    console.log(hierachy)

    const nodeMap = {}
    for (const node of graph.nodes) {
        nodeMap[node.id] = node
    }

    // bfs hierachy
    const queue = [hierachy]

    while (queue.length > 0) {
        const curr = queue.shift()
        const degree = curr.x
        const radius = curr.y
        const x = centerX + radius * Math.cos(degree)
        const y = centerY + radius * Math.sin(degree)
        nodeMap[curr.data.id].x = x
        nodeMap[curr.data.id].y = y

        if (!curr.children) continue

        for (const child of curr.children) {
            queue.push(child)
        }
    }

    return graph
}

function getTreeLinks(tree) {
    const links = []
    const queue = [tree]

    while (queue.length > 0) {
        const curr = queue.shift()
        for (const child of curr.children) {
            links.push({ source: curr.id, target: child.id })
            queue.push(child)
        }
    }

    return links
}

function graphBFS(graph, rootId, directed = false) {
    // construct adjacient relation
    const adjNodes = {}
    for (const { source, target } of graph.links) {
        if (!(source in adjNodes)) {
            adjNodes[source] = new Set()
        }
        adjNodes[source].add(target)

        // consider undirected graph
        if (!directed) {
            if (!(target in adjNodes)) {
                adjNodes[target] = new Set()
            }
            adjNodes[target].add(source)

        }
    }

    const queue = []
    const tree = { id: rootId, depth: 0, parent: null, children: [] }
    queue.push(tree)

    const visited = new Set([rootId])
    while (queue.length > 0) {
        x = queue.shift()
        if (!adjNodes[x.id]) continue
        for (const yId of adjNodes[x.id]) {
            if (visited.has(yId)) continue
            const y = { id: yId, depth: x.depth + 1, parent: x, children: [] }
            x.children.push(y)
            queue.push(y)
            visited.add(yId)
        }
    }

    return tree
}