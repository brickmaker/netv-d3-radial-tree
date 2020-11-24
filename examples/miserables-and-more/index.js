const netv = new NetV({
    container: document.querySelector('#main'),
    nodeLimit: 1e4,
    linkLimit: 1e5
})
const graph = netv.loadDataset('miserables')

function generateStarGraph(n, baseId, group) {
    const graph = {
        nodes: Array(n).fill().map((x, i) => ({
            id: String(baseId + i),
            group: group
        })),
        links: []
    }

    for (let i = 1; i < n; i++) {
        graph.links.push({
            source: String(baseId),
            target: String(baseId + i)
        })
    }

    return graph
}

const star1 = generateStarGraph(4, 0, 1)
graph.nodes.push(...star1.nodes)
graph.links.push(...star1.links)
const star2 = generateStarGraph(7, 100, 2)
graph.nodes.push(...star2.nodes)
graph.links.push(...star2.links)
const star3 = generateStarGraph(12, 200, 3)
graph.nodes.push(...star3.nodes)
graph.links.push(...star3.links)

const colorMap = [
    { r: 166, g: 206, b: 227, a: 0.9 },
    { r: 178, g: 223, b: 138, a: 0.9 },
    { r: 31, g: 120, b: 180, a: 0.9 },
    { r: 51, g: 160, b: 44, a: 0.9 },
    { r: 251, g: 154, b: 153, a: 0.9 },
    { r: 227, g: 26, b: 28, a: 0.9 },
    { r: 253, g: 191, b: 111, a: 0.9 },
    { r: 255, g: 127, b: 0, a: 0.9 },
    { r: 202, g: 178, b: 214, a: 0.9 },
    { r: 106, g: 61, b: 154, a: 0.9 },
    { r: 255, g: 255, b: 153, a: 0.9 },
    { r: 177, g: 89, b: 40, a: 0.9 }
]
graph.nodes.forEach((node) => {
    const { r, g, b, a } = colorMap[node.group]
    node.style = {
        fill: { r: r / 255, g: g / 255, b: b / 255, a }
    }
})

// tree = radialLayout(star2, '100', { directed: false, radius: 300, centerX: 400, centerY: 300 })
tree = radialLayoutMultiple(graph, 'Valjean', { directed: false, width: 800, height: 600 })
netv.data(tree)
netv.draw()