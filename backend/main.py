from typing import Any, Dict, List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


class Pipeline(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]


def is_directed_acyclic_graph(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> bool:
    node_ids = {node.get('id') for node in nodes}
    graph = {node_id: [] for node_id in node_ids}
    indegrees = {node_id: 0 for node_id in node_ids}

    for edge in edges:
        source = edge.get('source')
        target = edge.get('target')

        if source not in node_ids or target not in node_ids:
            continue

        graph[source].append(target)
        indegrees[target] += 1

    queue = [node_id for node_id, indegree in indegrees.items() if indegree == 0]
    visited_count = 0

    while queue:
        node_id = queue.pop(0)
        visited_count += 1

        for neighbor in graph[node_id]:
            indegrees[neighbor] -= 1

            if indegrees[neighbor] == 0:
                queue.append(neighbor)

    return visited_count == len(node_ids)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    return {
        'num_nodes': len(pipeline.nodes),
        'num_edges': len(pipeline.edges),
        'is_dag': is_directed_acyclic_graph(pipeline.nodes, pipeline.edges),
    }
