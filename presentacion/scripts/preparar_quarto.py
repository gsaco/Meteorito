"""Crea las láminas Quarto y sus notas a partir del contenido verificado."""
from pathlib import Path
import json,html
ROOT=Path(__file__).resolve().parents[1]
data=json.loads((ROOT/'src/contenido.json').read_text())
header='''---
pagetitle: "Meteoritos: datos y exploración interactiva"
lang: es
format:
  revealjs:
    theme: dark
    width: 1440
    height: 810
    margin: 0
    min-scale: 0.1
    max-scale: 2
    center: false
    auto-stretch: false
    transition: fade
    background-transition: fade
    slide-number: false
    controls: true
    controls-layout: edges
    progress: true
    menu: true
    overview: true
    hash: true
    navigation-mode: linear
    title-slide: false
    css: theme.css
    include-after-body: widgets.html
    html-math-method: plain
    embed-resources: false
    output-file: index.html
execute:
  enabled: false
---
'''
blocks=[]
for i,s in enumerate(data['slides']):
 fallback=f'<p>{html.escape(s.get("lead",s.get("insight",s.get("subtitle",""))))}</p>'
 blocks.append(f'''## {s['title']} {{#lamina-{i+1} .meteoritos-frame}}

```{{=html}}
<div data-react-slide="{i}" class="react-mount"><div class="loading-slide"><h2>{html.escape(s['title'])}</h2>{fallback}</div></div>
```

::: {{.notes}}
{s['notes']}
:::
''')
(ROOT/'meteoritos.qmd').write_text(header+'\n'.join(blocks))
(ROOT/'GUION.md').write_text('# Guion de exposición · Quarto y React\n\nDuración: 20–25 minutos.\n\n'+'\n\n'.join(f'## {i+1}. {s["title"]}\n\n{s["notes"]}' for i,s in enumerate(data['slides'])))
